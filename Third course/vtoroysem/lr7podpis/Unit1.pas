unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls;

type
  TForm1 = class(TForm)
    Edit1: TEdit;
    Edit2: TEdit;
    Edit3: TEdit;
    Edit4: TEdit;
    Edit5: TEdit;
    Edit6: TEdit;
    Edit7: TEdit;
    Edit8: TEdit;
    Label1: TLabel;
    Label2: TLabel;
    Edit9: TEdit;
    Edit10: TEdit;
    Edit11: TEdit;
    Edit12: TEdit;
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    Button4: TButton;
    Label3: TLabel;
    Label4: TLabel;
    Label5: TLabel;
    Label6: TLabel;
    Label7: TLabel;
    Label8: TLabel;
    Label9: TLabel;
    Label10: TLabel;
    Label11: TLabel;
    Label12: TLabel;
    Label13: TLabel;
    Label14: TLabel;
    procedure Button1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Edit1Change(Sender: TObject);
    procedure Edit2Change(Sender: TObject);
    procedure Edit3Change(Sender: TObject);
    procedure Edit5Change(Sender: TObject);
    procedure Edit6Change(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Edit9Change(Sender: TObject);
    procedure Edit10Change(Sender: TObject);
    procedure Edit11Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;
  flag1,flag2,flag3:boolean;
  i:integer;
  function NOD(a,b:longint):longint;
implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
var
  i:integer;
  P,G,X,Y:integer;
  f1,f2,f3:boolean;
  poo:integer;
  GG:int64;
begin
  P:=strtoint(edit1.text);
  G:=strtoint(edit2.text);
  X:=strtoint(edit3.text);
  if P>G //проверки
  then f1:=true
  else begin
         f1:=false;
         edit2.Color:=clRed;
       end;
  poo:=0;//P простое?
  for i:=1 to P do
  begin
    if (P mod i)=0
    then inc(poo);
  end;
  if poo=2
  then f2:=true
  else begin
         f2:=false;
         edit1.Color:=clRed;
       end;
  if (X>1)and(X<=P-1)
  then f3:=true
  else begin
         f3:=false;
         edit3.Color:=clRed;
       end;

  if f1 and f2 and f3
  then flag1:=true
  else begin
         flag1:=false;
         //showmessage('Введены неверные значения P,G или Х');
         edit4.Text:='';
       end;

  GG:=1;//вычисление Y - ключа
  i:=1;
  if flag1
  then begin
         while i<=X do
         begin
           GG:=GG*G;
           inc(i);
         end;
         Y:=GG mod P;
         edit4.text:=floattostr(Y);
       end;
end;

function NOD(a,b:longint):longint;
begin
repeat
 if a>b then a:=a-b 
 else b:=b-a;
until a=b;
NOD:=a;
end;

procedure TForm1.Button2Click(Sender: TObject);
var
  m,K,G,X:int64;
  GG,a,b:int64;
  flag:boolean;
  i:integer;
  f1,f2:boolean;
  P:integer;
begin
  P:=strtoint(edit1.text);
  G:=strtoint(edit2.text);
  X:=strtoint(edit3.text);
  m:=strtoint(edit6.text);
  K:=strtoint(edit5.text);
  flag2:=false;
  if (K>1) and (K<P-1) and (NOD(K,P-1)=1)
  then f1:=true
  else begin
         f1:=false;
         edit5.Color:=clRed;
       end;

  if (m>1) and (m<P-1)
  then f2:=true
  else begin
         f2:=false;
         edit6.Color:=clRed;
       end;

  if f1 and f2
  then flag2:=true
  else begin
         flag1:=false;
         showmessage('Введены неверные значения K или m');
       end;

  i:=1;
  GG:=1;
  if flag2
  then begin
         while i<=K do
         begin
           GG:=GG*G;
           inc(i);
         end;
         a:=GG mod P;
         edit7.text:=floattostr(a);

         //b:=((m-X*a)) mod (P-1);
         //b:=abs(b);
         b:=1;
         while b<=(P) do
         begin
           if m=(X*a+K*b)mod(P-1)
           then begin
                  edit8.text:=floattostr(b);
                  break;
                end;
           inc(b);
         end;
         //b:=(b*K) mod (P-1);
         //edit8.text:=floattostr(b);
       end;
end;

procedure TForm1.Button3Click(Sender: TObject);
var
  m,a,b,Y,P,G:longint;
  YY,aa,GG:int64;
  flag:boolean;
  i:integer;
  a1,a2:int64;
begin
  P:=strtoint(edit1.text);
  G:=strtoint(edit2.text);
  m:=strtoint(edit9.text);
  a:=strtoint(edit10.text);
  b:=strtoint(edit11.text);
  Y:=strtoint(edit4.text);

  YY:=1;
  for i:=1 to a do
    YY:=YY*Y;
  aa:=1;
  for i:=1 to b do
    aa:=aa*a;
  a1:=(YY*aa)mod P;

  GG:=1;
  for i:=1 to m do
    GG:=GG*G;
  a2:= GG mod P;

  if a1=a2
  then edit12.Text:='Сообщение подлинное'
  else edit12.Text:='Сообщение недостоверное';
end;

procedure TForm1.FormCreate(Sender: TObject);
begin
  flag1:=false;
  flag2:=false;
  flag3:=false;
  edit4.Enabled:=false;
  edit7.Enabled:=false;
  edit8.Enabled:=false;
  edit12.Enabled:=false;
  button1.enabled:=false;
  button2.enabled:=false;
  button3.enabled:=false;
end;

procedure TForm1.Button4Click(Sender: TObject);
begin
  close;
end;

procedure TForm1.Edit1Change(Sender: TObject);
begin
  button1.Enabled:=false;
  if (edit2.Text='') or (edit3.text='') or (edit1.Text='')
  then button1.Enabled:=false
  else button1.Enabled:=true;
  edit1.color:=clWhite;
end;

procedure TForm1.Edit2Change(Sender: TObject);
begin
  button1.Enabled:=false;
  if (edit2.Text='') or (edit3.text='') or (edit1.Text='')
  then button1.Enabled:=false
  else button1.Enabled:=true;
  edit2.color:=clWhite;
end;

procedure TForm1.Edit3Change(Sender: TObject);
begin
  button1.Enabled:=false;
  if (edit2.Text='') or (edit3.text='') or (edit1.Text='')
  then button1.Enabled:=false
  else button1.Enabled:=true;
  edit3.color:=clWhite;
end;

procedure TForm1.Edit5Change(Sender: TObject);
begin
  button2.Enabled:=false;
  edit7.Text:='';
  edit8.Text:='';
  if (edit5.Text='') or (edit6.text='')
  then button2.Enabled:=false
  else button2.Enabled:=true;
  edit5.color:=clWhite;
end;

procedure TForm1.Edit6Change(Sender: TObject);
begin
  button2.Enabled:=false;
  edit7.Text:='';
  edit8.Text:='';
  if (edit5.Text='') or (edit6.text='')
  then button2.Enabled:=false
  else button2.Enabled:=true;
  edit6.color:=clWhite;
end;

procedure TForm1.Edit9Change(Sender: TObject);
begin
  button3.Enabled:=false;
  edit12.Text:='';
  if (edit9.Text='') or (edit10.text='') or (edit11.text='') or (edit1.text='')or (edit2.text='')or (edit4.text='')
  then button3.Enabled:=false
  else button3.Enabled:=true;
  edit9.color:=clWhite;
end;

procedure TForm1.Edit10Change(Sender: TObject);
begin
  button3.Enabled:=false;
  edit12.Text:='';
  if (edit9.Text='') or (edit10.text='') or (edit11.text='') or (edit1.text='')or (edit2.text='')or (edit4.text='')
  then button3.Enabled:=false
  else button3.Enabled:=true;
  edit10.color:=clWhite;
end;

procedure TForm1.Edit11Change(Sender: TObject);
begin
  button3.Enabled:=false;
  edit12.Text:='';
  if (edit9.Text='') or (edit10.text='') or (edit11.text='') or (edit1.text='')or (edit2.text='')or (edit4.text='')
  then button3.Enabled:=false
  else button3.Enabled:=true;
  edit11.color:=clWhite;
end;

end.
