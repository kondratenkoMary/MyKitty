Program Gorner;
type
  mas=array[0..100] of integer;
var
  a:mas;
  i,x,n,p,s,k:integer;
begin
  writeln('Введите максимальную степень многочлена.');
  readln(n);
  writeln('Введите значение аргумента.');
  readln(x);
  writeln('Задайте ',n+1,' коэффициентов.');
  for i:=0 to n do
    read(a[i]);
  p:=1;
  s:=a[0];
  for i:=1 to n do
    begin 
      s:=s*x+a[i];
      inc(k);
    end;
  write('Ответ: ',s,'. Кол-во умножений: ',k);
  end.
    