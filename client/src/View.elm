module View exposing (view)

import Browser exposing (Document)
import Element exposing (..)
import Model exposing (Class, Instructor, Model, Msg(..), Response(..))
import Round exposing (round)


view : Model -> Document Msg
view model =
    { title = "PSU Schedule"
    , body =
        [ Element.layout [] (renderPage model)
        ]
    }


renderPage : Model -> Element Msg
renderPage model =
    Element.column []
        [ pageHeader model
        , Element.row [] [ viewSidebar model, viewPage model ]
        , viewFooter model
        ]


pageHeader : Model -> Element Msg
pageHeader model =
    Element.row []
        [ Element.text "PSU Schedule" ]


viewSidebar : Model -> Element Msg
viewSidebar model =
    Element.column [] (List.map Element.text model.disciplines)


viewPage : Model -> Element Msg
viewPage model =
    courseTable model


courseTable : Model -> Element Msg
courseTable model =
    let
        data =
            List.filter (filterCourse model.searchFilter model.currentDiscipline) model.classes
    in
    Element.table []
        { data = data
        , columns =
            [ { header = Element.text "Class"
              , width = fill
              , view =
                    \class ->
                        Element.text class.course.number
              }
            , { header = Element.text "Name"
              , width = fill
              , view =
                    \class ->
                        Element.text class.course.name
              }
            , { header = Element.text "Days"
              , width = fill
              , view =
                    \class ->
                        Element.text (Maybe.withDefault "" class.days)
              }
            , { header = Element.text "Time"
              , width = fill
              , view =
                    \class ->
                        Element.text (Maybe.withDefault "" class.time)
              }
            , { header = Element.text "Credits"
              , width = fill
              , view =
                    \class ->
                        Element.text (String.fromInt class.credits)
              }
            , { header = Element.text "Instructor"
              , width = fill
              , view =
                    \class ->
                        Maybe.map (\inst -> Element.text (instructorName inst)) class.instructor
                            |> Maybe.withDefault (Element.text "")
              }
            , { header = Element.text "Rating"
              , width = fill
              , view =
                    \class ->
                        Maybe.map viewRating class.instructor
                            |> Maybe.withDefault (Element.text "")
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
        |> Maybe.withDefault (Element.text "")


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
            Element.text (timeFormat course)

        Nothing ->
            Element.text ""


viewFooter : Model -> Element Msg
viewFooter model =
    Element.column []
        [ Element.row []
            [ externalLink "https://github.com/michaelheyman/pdx-schedule/" "Source"
            , Element.newTabLink
                []
                { url = "mailto:contact@mheyman.com?subject=Site Feedback"
                , label = Element.text "Contact"
                }
            , Element.text "Last Updated"
            , viewTimestamp model
            ]
        , Element.text "The contents of this page are not sanctioned by Portland State University."
        ]


externalLink : String -> String -> Element Msg
externalLink url label =
    Element.newTabLink
        []
        { url = url
        , label = Element.text label
        }
