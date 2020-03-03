module Update exposing (update)

import Browser.Dom as Dom
import Decode exposing (getClassList)
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
                        , classes = value
                        , disciplines =
                            unique <|
                                List.map (.course >> .discipline) value
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

        GotTermList result ->
            case result of
                Ok value ->
                    ( { model | terms = value }, Cmd.none )

                Err _ ->
                    ( { model | terms = [] }, Cmd.none )

        MakeApiRequest param ->
            ( { model
                | termSearch = param
              }
            , getClassList param
            )

        IncrementProgressBar _ ->
            ( { model | loadingValue = model.loadingValue + 75 }, Cmd.none )

        FilterRecords filter ->
            ( { model | searchFilter = filter }, Cmd.none )

        DisciplineFilter discipline ->
            ( { model
                | currentDiscipline = discipline
              }
            , resetViewport
            )

        NavbarMsg state ->
            ( { model | navbarState = state }, Cmd.none )

        DropdownMsg state ->
            ( { model | dropdownState = state }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


resetViewport : Cmd Msg
resetViewport =
    Task.perform (\_ -> NoOp) (Dom.setViewport 0 0)
