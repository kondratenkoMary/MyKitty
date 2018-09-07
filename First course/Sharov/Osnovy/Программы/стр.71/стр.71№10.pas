Program zachet;
type
  stud=record
    number,m1,m2,m3:integer;
    lastname, name, fathername:string;
  end;
var
  f:file of stud;
begin
  writeln('ֲגוהטעו טלÿ פאיכא');
  readln(s);
  assign(f,s);
  rewrite(f);
  for i:=1 to 10 do
    begin
      readln(number);
      
      