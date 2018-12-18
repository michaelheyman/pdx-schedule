module Update exposing (..)

import Http
import Model exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotInstructor result ->
            case result of
                Ok value ->
                    ( { response = Success "instructor found!"
                      , course = Nothing
                      , courses = []
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , course = Nothing
                      , courses = []
                      }
                    , Cmd.none
                    )

        GotCourse result ->
            case result of
                Ok value ->
                    ( { response = Success "course found!"
                      , course = Just value
                      , courses = []
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , course = Nothing
                      , courses = []
                      }
                    , Cmd.none
                    )

        GotCourseList result ->
            case result of
                Ok value ->
                    ( { response = Success "courses found!"
                      , course = Nothing
                      , courses = List.append model.courses value
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , course = Nothing
                      , courses = model.courses
                      }
                    , Cmd.none
                    )
