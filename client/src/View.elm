module View exposing (view)

import Browser exposing (Document)
import Element exposing (..)
import Model exposing (Class, Instructor, Model, Msg(..), Response(..))
import Round exposing (round)


view : Model -> Document Msg
view model =
    { title = "PSU Schedule"
    , body =
        [ layout [] (renderPage model)
        ]
    }


renderPage : Model -> Element Msg
renderPage model =
    column []
        [ viewHeader model
        , row []
            [ Element.el [ width (fillPortion 1) ] (viewSidebar model)
            , Element.el [ alignTop, width (fillPortion 5) ] (viewPage model)
            ]
        , viewFooter model
        ]


viewHeader : Model -> Element Msg
viewHeader model =
    row [ paddingXY 0 32 ]
        [ text "PSU Schedule" ]


viewSidebar : Model -> Element Msg
viewSidebar model =
    column [ width (fillPortion 1) ] (List.map text model.disciplines)


viewPage : Model -> Element Msg
viewPage model =
    courseTable model


courseTable : Model -> Element Msg
courseTable model =
    let
        data =
            List.filter (filterCourse model.searchFilter model.currentDiscipline) model.classes
    in
    table []
        { data = data
        , columns =
            [ { header = text "Class"
              , width = fill
              , view =
                    \class ->
                        text class.course.number
              }
            , { header = text "Name"
              , width = fill
              , view =
                    \class ->
                        text class.course.name
              }
            , { header = text "Days"
              , width = fill
              , view =
                    \class ->
                        text (Maybe.withDefault "" class.days)
              }
            , { header = text "Time"
              , width = fill
              , view =
                    \class ->
                        text (Maybe.withDefault "" class.time)
              }
            , { header = text "Credits"
              , width = fill
              , view =
                    \class ->
                        text (String.fromInt class.credits)
              }
            , { header = text "Instructor"
              , width = fill
              , view =
                    \class ->
                        Maybe.map (\inst -> text (instructorName inst)) class.instructor
                            |> Maybe.withDefault (text "")
              }
            , { header = text "Rating"
              , width = fill
              , view =
                    \class ->
                        Maybe.map viewRating class.instructor
                            |> Maybe.withDefault (text "")
              }
            ]
        }


filterCourse : String -> String -> Class -> Bool
filterCourse search filter c =
    let
        containsCourseName =
            String.contains (String.toLower search) (String.toLower c.course.name)

        containsInstructorName =
            case c.instructor of
                Just instructor ->
                    String.contains (String.toLower search) (String.toLower (instructorName instructor))

                Nothing ->
                    True

        startsWithSearch =
            String.startsWith (String.toLower search) (String.toLower c.course.number)

        startsWithFilter =
            String.startsWith (String.toLower filter) (String.toLower c.course.discipline)
    in
    startsWithFilter && (startsWithSearch || containsCourseName || containsInstructorName)


instructorName : Instructor -> String
instructorName instructor =
    Maybe.map2 (\a b -> a ++ " " ++ b) instructor.firstName instructor.lastName
        |> Maybe.withDefault instructor.fullName


viewRating : Instructor -> Element Msg
viewRating instructor =
    Maybe.map2 (\r u -> externalLink u (round 1 r)) instructor.rating instructor.url
        |> Maybe.withDefault (text "")


viewTimestamp : Model -> Element Msg
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


viewFooter : Model -> Element Msg
viewFooter model =
    column
        [ spacing 16
        , paddingXY 0 32
        , width fill
        ]
        [ row [ spacing 32, width fill ]
            [ externalLink "https://github.com/michaelheyman/pdx-schedule/" "Source"
            , newTabLink
                []
                { url = "mailto:contact@mheyman.com?subject=Site Feedback"
                , label = text "Contact"
                }
            , el [ alignRight ] (text "Last Updated")
            , el [ alignRight ] (viewTimestamp model)
            ]
        , text "The contents of this page are not sanctioned by Portland State University."
        ]


externalLink : String -> String -> Element Msg
externalLink url label =
    newTabLink
        []
        { url = url
        , label = text label
        }
