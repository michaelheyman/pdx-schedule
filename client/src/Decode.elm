module Decode exposing (getClassList)

import Http
import Json.Decode as Decode
import Json.Decode.Extra as Decode
import Model exposing (Class, Course, Instructor, Msg(..), Term)


classDecoder : Decode.Decoder Class
classDecoder =
    Decode.succeed Class
        |> Decode.andMap (Decode.field "id" Decode.int)
        |> Decode.andMap (Decode.field "credits" Decode.int)
        |> Decode.andMap (Decode.maybe (Decode.field "days" Decode.string))
        |> Decode.andMap (Decode.maybe (Decode.field "time" Decode.string))
        |> Decode.andMap (Decode.field "crn" Decode.int)
        |> Decode.andMap (Decode.field "timestamp" Decode.string)
        |> Decode.andMap (Decode.field "course" courseDecoder)
        |> Decode.andMap (Decode.maybe (Decode.field "instructor" instructorDecoder))
        |> Decode.andMap (Decode.field "term" termDecoder)


termDecoder : Decode.Decoder Term
termDecoder =
    Decode.succeed Term
        |> Decode.andMap (Decode.field "date" Decode.int)
        |> Decode.andMap (Decode.field "description" Decode.string)


instructorDecoder : Decode.Decoder Instructor
instructorDecoder =
    Decode.succeed Instructor
        |> Decode.andMap (Decode.field "id" Decode.int)
        |> Decode.andMap (Decode.field "fullName" Decode.string)
        |> Decode.andMap (Decode.maybe (Decode.field "firstName" Decode.string))
        |> Decode.andMap (Decode.maybe (Decode.field "lastName" Decode.string))
        |> Decode.andMap (Decode.maybe (Decode.field "rating" Decode.float))
        |> Decode.andMap (Decode.maybe (Decode.field "url" Decode.string))
        |> Decode.andMap (Decode.field "timestamp" Decode.string)


courseDecoder : Decode.Decoder Course
courseDecoder =
    Decode.succeed Course
        |> Decode.andMap (Decode.field "id" Decode.int)
        |> Decode.andMap (Decode.field "name" Decode.string)
        |> Decode.andMap (Decode.field "number" Decode.string)
        |> Decode.andMap (Decode.field "discipline" Decode.string)


classListDecoder : Decode.Decoder (List Class)
classListDecoder =
    Decode.list classDecoder


getClassList : Cmd Msg
getClassList =
    Http.get
        { url = "/classes/"
        , expect = Http.expectJson GotClassList classListDecoder
        }
