Program Japan;
var
col,y:integer;
begin
write('Введите год: ');
readln(y);
col:= ((abs(y-1988+1)) mod 5);
case col of
  0:write('Зелёный - ');
  1:write('Красный - ');
  2:write('Жёлтый - ');
  3:write('Белый - ');
  4:write('Чёрный - ');
end;
case ((y-1984) mod 12) of
  0:write('крыса');
  1:write('корова');
  2:write('тигр');
  3:write('заяц');
  4:write('дракон');
  5:write('змея');
  6:write('лошадь');
  7:write('овца');
  8:write('обезьяна');
  9:write('курица');
  10:write('собака');
  11:write('свинья');
end;
end.  