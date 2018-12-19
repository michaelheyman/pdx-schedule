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
    Decode.map8
        Course
        (Decode.field "id" Decode.int)
        (Decode.field "name" Decode.string)
        (Decode.field "number" Decode.string)
        (Decode.field "credits" Decode.int)
        (Decode.field "crn" Decode.int)
        (Decode.maybe (Decode.field "url" Decode.string))
        (Decode.maybe (Decode.field "instructor_id" instructorDecoder))
        (Decode.field "timestamp" Decode.string)


courseListDecoder : Decode.Decoder (List Course)
courseListDecoder =
    Decode.list courseDecoder


instructorListDecoder : Decode.Decoder (List Instructor)
instructorListDecoder =
    Decode.list instructorDecoder


getInstructor : Int -> Cmd Msg
getInstructor id =
    Http.get
        { url = "http://localhost:3000/instructor/" ++ String.fromInt id
        , expect = Http.expectJson GotInstructor instructorDecoder
        }


getCourse : Int -> Cmd Msg
getCourse id =
    Http.get
        { url = "http://localhost:3000/course/" ++ String.fromInt id
        , expect = Http.expectJson GotCourse courseDecoder
        }


getCourseList : Cmd Msg
getCourseList =
    Http.get
        { url = "http://localhost:3000/courses/"
        , expect = Http.expectJson GotCourseList courseListDecoder
        }
