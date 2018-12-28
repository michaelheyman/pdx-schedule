module Subscriptions exposing (..)

import Model exposing (..)
import Time exposing (..)


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.response of
        Loading ->
            Time.every 10 IncrementProgressBar

        _ ->
            Sub.none
