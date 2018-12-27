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
        , tbody = Table.tbody [] (List.map courseRow courses)
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
