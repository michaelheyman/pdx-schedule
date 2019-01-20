module Model exposing (Class, Course, Instructor, Model, Msg(..), Response(..), Term)

import Bootstrap.Accordion as Accordion
import Http
import Time


type Response
    = Failure Http.Error
    | Loading
    | Success


type alias Model =
    { response : Response
    , classes : List Class
    , disciplines : List String
    , term : String
    , loadingValue : Float
    , search : String
    , filter : String
    , accordionState : Accordion.State
    }


type Msg
    = GotClassList (Result Http.Error (List Class))
    | IncrementProgressBar Time.Posix
    | Search String
    | Filter String
    | AccordionMsg Accordion.State
    | NoOp


type alias Course =
    { id : Int
    , name : String
    , number : String
    , discipline : String
    }


type alias Instructor =
    { id : Int
    , fullName : String
    , firstName : Maybe String
    , lastName : Maybe String
    , rating : Maybe Float
    , url : Maybe String
    }


type alias Term =
    { date : Int
    , description : String
    }


type alias Class =
    { id : Int
    , credits : Int
    , days : Maybe String
    , time : Maybe String
    , crn : Int
    , timestamp : String
    , course : Course
    , instructor : Maybe Instructor
    , term : Term
    }
