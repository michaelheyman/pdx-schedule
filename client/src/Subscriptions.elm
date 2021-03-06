module Subscriptions exposing (subscriptions)

import Bootstrap.Dropdown as Dropdown
import Bootstrap.Navbar as Navbar
import Model exposing (Model, Msg(..), Response(..))
import Time exposing (every)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Dropdown.subscriptions model.dropdownState DropdownMsg
        , case model.response of
            Loading ->
                Time.every 10 IncrementProgressBar

            _ ->
                Sub.none
        , Navbar.subscriptions model.navbarState NavbarMsg
        ]
