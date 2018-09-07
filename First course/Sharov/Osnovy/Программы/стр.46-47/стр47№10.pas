Program simbol;
var
sym:char;
begin
  write('Введите символ: ');
  readln(sym);
  case ord(sym) of
    48..57:writeln('Цифра');
    65..90:writeln('Заглавная латинская буква');
    97..122:writeln('Строчная латинская буква');
    1040..1071:writeln('Заглавная русская буква');
    1072..1103:writeln('Строчная русская буква')
    else writeln('Разделитель');
 end;
end.