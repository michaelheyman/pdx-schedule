module Update exposing (update)

import Bootstrap.Accordion as Accordion
import Browser.Dom as Dom
import List.Extra exposing (unique)
import Model exposing (Model, Msg(..), Response(..))
import Task


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotClassList result ->
            case result of
                Ok value ->
                    ( { model
                        | response = Success
                        , classes = List.append model.classes value
                        , disciplines =
                            value
                                |> List.map (.course >> .discipline)
                                |> unique
                                |> List.append model.disciplines
                        , term =
                            value
                                |> List.map (.term >> .description)
                                |> List.head
                                |> Maybe.withDefault ""
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model
                        | response = Failure error
                        , classes = []
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
            , resetViewport
            )

        AccordionMsg state ->
            ( { model | accordionState = state }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


resetViewport : Cmd Msg
resetViewport =
    Task.perform (\_ -> NoOp) (Dom.setViewport 0 0)
