Program qq;
const N=5;
var
i,f,x,c:integer;
begin
  f:=1;
  for i:=1 to N do
    begin
      readln(x);
      if x*f<0
        then c:=x;
    end;
  writeln('Ответ: ',c);
end.