module Main exposing (..)

import Browser
import Html exposing (Html, pre, text)
import Http
import Json.Decode as Decode


-- MAIN


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type Model
    = Failure Http.Error
    | Loading
    | Success String


type alias Instructor =
    { id : Int
    , fullName : String
    , firstName : Maybe String
    , lastName : Maybe String
    , rating : Maybe Float
    , url : Maybe String
    , timestamp : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading
    , requestInstructor
    )


getTest : Cmd Msg
getTest =
    Http.get
        { url = "http://localhost:3000/test"
        , expect = Http.expectString GotTest
        }


getInstructor : Cmd Msg
getInstructor =
    Http.get
        { url = "http://localhost:3000/instructor/1"
        , expect = Http.expectJson GotInstructor instructorDecoder
        }


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



-- UPDATE


type Msg
    = GotTest (Result Http.Error String)
    | GotInstructor (Result Http.Error Instructor)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotTest result ->
            case result of
                Ok value ->
                    ( Success value, Cmd.none )

                Err error ->
                    ( Failure error, Cmd.none )

        GotInstructor result ->
            case result of
                Ok value ->
                    ( Success "instructor found!", Cmd.none )

                Err error ->
                    ( Failure error, Cmd.none )


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


getResponse : String
getResponse =
    """{"id":1,"fullName":"David D. Ely","firstName":"David","lastName":"Ely","rating":3.8,"url":"http://www.ratemyprofessors.com/ShowRatings.jsp?tid=2290506","timestamp":"2018-12-16T18:36:38.733Z"}"""



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    case model of
        Failure error ->
            text (Debug.toString error)

        Loading ->
            text "Loading..."

        Success fullText ->
            pre [] [ text fullText ]
