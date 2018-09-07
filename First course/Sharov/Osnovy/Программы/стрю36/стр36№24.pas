Program qq;
var
flag,a,c,x:integer;
begin
c:=1;
flag:=-1;
read(x);
a:=x;
while (x<>0) and (flag<>0) do
  begin
    read(x);
    if x<=a
      then begin
             a:=x;
             if flag=1
               then flag:=0;
           end
      else begin
             a:=x;
             c:=c+1;
             flag:=1;
           end;
  end;
if c<>0 
  then writeln('Длина последовательноси: ',c)
  else writeln('Нет');
end.
  
    