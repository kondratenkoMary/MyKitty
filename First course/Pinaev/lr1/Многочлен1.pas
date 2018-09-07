Program Gorner;
type
  mas=array[0..100] of integer;
var
  a:mas;
  i,x,n,p,s:integer;
begin
  writeln('Введите максимальную степень многочлена.');
  readln(n);
  writeln('Введите значение аргумента.');
  readln(x);
  writeln('Задайте ',n+1,' коэффициентов.');
  for i:=0 to n do
    read(a[i]);
  p:=1;
  s:=0;
  for i:= 0 to n do
    begin 
      s:=s*x+a[i];
    end;
  write('Ответ: ',s,'.');
  end.
    