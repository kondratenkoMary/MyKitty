object Form1: TForm1
  Left = 401
  Top = 83
  Width = 1044
  Height = 832
  Caption = 'Form1'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 13
  object Label1: TLabel
    Left = 32
    Top = 448
    Width = 349
    Height = 37
    Caption = #1042#1074#1077#1076#1080#1090#1077' '#1085#1086#1074#1086#1077' '#1086#1087#1080#1089#1072#1085#1080#1077
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -32
    Font.Name = 'MS Sans Serif'
    Font.Style = []
    ParentFont = False
  end
  object Button1: TButton
    Left = 288
    Top = 344
    Width = 75
    Height = 25
    Caption = 'GO'
    TabOrder = 0
    OnClick = Button1Click
  end
  object StringGrid1: TStringGrid
    Left = 40
    Top = 32
    Width = 657
    Height = 281
    ColCount = 2
    FixedCols = 0
    RowCount = 10
    TabOrder = 1
    OnClick = StringGrid1Click
    OnDblClick = StringGrid1Click
    ColWidths = (
      239
      360)
  end
  object Edit1: TEdit
    Left = 24
    Top = 496
    Width = 361
    Height = 41
    TabOrder = 2
  end
end
