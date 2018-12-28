module Model exposing (..)

import Http
import Time


type Response
    = Failure Http.Error
    | Loading
    | Success


type alias Model =
    { response : Response
    , courses : List Course
    , loadingValue : Float
    }


type Msg
    = GotCourseList (Result Http.Error (List Course))
    | IncrementProgressBar Time.Posix


type alias Course =
    { id : Int
    , name : String
    , number : String
    , days : Maybe String
    , time : Maybe String
    , credits : Int
    , crn : Int
    , url : Maybe String
    , instructor : Maybe Instructor
    , timestamp : String
    }


type alias Instructor =
    { id : Int
    , fullName : String
    , firstName : Maybe String
    , lastName : Maybe String
    , rating : Maybe Float
    , url : Maybe String
    , timestamp : String
    }
