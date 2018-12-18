module View exposing (..)

import Html exposing (Html, div, li, p, pre, table, tbody, td, text, th, thead, tr, ul)
import Html.Attributes exposing (class)
import Http
import Model exposing (..)


view : Model -> Html Msg
view model =
    viewCourseTable model


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
                |> List.map (\c -> div [] [ text (toString c) ])
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


toString : Course -> String
toString course =
    course.number ++ "\t" ++ course.name
