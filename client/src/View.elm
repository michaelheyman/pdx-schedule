module View exposing (..)

import Bootstrap.Alert as Alert
import Bootstrap.CDN as CDN
import Bootstrap.Form.Input as Input
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Progress as Progress
import Bootstrap.Table as Table
import Bootstrap.Text as Text
import Bootstrap.Utilities.Flex as Flex
import Html exposing (Html, a, br, div, footer, h1, i, li, main_, p, span, text, ul)
import Html.Attributes exposing (align, attribute, autocomplete, class, colspan, href, style, target)
import Html.Lazy exposing (lazy)
import Http
import Model exposing (..)
import Round exposing (round)
import Styles exposing (..)


view : Model -> Html Msg
view model =
    div []
        (case model.response of
            Loading ->
                [ viewProgressBar model.loadingValue ]

            Success ->
                renderPage model

            Failure _ ->
                [ Alert.simpleDanger []
                    [ Html.strong [] [ text "Oh snap! " ]
                    , text "There was a problem loading the page."
                    ]
                ]
        )


renderPage : Model -> List (Html Msg)
renderPage model =
    [ pageHeader
    , Grid.containerFluid []
        [ Grid.row
            [ Row.centerSm ]
            [ Grid.col
                [ Col.xs12, Col.md12, Col.xl10, Col.pullMd2, Col.attrs [ class "bd-content" ] ]
                [ main_
                    []
                    (viewPage model)
                ]
            ]
        ]
    , viewFooter model
    ]


pageHeader : Html Msg
pageHeader =
    div
        pageHeaderStyle
        [ div
            [ class "container" ]
            [ h1 [] [ text "PSU Class Schedule" ] ]
        ]


viewPage : Model -> List (Html Msg)
viewPage model =
    [ viewInput
    , br [] []
    , lazy courseTable model
    ]


viewInput : Html Msg
viewInput =
    Input.search
        [ Input.id "searchInput"
        , Input.placeholder "Search for class.."
        , Input.onInput Search
        , Input.attrs inputBoxStyle
        ]


viewProgressBar : Float -> Html Msg
viewProgressBar value =
    Progress.progress
        [ Progress.value value
        , Progress.striped
        , Progress.label "loading"
        ]


courseTable : Model -> Html Msg
courseTable model =
    Table.table
        { options = [ Table.hover, Table.responsiveXl, Table.striped ]
        , thead =
            Table.thead [ Table.headAttr (class "thead-dark") ]
                [ Table.tr []
                    [ Table.th hiddenCell [ text "Id" ]
                    , Table.th [] [ text "Class" ]
                    , Table.th [] [ text "Name" ]
                    , Table.th hiddenSm [ text "Days" ]
                    , Table.th hiddenSm [ text "Time" ]
                    , Table.th hiddenMd [ text "Credits" ]

                    --, Table.th hiddenCell [ text "CRN" ]
                    , Table.th [] [ text "Instructor" ]
                    , Table.th [] [ text "Rating" ]
                    ]
                ]
        , tbody =
            Table.tbody []
                (List.map courseRow
                    (List.filter
                        (\c ->
                            String.startsWith
                                (String.toLower model.search)
                                (String.toLower c.number)
                        )
                        model.courses
                    )
                )
        }


courseRow : Course -> Table.Row msg
courseRow course =
    Table.tr [ Table.rowAttr Flex.col ]
        [ Table.td hiddenCell [ text (String.fromInt course.id) ]
        , Table.td [] [ text course.number ]
        , Table.td [] [ text course.name ]
        , Table.td
            hiddenSm
            [ Maybe.map (\days -> text days) course.days
                |> Maybe.withDefault (text "")
            ]
        , Table.td
            hiddenSm
            [ Maybe.map (\time -> text time) course.time
                |> Maybe.withDefault (text "")
            ]
        , Table.td
            hiddenMd
            [ text (String.fromInt course.credits) ]
        , Table.td hiddenCell [ text (String.fromInt course.crn) ]
        , Table.td []
            [ Maybe.map viewName course.instructor
                |> Maybe.withDefault (text "")
            ]
        , Table.td []
            [ Maybe.map viewRating course.instructor
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
    case List.head <| List.sortBy .timestamp model.courses of
        Just course ->
            text
                (String.dropRight 5
                    (String.map
                        (\x ->
                            if Char.isAlpha x then
                                ' '
                            else
                                x
                        )
                        course.timestamp
                    )
                )

        Nothing ->
            text ""


viewFooter : Model -> Html Msg
viewFooter model =
    footer
        footerStyle
        [ div [ class "container" ]
            [ div
                [ Flex.block
                , Flex.justifyBetween
                ]
                [ span
                    [ class "bd-footer-links" ]
                    [ i [ class "fa fa-github", attribute "aria-hidden" "true" ] []
                    , externalLink "https://github.com/michaelheyman/pdx-schedule/" " Source"
                    ]
                , span
                    []
                    [ text "Last Updated: "
                    , viewTimestamp model
                    ]
                ]
            , br [] []
            , div []
                [ p [] [ text "The contents of this page are not sanctioned by Portland State University." ]
                ]
            ]
        ]


externalLink : String -> String -> Html msg
externalLink url label =
    a [ href url, target "_blank" ]
        [ text label ]
