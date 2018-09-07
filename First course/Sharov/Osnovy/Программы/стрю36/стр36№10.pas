Program qq;
var x,min,p,i,a:integer;
begin
  readln(x);
  min:=x;
  i:=0;
  p:=-11;
  while (x<>0) and (p<0) do
    begin
      i:=i+1;
      if x<min
        then begin
               min:=x;
               p:=i;
             end;
      readln(x);
    end;
 writeln('Порядковый номер: ', p);
 end.
      
      