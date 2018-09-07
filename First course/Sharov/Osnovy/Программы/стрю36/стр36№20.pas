Program qq;
var
n,x,c,i,max:integer;
begin
writeln('Введите количество чисел последовательности');
readln(n);
c:=1;
readln(x);
max:=x;
for i:=2 to n do
  begin
    readln(x);
    if x= max 
      then c:=c+1;
    if x> max
      then begin
             max:=x;
             c:=1;
           end;
  end;
writeln('Ответ: ', c);
end.
    