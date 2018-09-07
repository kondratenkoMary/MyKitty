Program qq;
var min,max,x:integer;
begin
  writeln('Введите первое число последоательности ');
  readln(x);
  max:=x;
  min:=x;
  while x<>0 do
    begin
      if x>max
        then max:=x;
      if x<min 
        then min:=x;
      read(x);
    end;
  writeln('Максимум: ',max,'. ','Минимум: ',min,'.');
end.