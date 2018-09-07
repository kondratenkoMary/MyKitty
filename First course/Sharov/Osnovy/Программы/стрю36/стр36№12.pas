Program qq;
const N=5;
var
f,x,i,max:integer;
begin
  f:=1;
  for i:=1 to N do
    begin
      readln(x);
      if (x*f<0)
        then
          begin
            if max=0 
              then max:=x;
            if x>max
              then max:=x;
          end;
    end;
  If max<>0
    then writeln('Ответ: ', max)
    else writeln('ответа нет');
end.
      