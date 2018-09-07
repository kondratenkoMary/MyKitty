unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls;

type
  TForm1 = class(TForm)
    Edit1: TEdit;
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    Button4: TButton;
    Button5: TButton;
    Button6: TButton;
    Button7: TButton;
    Button8: TButton;
    Button9: TButton;
    Button10: TButton;
    Button11: TButton;
    Button12: TButton;
    Button13: TButton;
    Button14: TButton;
    Button15: TButton;
    Button16: TButton;
    procedure Button3Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
    procedure Button6Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);
    procedure Button8Click(Sender: TObject);
    procedure Button9Click(Sender: TObject);
    procedure Button10Click(Sender: TObject);
    procedure Button11Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button13Click(Sender: TObject);
    procedure Button14Click(Sender: TObject);
    procedure Button15Click(Sender: TObject);
    procedure Button16Click(Sender: TObject);
    procedure Button12Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;
  arg1,arg2:integer;
  znak:char;

implementation

{$R *.dfm}

procedure TForm1.Button3Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'1';
end;

procedure TForm1.Button1Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'5';
end;

procedure TForm1.Button4Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'2';
end;

procedure TForm1.Button5Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'3';
end;

procedure TForm1.Button6Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'4';
end;

procedure TForm1.Button7Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'6';
end;

procedure TForm1.Button8Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'7';
end;

procedure TForm1.Button9Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'8';
end;

procedure TForm1.Button10Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'9';
end;

procedure TForm1.Button11Click(Sender: TObject);
begin
Edit1.Text:=Edit1.Text+'0';
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
Edit1.Text:='';
end;

procedure TForm1.Button13Click(Sender: TObject);
begin
arg1:=StrToInt(Edit1.Text);
znak:='+';
Edit1.Text:='';
end;

procedure TForm1.Button14Click(Sender: TObject);
begin
arg1:=StrToInt(Edit1.Text);
znak:='-';
Edit1.Text:='';
end;

procedure TForm1.Button15Click(Sender: TObject);
begin
arg1:=StrToInt(Edit1.Text);
znak:='*';
Edit1.Text:='';
end;

procedure TForm1.Button16Click(Sender: TObject);
begin
arg1:=StrToInt(Edit1.Text);
znak:='/';
Edit1.Text:='';
end;

procedure TForm1.Button12Click(Sender: TObject);
begin
arg2:=StrToInt(Edit1.Text);
if (znak='+')
  then   arg2:=arg1+arg2;
if (znak='-')
  then   arg2:=arg1-arg2;
if (znak='*')
  then   arg2:=arg1*arg2;
if (znak='/')
  then if (arg2<>0)
       then  arg2:=arg1 div arg2
       else begin
              Edit1.Text:='Error';
              Exit;
            end;
Edit1.Text:=IntToStr(arg2);
end;

end.
