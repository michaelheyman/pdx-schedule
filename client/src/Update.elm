module Update exposing (..)

import Http
import Model exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotCourseList result ->
            case result of
                Ok value ->
                    ( { model
                        | response = Success
                        , courses = List.append model.courses value
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | response = Failure error
                        , courses = model.courses
                      }
                    , Cmd.none
                    )

        IncrementProgressBar _ ->
            ( { model | loadingValue = model.loadingValue + 75 }, Cmd.none )
