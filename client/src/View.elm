module View exposing (..)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as Table
import Html exposing (Html, a, text)
import Html.Attributes exposing (class, colspan, href, style)
import Html.Lazy exposing (lazy)
import Http
import Model exposing (..)
import Round exposing (round)


view : Model -> Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Grid.row []
            [ Grid.col []
                [ lazy courseTable model.courses ]
            ]
        ]


courseTable : List Course -> Html Msg
courseTable courses =
    Table.table
        { options = [ Table.hover, Table.responsive, Table.striped ]
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
        , tbody = Table.tbody [] (List.map courseRow courses)
        }


courseRow : Course -> Table.Row msg
courseRow course =
    Table.tr []
        [ Table.td hiddenCell [ text (String.fromInt course.id) ]
        , Table.td [] [ text course.number ]
        , Table.td [] [ text course.name ]
        , Table.td [] [ text course.days ]
        , Table.td [] [ text course.time ]
        , Table.td [] [ text (String.fromInt course.credits) ]
        , Table.td hiddenCell [ text (String.fromInt course.crn) ]
        , Table.td
            []
            [ case course.instructor of
                Just instructor ->
                    Maybe.withDefault
                        (text instructor.fullName)
                        (Maybe.map2 (\a b -> text <| a ++ " " ++ b) instructor.firstName instructor.lastName)

                Nothing ->
                    text ""
            ]
        , Table.td []
            [ case course.instructor of
                Just instructor ->
                    case instructor.rating of
                        Just rating ->
                            Maybe.withDefault
                                (text <| round 1 rating)
                                (Maybe.map (\url -> a [ href url ] [ text <| round 1 rating ]) instructor.url)

                        Nothing ->
                            text ""

                Nothing ->
                    text ""
            ]
        ]


hiddenCell : List (Table.CellOption msg)
hiddenCell =
    [ Table.cellAttr (style "display" "none")
    , Table.cellAttr (style "visibility" "hidden")
    ]
