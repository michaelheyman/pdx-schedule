module View exposing (..)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as Table
import Html exposing (Html, div, li, p, pre, table, tbody, td, text, th, thead, tr, ul)
import Html.Attributes exposing (class)
import Http
import Model exposing (..)


view : Model -> Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Grid.row []
            [ Grid.col []
                [ courseTable model.courses ]
            ]
        ]


courseTable : List Course -> Html Msg
courseTable courses =
    Table.table
        { options = [ Table.hover, Table.responsive ]
        , thead =
            Table.thead [ Table.headAttr (class "thead-dark") ]
                [ Table.tr []
                    [ Table.th [] [ text "Class" ]
                    , Table.th [] [ text "Name" ]
                    , Table.th [] [ text "CRN" ]
                    , Table.th [] [ text "Instructor" ]
                    , Table.th [] [ text "Rating" ]
                    ]
                ]
        , tbody = Table.tbody [] (List.map courseRow courses)
        }


courseRow : Course -> Table.Row msg
courseRow course =
    Table.tr []
        [ Table.td [] [ text course.number ]
        , Table.td [] [ text course.name ]
        , Table.td [] [ text (Debug.toString course.crn) ]
        , Table.td [] []
        , Table.td [] []
        ]


viewTest : Model -> Html Msg
viewTest model =
    case model.response of
        Failure error ->
            text (Debug.toString error)

        Loading ->
            text "Loading..."

        Success fullText ->
            showCourses model


showCourse : Model -> Html Msg
showCourse model =
    case model.course of
        Just course ->
            text course.name

        Nothing ->
            text "showCourse: nothing"


showCourses : Model -> Html Msg
showCourses model =
    case model.courses of
        [] ->
            text "showCourses: no courses found"

        otherwise ->
            model.courses
                |> List.map (\c -> div [] [ text (courseToString c) ])
                |> div []


viewCourseTable : Model -> Html Msg
viewCourseTable model =
    table []
        (List.concat
            [ [ thead []
                    [ th [] [ text "Class" ]
                    , th [] [ text "Name" ]
                    ]
              ]
            , [ model.courses
                    |> List.map toTableRow
                    |> tbody []
              ]
            ]
        )


toTableRow : Course -> Html Msg
toTableRow course =
    tr []
        [ td [] [ text course.number ]
        , td [] [ text course.name ]
        ]


courseToString : Course -> String
courseToString course =
    course.number ++ "\t" ++ course.name
