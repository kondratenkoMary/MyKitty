Program qq;
var
x,a:integer;
begin
  readln(x);
  a:=x;
  while (x<>0) and (a>0) do
    begin
      if x<0
        then a:=x;
      readln(x);
    end;
  writeln('ответ: ', a);
end.
