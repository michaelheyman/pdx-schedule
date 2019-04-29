module Subscriptions exposing (subscriptions)

import Bootstrap.Accordion as Accordion
import Bootstrap.Dropdown as Dropdown
import Model exposing (Model, Msg(..), Response(..))
import Time exposing (every)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Accordion.subscriptions model.accordionState AccordionMsg
        , Dropdown.subscriptions model.dropdownState DropdownMsg
        , case model.response of
            Loading ->
                Time.every 10 IncrementProgressBar

            _ ->
                Sub.none
        ]
