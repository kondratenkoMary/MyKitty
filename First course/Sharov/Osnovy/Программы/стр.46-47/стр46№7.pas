Program vremyagoda;
type 
TMonth=(Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec);
TSeason=(Spr,Sum,Aut,Win);
var
month:integer;
begin
  write('Введите номер месяца: ');
  readln(month);
  case TMonth(month-1) of
    Mar..May: writeln('Весна');
    Jun..Aug:writeln('Лето');
    Sep..Nov:writeln('Осень');
    Dec,Jan,Feb:writeln('Зима')
  else writeln('Неверный номер месяца');
  end;
end.