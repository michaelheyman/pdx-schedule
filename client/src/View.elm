module View exposing (..)

import Bootstrap.Alert as Alert
import Bootstrap.CDN as CDN
import Bootstrap.Form.Input as Input
import Bootstrap.Grid as Grid
import Bootstrap.Progress as Progress
import Bootstrap.Table as Table
import Html exposing (Html, a, br, div, text)
import Html.Attributes exposing (class, colspan, href, style)
import Html.Lazy exposing (lazy)
import Http
import Model exposing (..)
import Round exposing (round)


view : Model -> Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , case model.response of
            Loading ->
                viewProgressBar model.loadingValue

            Success ->
                div []
                    [ viewInput
                    , br [] []
                    , viewTable model
                    ]

            Failure _ ->
                Alert.simpleDanger []
                    [ Html.strong [] [ text "Oh snap! " ]
                    , text "There was a problem loading the page."
                    ]
        ]


viewInput : Html Msg
viewInput =
    Input.search
        [ Input.id "searchInput"
        , Input.small
        , Input.placeholder "Search for class.."
        , Input.onInput Search
        ]


viewProgressBar : Float -> Html Msg
viewProgressBar value =
    Progress.progress
        [ Progress.value value
        , Progress.striped
        , Progress.label "loading"
        ]


viewTable : Model -> Html Msg
viewTable model =
    Grid.row []
        [ Grid.col []
            [ lazy courseTable model ]
        ]


courseTable : Model -> Html Msg
courseTable model =
    Table.table
        { options = [ Table.hover, Table.responsive, Table.striped, Table.small ]
        , thead =
            Table.thead [ Table.headAttr (class "thead-dark") ]
                [ Table.tr []
                    [ Table.th hiddenCell [ text "Id" ]
                    , Table.th [] [ text "Class" ]
                    , Table.th [] [ text "Name" ]
                    , Table.th [] [ text "Days" ]
                    , Table.th [] [ text "Time" ]
                    , Table.th [] [ text "Credits" ]
                    , Table.th hiddenCell [ text "CRN" ]
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
    Table.tr []
        [ Table.td hiddenCell [ text (String.fromInt course.id) ]
        , Table.td [] [ text course.number ]
        , Table.td [] [ text course.name ]
        , Table.td []
            [ Maybe.map (\days -> text days) course.days
                |> Maybe.withDefault (text "")
            ]
        , Table.td []
            [ Maybe.map (\time -> text time) course.time
                |> Maybe.withDefault (text "")
            ]
        , Table.td [] [ text (String.fromInt course.credits) ]
        , Table.td hiddenCell [ text (String.fromInt course.crn) ]
        , Table.td
            []
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
    Maybe.map2 (\r u -> a [ href u ] [ text <| round 1 r ]) instructor.rating instructor.url
        |> Maybe.withDefault (text "")


hiddenCell : List (Table.CellOption msg)
hiddenCell =
    [ Table.cellAttr (style "display" "none")
    , Table.cellAttr (style "visibility" "hidden")
    ]
