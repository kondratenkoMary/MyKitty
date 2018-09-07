Program qq;
const N=5;
var
flag,x,i,p:integer;
begin
  flag:=0;
  for i:=1 to N do
    begin
      readln(x);
      if (x>0) and (flag=0)
        then begin 
               p:=i;
               flag:=1;
             end;
    end;
  If flag=1
    then writeln('Ответ: ', p)
    else writeln('ответа нет');
end.