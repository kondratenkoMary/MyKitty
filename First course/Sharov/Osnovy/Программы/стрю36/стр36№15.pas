Program qq;
const N=5;
var
i,b,x,p:integer;
begin
  readln(b)
  for i:=1 to N do
    begin
      readln(x);
      if x>b
        then 
          p:=i;
    end;
  writeln('Ответ: ',p);
end.