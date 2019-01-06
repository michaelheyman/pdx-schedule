module Update exposing (update)

import Bootstrap.Accordion as Accordion
import List.Extra exposing (unique)
import Model exposing (Model, Msg(..), Response(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotCourseList result ->
            case result of
                Ok value ->
                    ( { model
                        | response = Success
                        , courses = List.append model.courses value
                        , disciplines =
                            value
                                |> List.map .discipline
                                |> unique
                                |> List.append model.disciplines
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | response = Failure error
                        , courses = []
                        , disciplines = []
                      }
                    , Cmd.none
                    )

        IncrementProgressBar _ ->
            ( { model | loadingValue = model.loadingValue + 75 }, Cmd.none )

        Search str ->
            ( { model | search = str }, Cmd.none )

        Filter str ->
            ( { model
                | filter = str
                , accordionState = Accordion.initialState
              }
            , Cmd.none
            )

        AccordionMsg state ->
            ( { model | accordionState = state }, Cmd.none )
