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
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , course = Nothing
                      }
                    , Cmd.none
                    )

        GotCourse result ->
            case result of
                Ok value ->
                    ( { response = Success "course found!"
                      , course = Just value
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { response = Failure error
                      , course = Nothing
                      }
                    , Cmd.none
                    )
