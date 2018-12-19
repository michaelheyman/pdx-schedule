module Model exposing (..)

import Http


type Response
    = Failure Http.Error
    | Loading
    | Success String


type alias Model =
    { response : Response
    , course : Maybe Course
    , courses : List Course
    }


type Msg
    = GotInstructor (Result Http.Error Instructor)
    | GotCourse (Result Http.Error Course)
    | GotCourseList (Result Http.Error (List Course))


type alias Course =
    { id : Int
    , name : String
    , number : String
    , crn : Int
    , url : Maybe String
    , instructorId : Maybe Int
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
