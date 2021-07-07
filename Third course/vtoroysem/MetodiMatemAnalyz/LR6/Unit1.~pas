unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls;

type
  TForm1 = class(TForm)
    Memo1: TMemo;
    Edit1: TEdit;
    Button1: TButton;
    Label1: TLabel;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);

  private
    { Private declarations }
  public
    { Public declarations }
    function FunctX(X:real):real;
    function PogChamp(X:real):real;
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

function Tform1.FunctX(X:real):real;
begin
  FunctX:=(-250*x*x*x + 237.5*x*x - 62.5*x + 5);//вычисление значения функции
end;
function Tform1.PogChamp(X:real):real;
begin
  PogChamp:=((0-X)*(0.2-X)*(0.4-X)*(0.6-X))/120;
end;

procedure TForm1.FormCreate(Sender: TObject);
begin
  memo1.Clear;
end;

procedure TForm1.Button1Click(Sender: TObject);
var
  x:real;
  xx:array [1..4]of real;
  i:integer;
begin
  //x:=StrToFloat(edit1.text);
  xx[1]:=0.1;
  xx[2]:=0.3;
  xx[3]:=0.5;
  xx[4]:=0.7;
  for i:=1 to 4 do
  begin
    memo1.Lines.Add('Ln('+floattostr(xx[i])+')='+FloatToStr(FunctX(xx[i])));
    memo1.Lines.Add('Погрешность:'+FloatToStr(PogChamp(xx[i])));
  end;
end;

end.
