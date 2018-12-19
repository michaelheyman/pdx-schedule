module View exposing (..)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as Table
import Html exposing (Html, a, div, li, p, pre, table, tbody, td, text, th, thead, tr, ul)
import Html.Attributes exposing (class, href)
import Http
import Model exposing (..)
import Round exposing (round)


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
        { options = [ Table.hover, Table.responsive, Table.striped ]
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
        , Table.td []
            [ case course.instructor of
                Just instructor ->
                    text instructor.fullName

                Nothing ->
                    text ""
            ]
        , Table.td []
            [ case course.instructor of
                Just instructor ->
                    case instructor.rating of
                        Just rating ->
                            case instructor.url of
                                Just url ->
                                    a [ href url ] [ text (round 1 rating) ]

                                Nothing ->
                                    text (round 1 rating)

                        Nothing ->
                            text ""

                Nothing ->
                    text ""
            ]
        ]
