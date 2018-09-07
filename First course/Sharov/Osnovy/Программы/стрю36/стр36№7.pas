Program qq;
var count,b,e,x:integer;
begin
  count:=0;
  write('Введите число b: ');
  readln(b);
  write('Введите заданную величину e: ');
  readln(e);
  writeln('Введите первое число последовательности.');
  readln(x);
  while x<>0 do
    begin
      if (abs(b-x)<=e) and (b<>x)
        then count:=count+1;
      readln(x);
    end;
  if count>0
    then writeln('Количество: ',count)
    else writeln('Таковых нет');
end.