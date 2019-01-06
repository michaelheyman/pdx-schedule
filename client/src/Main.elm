module Main exposing (init, main)

import Bootstrap.Accordion as Accordion
import Browser
import Decode exposing (getCourseList)
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
    ( { response = Loading
      , courses = []
      , disciplines = []
      , loadingValue = 10
      , search = ""
      , filter = ""
      , accordionState = Accordion.initialState
      }
    , getCourseList
    )
