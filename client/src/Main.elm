module Main exposing (init, main)

import Bootstrap.Accordion as Accordion
import Bootstrap.Navbar as Navbar
import Browser
import Decode exposing (getClassList, getTermList)
import Model exposing (Model, Msg(..), Response(..))
import Subscriptions exposing (subscriptions)
import Update exposing (update)
import View exposing (view)


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : () -> ( Model, Cmd Msg )
init _ =
    let
        ( navbarState, navbarCmd ) =
            Navbar.initialState NavbarMsg
    in
    ( { response = Loading
      , classes = []
      , disciplines = []
      , term = ""
      , terms = []
      , loadingValue = 10
      , search = ""
      , currentDiscipline = "Computer Science"
      , accordionState = Accordion.initialState
      , navbarState = navbarState
      , termSearch = "latest"
      }
    , Cmd.batch [ getClassList "latest", getTermList ]
    )
