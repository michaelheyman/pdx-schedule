module Main exposing (..)

import Bootstrap.Accordion as Accordion
import Browser
import Decode exposing (..)
import Model exposing (..)
import Process
import Subscriptions exposing (..)
import Time exposing (..)
import Update exposing (..)
import View exposing (..)


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
