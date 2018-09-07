Program nevlob;
var
a,s:real;
n,count:integer;
begin
  write('Введите число: ');
  read(a);
  write('Введите степень числа: ');
  read(n);
  s:=1;
  count:=0;
  while (n<>0) do
    begin
      if (odd(n) = true)
        then begin
               s:=s*a;
               count:=count+1;
             end;
     if (n shr 1 <>0)
       then begin
              a:=a*a;
              count:=count+1;
            end;
    n:=n shr 1;
  end;
writeln('Ответ: ',s);
write('Кол-во умножений: ',count);
end.
            