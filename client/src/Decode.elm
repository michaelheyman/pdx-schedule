module Decode exposing (..)

import Http
import Json.Decode as Decode
import Json.Decode.Extra as Decode
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
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
        |> Decode.andMap (Decode.field "days" Decode.string)
        |> Decode.andMap (Decode.field "time" Decode.string)
        |> Decode.andMap (Decode.field "credits" Decode.int)
        |> Decode.andMap (Decode.field "crn" Decode.int)
        |> Decode.andMap (Decode.maybe (Decode.field "url" Decode.string))
        |> Decode.andMap (Decode.maybe (Decode.field "instructor_id" instructorDecoder))
        |> Decode.andMap (Decode.field "timestamp" Decode.string)



--courseDecoder : Decode.Decoder Course
--courseDecoder =
--    Decode.succeed Course
--        |> required "id" Decode.int
--        |> required "name" Decode.string
--        |> required "number" Decode.string
--        |> required "days" Decode.string
--        |> required "time" Decode.string
--        |> required "credits" Decode.int
--        |> required "crn" Decode.int
--        |> optional "url" Decode.string ""
--        |> optional "instructor_id" instructorDecoder Nothing
--        |> required "timestamp" Decode.string
--courseDecoder : Decode.Decoder Course
--courseDecoder =
--    Decode.map8
--        Course
--        (Decode.field "id" Decode.int)
--        (Decode.field "name" Decode.string)
--        (Decode.field "number" Decode.string)
--        (Decode.field "credits" Decode.int)
--        (Decode.field "crn" Decode.int)
--        (Decode.maybe (Decode.field "url" Decode.string))
--        (Decode.maybe (Decode.field "instructor_id" instructorDecoder))
--        (Decode.field "timestamp" Decode.string)


type alias User =
    { id : Int
    , email : Maybe String
    , name : String
    , percentExcited : Float
    }


userDecoder : Decode.Decoder User
userDecoder =
    Decode.succeed User
        |> required "id" Decode.int
        |> required "email" (Decode.nullable Decode.string)
        -- `null` decodes to `Nothing`
        |> optional "name" Decode.string "(fallback if name is `null` or not present)"
        |> hardcoded 1.0



--(Decode.field "days" Decode.string)
--(Decode.field "time" Decode.string)


courseListDecoder : Decode.Decoder (List Course)
courseListDecoder =
    Decode.list courseDecoder


instructorListDecoder : Decode.Decoder (List Instructor)
instructorListDecoder =
    Decode.list instructorDecoder


getInstructor : Int -> Cmd Msg
getInstructor id =
    Http.get
        { url = "./instructor/" ++ String.fromInt id
        , expect = Http.expectJson GotInstructor instructorDecoder
        }


getCourse : Int -> Cmd Msg
getCourse id =
    Http.get
        { url = "./course/" ++ String.fromInt id
        , expect = Http.expectJson GotCourse courseDecoder
        }


getCourseList : Cmd Msg
getCourseList =
    Http.get
        { url = "./courses/"
        , expect = Http.expectJson GotCourseList courseListDecoder
        }
