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
    Edit9: TEdit;
    Button1: TButton;
    Button2: TButton;
    Edit10: TEdit;
    Button3: TButton;
    Button4: TButton;
    ComboBox1: TComboBox;
    ComboBox2: TComboBox;
    Label1: TLabel;
    Label2: TLabel;
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
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Edit1Change(Sender: TObject);
    procedure Edit10Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;
  ass: array [1..26] of integer;
  aaa1: array [1..12] of integer = (3,5,7,9,11,13,15,17,19,21,23,25);
  aaa2: array [1..12] of integer = (3,6,7,10,11,14,15,18,19,22,23,26);
  aaa4: array [1..11] of integer = (5,6,7,12,13,14,15,20,21,22,23);
  aaa8: array [1..10] of integer = (9,10,11,12,13,14,15,24,25,26);
  aaa16: array [1..10] of integer = (17,18,19,20,21,22,23,24,25,26);

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
var
  m,k,i,n:integer;
  ass1:string[20];
  ass2,coom:string;
begin
  ass1:=edit1.Text;
  k:=length(ass1);
  for i:=1 to k do
  begin
    ass[i]:=strtoint(ass1[i]);
  end;//vvod

  {for i:=1 to k do
  begin
    coom:=coom+inttostr(ass[i]);
  end;//vivod
  edit5.Text:=coom;}

  edit2.text:=inttostr(k);//k

  if k>=1
  then m:=2;
  if k>=2
  then m:=3;
  if k>=5
  then m:=4;
  if k>=12
  then m:=5;

  edit3.text:=inttostr(m);//m
  n:=m+k+1;
  edit4.text:=inttostr(n);//n
end;

procedure TForm1.Button2Click(Sender: TObject);
var a:array[0..26] of integer;
i,k,m,n,j,p:integer;
a1,a2,a4,a8,a16:integer;
coom:string;
begin
  a1:=0;
  a2:=0;
  a4:=0;
  a8:=0;
  a16:=0;
  k:=strtoint(edit2.Text);
  m:=strtoint(edit3.Text);
  n:=strtoint(edit4.text);
  j:=1;
  i:=0;
  while i<n do
  begin
  if (i=0)or(i=1)or(i=2)or(i=4)or(i=8)or(i=16)
  then begin
             a[i]:=2;
             i:=i+1;
             continue;
       end;
  a[i]:=ass[j];
  j:=j+1;
  i:=i+1;
  end;

  {for i:=0 to n-1 do
    coom:=coom+inttostr(a[i]);
  edit5.Text:=coom;}

  for p:=1 to n-1 do
  begin
    if p in [3,5,7,9,11,13,15,17,19,21,23,25] then
      a1:=a1+a[p];
    if p in [3,6,7,10,11,14,15,18,19,22,23,26] then
      a2:=a2+a[p];
    if p in [5,6,7,12,13,14,15,20,21,22,23] then
      a4:=a4+a[p];
    if p in [9,10,11,12,13,14,15,24,25,26] then
      a8:=a8+a[p];
    if p in [17,18,19,20,21,22,23,24,25,26] then
      a16:=a16+a[p];
  end;

  for i:=1 to n-1 do
  begin
    if (i=1) then          //
    a[i]:=a1 mod 2;
    if (i=2) then        //
    a[i]:=a2 mod 2;
    if (i=4) then      //
    a[i]:=a4 mod 2;
    if (i=8) then    //
    a[i]:=a8 mod 2;
    if (i=16) then //
    a[i]:=a16 mod 2;
  end;

  a[0]:=0;
  for p:=1 to n-1 do
  begin
    a[0]:=a[0]+a[p];
  end;
  a[0]:=a[0] mod 2;

  combobox1.Clear();
  coom:='';
  for i:=0 to n-1 do
  begin
    coom:=coom+inttostr(a[i]);
    if (i=0) or (i=1) or (i=2) or (i=4) or (i=8) or (i=16) then
    combobox1.Items.Add('a'+intToStr(i)+' = '+inttostr(a[i]));
  end;
  edit5.Text:=coom;
  edit10.Text:=coom;
end;

procedure TForm1.Button3Click(Sender: TObject);
var i,p,k,m,n:integer;
a1,a2,a4,a8,a16,f,r:integer;
e: array [0..5] of integer;
a: array [0..26] of integer;
ass1,pop,coom:string;
begin
  a1:=0;
  a2:=0;
  a4:=0;
  a8:=0;
  a16:=0;

  n:=length(edit10.text);
  if n>26 then n:=26;
  
  if n>=4
  then m:=2;
  if n>=6
  then m:=3;
  if n>=10
  then m:=4;
  if n>=18
  then m:=5;

  ass1:=edit10.Text;
  for i:=1 to n do
  begin
    a[i-1]:=strtoint(ass1[i]);
  end;

  for p:=1 to n do
  begin
    if p in [1,3,5,7,9,11,13,15,17,19,21,23,25] then
      a1:=a1+a[p];
    if p in [2,3,6,7,10,11,14,15,18,19,22,23,26] then
      a2:=a2+a[p];
    if p in [4,5,6,7,12,13,14,15,20,21,22,23] then
      a4:=a4+a[p];
    if p in [8,9,10,11,12,13,14,15,24,25,26] then
      a8:=a8+a[p];
    if p in [16,17,18,19,20,21,22,23,24,25,26] then
      a16:=a16+a[p];
  end;

  e[0]:=0;
  e[1]:=0;
  e[2]:=0;
  e[3]:=0;
  e[4]:=0;
  e[5]:=0;
  for p:=0 to n-1 do
  begin
    e[0]:=e[0]+a[p];
  end;
  e[0]:=e[0] mod 2;

  for i:=1 to n do
  begin
    if (i=1) then          //
    e[1]:=(a1) mod 2;
    if (i=2) then        //
    e[2]:=(a2) mod 2;
    if (i=4) then      //
    e[3]:=(a4) mod 2;
    if (i=8) then    //
    e[4]:=(a8) mod 2;
    if (i=16) then //
    e[5]:=(a16) mod 2;
  end;
  combobox2.clear();

  for i:=0 to m do
  begin
    combobox2.Items.Add('E'+intToStr(i)+' = '+inttostr(e[i]));
  end;

  pop:='';
  i:=1;
  p:=m;
  while p>=i do
  begin
    pop:=pop+inttostr(e[p]);
    p:=p-1;
  end;
  edit6.text:=pop;

  p:=m;
  r:=0;
  for i:=1 to p do
  begin
    if e[i]=1
    then f:=22;
  end;

  if e[0]=0
  then begin if f=22
             then r:=2
             else r:=0;
       end
  else begin if f=22
             then r:=1
             else r:=3;
       end;
  edit7.text:=inttostr(r);

  p:=m;
  k:=0;
  for i:=1 to p do
  begin
    if e[i]=1
    then begin
           if i=1
           then k:=k+1;
           if i=2
           then k:=k+2;
           if i=3
           then k:=k+4;
           if i=4
           then k:=k+8;
           if i=5
           then k:=k+16;
         end;
  end;

  edit8.Text:=inttostr(k);

  coom:='';

  if r=0 then
  begin
    for i:=0 to n-1 do
    begin
      if (i=0) or (i=1) or (i=2) or (i=4) or (i=8) or (i=16)
      then
      else
      coom:=coom+inttostr(a[i]);
    end;
    edit9.Text:=coom;
  end;

  if (r=1) then
  begin
    if a[k]=0
    then a[k]:=1
    else a[k]:=0;

    for i:=0 to n-1 do
    begin
      if (i=0) or (i=1) or (i=2) or (i=4) or (i=8) or (i=16)
      then
      else
      coom:=coom+inttostr(a[i]);
    end;
    edit9.Text:=coom;
  end;

  if (r=2) or (r=3) then
  begin
    edit9.Text:='Повторная передача';
  end;
end;

procedure TForm1.Edit1Change(Sender: TObject);
begin
  edit2.text:='';
  edit3.text:='';
  edit4.text:='';
  edit5.text:='';
  ComboBox1.Items.Clear();
end;

procedure TForm1.Edit10Change(Sender: TObject);
begin
  edit6.text:='';
  edit7.text:='';
  edit8.text:='';
  edit9.text:='';
  ComboBox2.Items.Clear();
end;

end.
