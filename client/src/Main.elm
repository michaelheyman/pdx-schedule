module Main exposing (..)

import Browser
import Html exposing (Html, div, pre, table, tbody, td, text, th, thead, tr)
import Html.Attributes exposing (class)
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


type alias Course =
    { id : Int
    , name : String
    , number : String
    , crn : Int
    , url : Maybe String
    , instructor_id : Maybe Int
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


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading
    , getCourse
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



-- UPDATE


type Msg
    = GotTest (Result Http.Error String)
    | GotInstructor (Result Http.Error Instructor)
    | GotCourse (Result Http.Error Course)


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

        GotCourse result ->
            case result of
                Ok value ->
                    ( Success "course found!", Cmd.none )

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



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    viewTest model


viewTest : Model -> Html Msg
viewTest model =
    case model of
        Failure error ->
            text (Debug.toString error)

        Loading ->
            text "Loading..."

        Success fullText ->
            pre [] [ text fullText ]


viewTable : Html Msg
viewTable =
    div [ class "col-md-4" ]
        [ table [ class "table table-striped" ]
            [ thead []
                [ tr []
                    [ th [] [ text "Column 1" ]
                    , th [] [ text "Column 2" ]
                    ]
                ]
            , tbody []
                [ tr []
                    [ td [] [ text "Value 1" ]
                    , td [] [ text "Value 2" ]
                    ]
                , tr []
                    [ td [] [ text "Value 3" ]
                    , td [] [ text "Value 4" ]
                    ]
                , tr []
                    [ td [] [ text "Value 5" ]
                    , td [] [ text "Value 6" ]
                    ]
                ]
            ]
        ]
