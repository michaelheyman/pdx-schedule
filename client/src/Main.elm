module Main exposing (..)

import Browser
import Decode exposing (..)
import Html exposing (Html, div, pre, table, tbody, td, text, th, thead, tr)
import Html.Attributes exposing (class)
import Http
import Model exposing (..)
import Subscriptions exposing (..)
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
      , course = Nothing
      }
    , getCourse
    )


getInstructor : Cmd Msg
getInstructor =
    Http.get
        { url = "http://localhost:3000/instructor/1"
        , expect = Http.expectJson GotInstructor instructorDecoder
        }


getCourse : Cmd Msg
getCourse =
    Http.get
        { url = "http://localhost:3000/course/1"
        , expect = Http.expectJson GotCourse courseDecoder
        }



{- This is just a more complicated version of getInstructor, they work the same -}


requestInstructor : Cmd Msg
requestInstructor =
    Http.request
        { method = "GET"
        , headers = []
        , url = "http://localhost:3000/instructor/1"
        , body = Http.emptyBody
        , expect = Http.expectJson GotInstructor instructorDecoder
        , timeout = Nothing
        , tracker = Nothing
        }
