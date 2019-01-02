module Decode exposing (..)

import Http
import Json.Decode as Decode
import Json.Decode.Extra as Decode
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
    Decode.succeed Course
        |> Decode.andMap (Decode.field "id" Decode.int)
        |> Decode.andMap (Decode.field "name" Decode.string)
        |> Decode.andMap (Decode.field "number" Decode.string)
        |> Decode.andMap (Decode.field "discipline" Decode.string)
        |> Decode.andMap (Decode.maybe (Decode.field "days" Decode.string))
        |> Decode.andMap (Decode.maybe (Decode.field "time" Decode.string))
        |> Decode.andMap (Decode.field "credits" Decode.int)
        |> Decode.andMap (Decode.field "crn" Decode.int)
        |> Decode.andMap (Decode.maybe (Decode.field "instructor_id" instructorDecoder))
        |> Decode.andMap (Decode.field "timestamp" Decode.string)


courseListDecoder : Decode.Decoder (List Course)
courseListDecoder =
    Decode.list courseDecoder


getCourseList : Cmd Msg
getCourseList =
    Http.get
        { url = "/courses/"
        , expect = Http.expectJson GotCourseList courseListDecoder
        }
