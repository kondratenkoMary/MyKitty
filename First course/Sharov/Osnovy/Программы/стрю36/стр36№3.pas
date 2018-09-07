Program qq;
const N=7;
var 
i,count,f:integer;
x: real;
begin
  i:=1;
  f:=-1;
  count:=0;
  while i <= N do
    begin
      readln(x);
      if (x*f)>0 
        then count:=count+1;
    i:=i+1;
    end;
   writeln('Кол-во отрицательных числе: ', count);
end.
        