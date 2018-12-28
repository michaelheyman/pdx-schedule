module Main exposing (..)

import Browser
import Decode exposing (..)
import Model exposing (..)
import Process
import Subscriptions exposing (..)
import Time exposing (..)
import Update exposing (..)
import View exposing (..)


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { response = Loading
      , courses = []
      , loadingValue = 10
      }
    , getCourseList
    )
