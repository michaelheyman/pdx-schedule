module View exposing (view)

import Bootstrap.Alert as Alert
import Bootstrap.Button as Button
import Bootstrap.Dropdown as Dropdown
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Navbar as Navbar
import Bootstrap.Progress as Progress
import Bootstrap.Utilities.Display as Display
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Spacing as Spacing
import Browser exposing (Document)
import Color exposing (rgb255, rgba, toCssString)
import Element exposing (..)
import Html exposing (Html, a, b, div, footer, h1, h6, i, li, main_, p, span, text, ul)
import Html.Attributes exposing (attribute, class, href, style, target)
import Html.Events exposing (onClick)
import Model exposing (Class, Instructor, Model, Msg(..), Response(..))
import Round exposing (round)


view : Model -> Document Msg
view model =
    { title = "PSU Schedule"
    , body =
        [ div []
            [ case model.response of
                Loading ->
                    viewProgressBar model.loadingValue

                Success ->
                    renderPage model

                Failure _ ->
                    viewError
            ]
        ]
    }


viewNavbar : Model -> Html Msg
viewNavbar model =
    div [ Display.noneMd ]
        [ Navbar.config NavbarMsg
            |> Navbar.container
            |> Navbar.collapseSmall
            |> Navbar.withAnimation
            |> Navbar.lightCustom (Color.rgb255 255 255 255)
            |> Navbar.brand
                [ href "#" ]
                [ text "PSU Schedule"
                ]
            |> Navbar.items
                [ Navbar.dropdown
                    { id = "termDropdown"
                    , toggle = Navbar.dropdownToggle [] [ text model.term ]
                    , items =
                        Navbar.dropdownHeader [ text "Term" ]
                            :: List.map
                                (\term ->
                                    Navbar.dropdownItem
                                        [ href "#", onClick (MakeApiRequest (String.fromInt (.date term))) ]
                                        [ text (.description term) ]
                                )
                                (List.reverse model.terms)
                    }
                , Navbar.dropdown
                    { id = "disciplineDropdown"
                    , toggle =
                        Navbar.dropdownToggle []
                            [ if model.currentDiscipline == "" then
                                text "All"

                              else
                                text model.currentDiscipline
                            ]
                    , items =
                        Navbar.dropdownHeader [ text "Discipline" ]
                            :: Navbar.dropdownItem
                                [ href "#"
                                , onClick (DisciplineFilter "")
                                ]
                                [ text "All" ]
                            :: List.map
                                (\discipline ->
                                    Navbar.dropdownItem
                                        [ href "#"
                                        , onClick (DisciplineFilter discipline)
                                        ]
                                        [ text discipline ]
                                )
                                model.disciplines
                    }
                ]
            |> Navbar.view model.navbarState
        ]


renderPage : Model -> Html Msg
renderPage model =
    div []
        [ viewNavbar model
        , pageHeader model
        , Grid.containerFluid []
            [ Grid.row
                [ Row.centerXs ]
                [ Grid.col
                    [ Col.attrs [ Display.none, Display.blockMd ]
                    , Col.xs12
                    , Col.md2
                    , Col.attrs [ class "bd-sidebar" ]
                    ]
                    [ Element.layout [] (viewSidebar model) ]
                , Grid.col
                    [ Col.xs12, Col.md10, Col.xl8, Col.attrs [ class "bd-content" ] ]
                    [ main_
                        []
                        [ Element.layout [] (viewPage model) ]
                    ]
                ]
            ]
        , viewFooter model
        ]


pageHeader : Model -> Html Msg
pageHeader model =
    div
        [ class "bd-pageheader"
        , style "background-color" "#563d7c"
        , style "color" "white"
        , Spacing.pt5
        , Spacing.pb5
        , Spacing.mb3
        , Spacing.mb5Md
        ]
        [ Grid.containerFluid []
            [ Grid.row []
                [ Grid.col
                    [ Col.offsetXs1
                    , Col.offsetMd2
                    , Col.offsetXl0
                    ]
                    [ div
                        [ class "container" ]
                        [ h1 [] [ text "PSU Schedule" ]
                        , h6
                            [ style "color" (Color.toCssString (Color.rgba 255 255 255 0.75))
                            , Display.none
                            , Display.blockMd
                            ]
                            [ termDropdown model ]
                        , h6
                            [ style "color" (Color.toCssString (Color.rgba 255 255 255 0.75))
                            , Display.noneMd
                            ]
                            [ text model.term ]
                        ]
                    ]
                ]
            ]
        ]


termDropdown : Model -> Html Msg
termDropdown model =
    Dropdown.dropdown
        model.dropdownState
        { options = []
        , toggleMsg = DropdownMsg
        , toggleButton =
            Dropdown.toggle
                [ Button.light
                , Button.small
                , Button.outlineLight
                ]
                [ text model.term ]
        , items =
            model.terms
                |> List.reverse
                |> List.map
                    (\term ->
                        Dropdown.buttonItem
                            [ href "#"
                            , onClick <|
                                MakeApiRequest <|
                                    String.fromInt <|
                                        term.date
                            ]
                            [ text term.description ]
                    )
        }


viewSidebar : Model -> Element Msg
viewSidebar model =
    Element.column [] (List.map Element.text model.disciplines)


viewPage : Model -> Element Msg
viewPage model =
    courseTable model


viewProgressBar : Float -> Html Msg
viewProgressBar value =
    Progress.progress
        [ Progress.value value
        , Progress.striped
        , Progress.label "loading"
        ]


viewError : Html Msg
viewError =
    Alert.simpleDanger []
        [ Html.strong [] [ text "Oh snap! " ]
        , text "There was a problem loading the page."
        ]


courseTable : Model -> Element Msg
courseTable model =
    let
        data =
            List.filter (filterCourse model.searchFilter model.currentDiscipline) model.classes
    in
    Element.table []
        { data = data
        , columns =
            [ { header = Element.text "Class"
              , width = fill
              , view =
                    \class ->
                        Element.text class.course.number
              }
            , { header = Element.text "Name"
              , width = fill
              , view =
                    \class ->
                        Element.text class.course.name
              }
            , { header = Element.text "Days"
              , width = fill
              , view =
                    \class ->
                        Element.text (Maybe.withDefault "" class.days)
              }
            , { header = Element.text "Time"
              , width = fill
              , view =
                    \class ->
                        Element.text (Maybe.withDefault "" class.time)
              }
            , { header = Element.text "Credits"
              , width = fill
              , view =
                    \class ->
                        Element.text (String.fromInt class.credits)
              }
            , { header = Element.text "Instructor"
              , width = fill
              , view =
                    \class ->
                        Maybe.map (\inst -> Element.text (instructorName inst)) class.instructor
                            |> Maybe.withDefault (Element.text "")
              }
            , { header = Element.text "Rating"
              , width = fill
              , view =
                    \class ->
                        Maybe.map viewRating class.instructor
                            |> Maybe.withDefault (Element.text "")
              }
            ]
        }


filterCourse : String -> String -> Class -> Bool
filterCourse search filter c =
    let
        containsCourseName =
            String.contains (String.toLower search) (String.toLower c.course.name)

        containsInstructorName =
            case c.instructor of
                Just instructor ->
                    String.contains (String.toLower search) (String.toLower (instructorName instructor))

                Nothing ->
                    True

        startsWithSearch =
            String.startsWith (String.toLower search) (String.toLower c.course.number)

        startsWithFilter =
            String.startsWith (String.toLower filter) (String.toLower c.course.discipline)
    in
    startsWithFilter && (startsWithSearch || containsCourseName || containsInstructorName)


instructorName : Instructor -> String
instructorName instructor =
    Maybe.map2 (\a b -> a ++ " " ++ b) instructor.firstName instructor.lastName
        |> Maybe.withDefault instructor.fullName


viewRating : Instructor -> Element Msg
viewRating instructor =
    Maybe.map2 (\r u -> externalLink u (round 1 r)) instructor.rating instructor.url
        |> Maybe.withDefault (Element.text "")


viewTimestamp : Model -> Html Msg
viewTimestamp model =
    let
        timeFormat course =
            String.dropRight 5
                (String.map
                    (\x ->
                        if Char.isAlpha x then
                            ' '

                        else
                            x
                    )
                    course.timestamp
                )
    in
    case List.head <| List.sortBy .timestamp model.classes of
        Just course ->
            text (timeFormat course)

        Nothing ->
            text ""


viewFooter : Model -> Html Msg
viewFooter model =
    footer
        [ class "bd-footer text-muted"
        , style "background-color" "#f7f7f7"
        , Spacing.py5
        , Spacing.px2
        ]
        [ div [ class "container" ]
            [ Grid.container
                []
                [ Grid.row
                    [ Row.centerSm ]
                    [ Grid.col [ Col.xs12, Col.md6 ]
                        [ ul
                            [ class "bd-footer-links"
                            , style "list-style-type" "none"
                            , Spacing.pl0
                            ]
                            [ li
                                [ style "display" "inline"
                                , Spacing.mr2
                                ]
                                [ i [ class "fa fa-github", attribute "aria-hidden" "true" ] []
                                , Element.layout [] (externalLink "https://github.com/michaelheyman/pdx-schedule/" " Source")
                                ]
                            , li [ style "display" "inline" ]
                                [ i [ class "fa fa-envelope", attribute "aria-hidden" "true" ] []
                                , a [ href "mailto:contact@mheyman.com?subject=Site Feedback", target "_blank" ] [ text " Contact" ]
                                ]
                            ]
                        ]
                    , Grid.col
                        [ Col.xs12
                        , Col.md6
                        , Col.attrs
                            [ Flex.row
                            , Flex.alignItemsEnd

                            -- NOTE: remove the following when elm-boostrap supports Text.align in things other than Cards
                            , class "text-right"
                            , Display.none
                            , Display.blockMd
                            ]
                        ]
                        [ span
                            []
                            [ text "Last Updated: "
                            , viewTimestamp model
                            ]
                        ]
                    , Grid.col
                        [ Col.xs12
                        , Col.attrs
                            [ Flex.row
                            , Display.noneMd
                            , Spacing.mt2
                            ]
                        ]
                        [ span
                            []
                            [ text "Last Updated: "
                            , viewTimestamp model
                            ]
                        ]
                    , Grid.col
                        [ Col.attrs [ Spacing.mt5, Spacing.mt4Md ] ]
                        [ p []
                            [ text "The contents of this page are not sanctioned by Portland State University." ]
                        ]
                    ]
                ]
            ]
        ]


externalLink : String -> String -> Element Msg
externalLink url label =
    Element.link
        []
        { url = url
        , label = Element.text label
        }


sidebarLink : Model -> String -> Html Msg
sidebarLink model string =
    let
        disciplineText =
            if model.currentDiscipline == string then
                b [] [ text string ]

            else
                text string
    in
    li
        [ style "font-size" "0.8em"
        , style "color" "#99979c"
        , onClick (DisciplineFilter string)
        , style "cursor" "pointer"
        ]
        [ disciplineText ]
