module View exposing (..)

import Html exposing (Html, div, li, pre, table, tbody, td, text, th, thead, tr, ul)
import Html.Attributes exposing (class)
import Http
import Model exposing (..)


view : Model -> Html Msg
view model =
    viewTest model


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
                |> List.map (\course -> div [] [ text (toString course) ])
                |> div []


viewTable : Html Msg
viewTable =
    div [ class "col-md-4" ]
        [ table [ class "table table-striped" ]
            [ thead []
                [ tr []
                    [ th [] [ text "Column 1" ]
                    , th [] [ text "Column 2" ]
                    ]
                ]
            , tbody []
                [ tr []
                    [ td [] [ text "Value 1" ]
                    , td [] [ text "Value 2" ]
                    ]
                , tr []
                    [ td [] [ text "Value 3" ]
                    , td [] [ text "Value 4" ]
                    ]
                , tr []
                    [ td [] [ text "Value 5" ]
                    , td [] [ text "Value 6" ]
                    ]
                ]
            ]
        ]


toString : Course -> String
toString course =
    course.number ++ "\t" ++ course.name
