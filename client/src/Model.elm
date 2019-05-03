module Model exposing (Class, Course, Instructor, Model, Msg(..), Response(..), Term)

import Bootstrap.Dropdown as Dropdown
import Bootstrap.Navbar as Navbar
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
    , terms : List Term
    , loadingValue : Float
    , searchFilter : String
    , currentDiscipline : String
    , dropdownState : Dropdown.State
    , navbarState : Navbar.State
    , termSearch : String
    }


type Msg
    = GotClassList (Result Http.Error (List Class))
    | GotTermList (Result Http.Error (List Term))
    | MakeApiRequest String
    | IncrementProgressBar Time.Posix
    | FilterRecords String
    | DisciplineFilter String
    | NavbarMsg Navbar.State
    | DropdownMsg Dropdown.State
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
    , timestamp : String
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
