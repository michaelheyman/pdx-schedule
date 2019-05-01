module View exposing (view)

import Bootstrap.Alert as Alert
import Bootstrap.Button as Button
import Bootstrap.Dropdown as Dropdown
import Bootstrap.Form.Input as Input
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Navbar as Navbar
import Bootstrap.Progress as Progress
import Bootstrap.Table as Table
import Bootstrap.Utilities.Display as Display
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Spacing as Spacing
import Browser exposing (Document)
import Color exposing (rgb255, rgba, toCssString)
import Html exposing (Html, a, b, div, footer, h1, h6, i, li, main_, nav, p, span, text, ul)
import Html.Attributes exposing (attribute, autocomplete, class, href, style, target)
import Html.Events exposing (onClick)
import Html.Lazy exposing (lazy)
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
            |> Navbar.lightCustom (rgb255 255 255 255)
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
                    [ lazy viewSidebar model ]
                , Grid.col
                    [ Col.xs12, Col.md10, Col.xl8, Col.attrs [ class "bd-content" ] ]
                    [ main_
                        []
                        [ viewPage model ]
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
                    [ div [ class "container" ]
                        [ h1 [] [ text "PSU Schedule" ]
                        , h6
                            [ style "color" (Color.toCssString (Color.rgba 255 255 255 0.75)) ]
                            [ termDropdown model ]
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


viewSidebar : Model -> Html Msg
viewSidebar model =
    nav
        [ class "bd-links"
        ]
        [ div [ class "bd-toc-item active" ]
            [ text "Disciplines"
            , ul
                [ class "bd-sidenav"
                , style "list-style-type" "none"
                , Spacing.pl2
                ]
                (li
                    [ style "font-size" "0.8em"
                    , style "color" "#99979c"
                    , onClick (DisciplineFilter "")
                    , style "cursor" "pointer"
                    ]
                    [ if model.currentDiscipline == "" then
                        b [] [ text "All" ]

                      else
                        text "All"
                    ]
                    :: List.map
                        (sidebarLink model)
                        model.disciplines
                )
            ]
        ]


viewPage : Model -> Html Msg
viewPage model =
    div []
        [ viewInput
        , lazy mobileCourseTable model
        , lazy courseTable model
        ]


viewInput : Html Msg
viewInput =
    Input.search
        [ Input.id "searchInput"
        , Input.placeholder "Search for class.."
        , Input.onInput Search
        , Input.attrs
            [ Spacing.mb4
            , autocomplete False
            ]
        ]


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


mobileCourseTable : Model -> Html Msg
mobileCourseTable model =
    Table.table
        { options = []
        , thead =
            Table.thead []
                []
        , tbody =
            Table.tbody [ Display.noneSm ]
                (List.foldr (++)
                    []
                    (model.classes
                        |> List.filter (filterCourse model.search model.currentDiscipline)
                        |> List.map mobileCourseRow
                    )
                )
        }


mobileCourseRow : Class -> List (Table.Row msg)
mobileCourseRow c =
    [ Table.tr
        [ Table.rowAttr Flex.col
        ]
        [ Table.th [ Table.cellDark ] [ text "Class" ]
        , Table.td [ Table.cellDark ] [ text c.course.number ]
        ]
    , Table.tr
        [ Table.rowAttr (style "word-wrap" "break-word")
        , Table.rowAttr (style "word-break" "break-all")
        ]
        [ Table.th [] [ text "Name" ]
        , Table.td [ Table.cellAttr Flex.wrap ] [ text c.course.name ]
        ]
    , Table.tr []
        [ Table.th [] [ text "Days" ]
        , Table.td []
            [ Maybe.map (\days -> text days) c.days
                |> Maybe.withDefault (text "")
            ]
        ]
    , Table.tr []
        [ Table.th [] [ text "Time" ]
        , Table.td
            []
            [ Maybe.map (\time -> text time) c.time
                |> Maybe.withDefault (text "")
            ]
        ]
    , Table.tr []
        [ Table.th [] [ text "Instructor" ]
        , Table.td
            [ Table.cellAttr Flex.wrap ]
            [ Maybe.map viewName c.instructor
                |> Maybe.withDefault (text "")
            ]
        ]
    , Table.tr []
        [ Table.th [] [ text "Rating" ]
        , Table.td
            []
            [ Maybe.map viewRating c.instructor
                |> Maybe.withDefault (text "")
            ]
        ]
    , Table.tr []
        [ Table.th [] []
        , Table.td [] []
        ]
    ]


courseTable : Model -> Html Msg
courseTable model =
    Table.table
        { options = [ Table.hover, Table.responsive, Table.striped ]
        , thead =
            Table.thead [ Table.headAttr (class "thead-dark") ]
                [ Table.tr
                    [ Table.rowAttr Display.none
                    , Table.rowAttr Display.tableRowSm
                    ]
                    [ Table.th
                        [ Table.cellAttr (style "display" "none")
                        , Table.cellAttr (style "visibility" "hidden")
                        ]
                        [ text "Id" ]
                    , Table.th [] [ text "Class" ]
                    , Table.th
                        [ Table.cellAttr Display.none
                        , Table.cellAttr Display.tableCellSm
                        ]
                        [ text "Name" ]
                    , Table.th
                        [ Table.cellAttr Display.none
                        , Table.cellAttr Display.tableCellLg
                        ]
                        [ text "Days" ]
                    , Table.th
                        [ Table.cellAttr Display.none
                        , Table.cellAttr Display.tableCellLg
                        ]
                        [ text "Time" ]
                    , Table.th
                        [ Table.cellAttr Display.none
                        , Table.cellAttr Display.tableCellXl
                        ]
                        [ text "Credits" ]
                    , Table.th [] [ text "Instructor" ]
                    , Table.th [] [ text "Rating" ]
                    ]
                ]
        , tbody =
            Table.tbody []
                (model.classes
                    |> List.filter (filterCourse model.search model.currentDiscipline)
                    |> List.map courseRow
                )
        }


filterCourse : String -> String -> Class -> Bool
filterCourse search filter c =
    let
        containsName =
            String.contains (String.toLower search) (String.toLower c.course.name)

        startsWithSearch =
            String.startsWith (String.toLower search) (String.toLower c.course.number)

        startsWithFilter =
            String.startsWith (String.toLower filter) (String.toLower c.course.discipline)
    in
    startsWithFilter && (startsWithSearch || containsName)


courseRow : Class -> Table.Row msg
courseRow c =
    Table.tr
        [ Table.rowAttr Flex.col
        , Table.rowAttr Display.none
        , Table.rowAttr Display.tableRowSm
        ]
        [ Table.td
            [ Table.cellAttr (style "display" "none")
            , Table.cellAttr (style "visibility" "hidden")
            ]
            [ text (String.fromInt c.course.id) ]
        , Table.td
            [ Table.cellAttr (class "text-nowrap")
            , Table.cellAttr Spacing.pr0
            ]
            [ text c.course.number ]
        , Table.td
            [ Table.cellAttr Display.none
            , Table.cellAttr Display.tableCellSm
            , Table.cellAttr Flex.nowrap
            ]
            [ text c.course.name ]
        , Table.td
            [ Table.cellAttr Display.none
            , Table.cellAttr Display.tableCellLg
            , Table.cellAttr Spacing.pr0
            ]
            [ Maybe.map (\days -> text days) c.days
                |> Maybe.withDefault (text "")
            ]
        , Table.td
            [ Table.cellAttr Display.none
            , Table.cellAttr Display.tableCellLg
            , Table.cellAttr (class "text-nowrap")
            ]
            [ Maybe.map (\time -> text time) c.time
                |> Maybe.withDefault (text "")
            ]
        , Table.td
            [ Table.cellAttr Display.none
            , Table.cellAttr Display.tableCellXl
            ]
            [ text (String.fromInt c.credits) ]
        , Table.td
            [ Table.cellAttr (style "display" "none")
            , Table.cellAttr (style "visibility" "hidden")
            ]
            [ text (String.fromInt c.crn) ]
        , Table.td
            [ Table.cellAttr Display.tableCellSm
            ]
            [ Maybe.map viewName c.instructor
                |> Maybe.withDefault (text "")
            ]
        , Table.td
            [ Table.cellAttr Display.tableCellSm
            ]
            [ Maybe.map viewRating c.instructor
                |> Maybe.withDefault (text "")
            ]
        ]


viewName : Instructor -> Html msg
viewName instructor =
    Maybe.map2 (\a b -> text <| a ++ " " ++ b) instructor.firstName instructor.lastName
        |> Maybe.withDefault (text instructor.fullName)


viewRating : Instructor -> Html msg
viewRating instructor =
    Maybe.map2 (\r u -> externalLink u (round 1 r)) instructor.rating instructor.url
        |> Maybe.withDefault (text "")


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
                                , externalLink "https://github.com/michaelheyman/pdx-schedule/" " Source"
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


externalLink : String -> String -> Html msg
externalLink url label =
    a [ href url, target "_blank" ]
        [ text label ]


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
