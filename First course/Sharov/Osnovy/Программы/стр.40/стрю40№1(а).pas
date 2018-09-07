Program qq;
var
count:integer;
ch,l:char;
begin
  count:=0;
  writeln('Введите заданную литеру: ');
  readln(l);
  writeln('Введите строку оканчивающуюся "."');
  read(ch);
  while ch<>'.' do
      begin
        if l=ch
          then count:=count+1;
        read(ch);
      end;
  if count<>0
    then writeln('Кол-во повторов: ',count)
    else writeln('Повторов нет');
end.
      