Program vlob;
var
i,a,count:integer;
n,p:real;
begin
  write('Введите число: ');
  readln(n);
  write('Введите степень числа: ');
  readln(a);
  p:=1;
  for i:=1 to a do
  begin
    p:=p*n;
    count:=count+1;
  end;
  writeln('Результат:',p,'. ','Количество умножений: ',count);
end.
  
      