module Subscriptions exposing (..)

import Bootstrap.Accordion as Accordion
import Model exposing (..)
import Time exposing (..)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Accordion.subscriptions model.accordionState AccordionMsg
        , case model.response of
            Loading ->
                Time.every 10 IncrementProgressBar

            _ ->
                Sub.none
        ]
