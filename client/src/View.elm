module View exposing (..)

import Html exposing (Html, div, pre, table, tbody, td, text, th, thead, tr)
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
            case model.course of
                Just course ->
                    text course.name

                Nothing ->
                    text "nothing"


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
