module Decode exposing (..)

import Http
import Json.Decode as Decode
import Model exposing (..)


instructorDecoder : Decode.Decoder Instructor
instructorDecoder =
    Decode.map7
        Instructor
        (Decode.field "id" Decode.int)
        (Decode.field "fullName" Decode.string)
        (Decode.maybe (Decode.field "firstName" Decode.string))
        (Decode.maybe (Decode.field "lastName" Decode.string))
        (Decode.maybe (Decode.field "rating" Decode.float))
        (Decode.maybe (Decode.field "url" Decode.string))
        (Decode.field "timestamp" Decode.string)


courseDecoder : Decode.Decoder Course
courseDecoder =
    Decode.map7
        Course
        (Decode.field "id" Decode.int)
        (Decode.field "name" Decode.string)
        (Decode.field "number" Decode.string)
        (Decode.field "crn" Decode.int)
        (Decode.maybe (Decode.field "url" Decode.string))
        (Decode.maybe (Decode.field "instructor_id" Decode.int))
        (Decode.field "timestamp" Decode.string)


getResponse : String
getResponse =
    """{"id":1,"fullName":"David D. Ely","firstName":"David","lastName":"Ely","rating":3.8,"url":"http://www.ratemyprofessors.com/ShowRatings.jsp?tid=2290506","timestamp":"2018-12-16T18:36:38.733Z"}"""


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
