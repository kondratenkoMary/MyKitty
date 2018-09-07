Program qq;
const N=5;
var x,max:real;
i:integer;
begin
  i:=2;
  readln(x);
  max:=x;
  while i<=N do
    begin
      readln(x);
      if max<x
        then max:=x;
      i:=i+1;
    end;
 writeln('Максимум: ',max);
end.
      
      