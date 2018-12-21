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
                      , courses = []
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , courses = []
                      }
                    , Cmd.none
                    )

        GotCourse result ->
            case result of
                Ok value ->
                    ( { response = Success "course found!"
                      , courses = []
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , courses = []
                      }
                    , Cmd.none
                    )

        GotCourseList result ->
            case result of
                Ok value ->
                    ( { response = Success "courses found!"
                      , courses = List.append model.courses value
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , courses = model.courses
                      }
                    , Cmd.none
                    )
