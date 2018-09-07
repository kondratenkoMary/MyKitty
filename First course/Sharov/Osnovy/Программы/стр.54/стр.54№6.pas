Program minelementistrok;
const
  n=4;
  m=3;
type
  TA=array[1..n,1..m] of integer;
  TC=array[1..n] of integer;
var
  a:TA;
  c:TC;
  i,j,min:integer;
begin
  for i:=1 to n do
    for j:=1 to m do
      read(a[i,j]);
  for i:=1 to n do
    begin
      min:=a[i,1];
      c[i]:=min;
    for j:=1 to m do
      begin
        if a[i,j]<min
          then c[i]:=a[i,j];
      end;
    end;
  writeln('Ответ: ');
  for i:=1 to n do
    write(c[i],' ');
end.