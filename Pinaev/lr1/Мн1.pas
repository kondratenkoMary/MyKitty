Program Gorner2;
type
  mas=array[0..100] of integer;
var
  a:mas;
  i,x,n,p,s,k:integer;
begin
  k:=0;
  writeln('Введите максимальную степень многочлена.');
  readln(n);
  writeln('Введите значение аргумента.');
  readln(x);
  writeln('Задайте ',n+1,' коэффициентов.');
  for i:=0 to n do
    read(a[i]);
  p:=1;
  s:=0;
  for i:= n downto 0 do
    begin
      s:= s+a[i]*p;
      inc(k);
      p:=p*x;
      inc(k);
    end;
  writeln('Ответ: ',s);
  write('Количество умножений ',k);
end.
      
