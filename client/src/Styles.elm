module Styles exposing (..)

import Bootstrap.Table as Table
import Bootstrap.Utilities.Display as Display
import Bootstrap.Utilities.Spacing as Spacing
import Html exposing (Html)
import Html.Attributes exposing (class, style)


hiddenCell : List (Table.CellOption msg)
hiddenCell =
    [ Table.cellAttr (style "display" "none")
    , Table.cellAttr (style "visibility" "hidden")
    ]


hiddenSm : List (Table.CellOption msg)
hiddenSm =
    [ Table.cellAttr Display.none
    , Table.cellAttr Display.tableCellMd
    ]


hiddenMd : List (Table.CellOption msg)
hiddenMd =
    [ Table.cellAttr Display.none
    , Table.cellAttr Display.tableCellLg
    ]


blockSm : List (Table.CellOption msg)
blockSm =
    [ Table.cellAttr Display.blockSm
    , Table.cellAttr Display.inlineBlockSm
    ]


pageHeaderStyle : List (Html.Attribute msg)
pageHeaderStyle =
    [ class "bd-pageheader"
    , style "background-color" "#563d7c"
    , style "color" "white"
    , Spacing.pt5
    , Spacing.pb5
    , Spacing.mb3
    , Spacing.mb5Md
    ]



-- "#576D1A" PSU Color


footerStyle : List (Html.Attribute msg)
footerStyle =
    [ class "bd-footer text-muted"
    , style "background-color" "#f7f7f7"
    , Spacing.p5
    ]
