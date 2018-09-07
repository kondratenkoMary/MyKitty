Program qq;
const N=5;
var
i,f,x,p:integer;
begin
  f:=1;
  for i:=1 to N do
    begin
      readln(x);
      if x*f<0
        then p:=i;
    end;
  writeln('Ответ: ',p);
end.