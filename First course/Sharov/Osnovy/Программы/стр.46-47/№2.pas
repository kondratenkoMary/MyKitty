Program denned;
type
TNed=(Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday);
var
i: byte;
begin
readln(i);
case i of
  1: writeln('Monday');
  2: writeln('Tuesday');
  3: writeln('Wednesday');
  4: writeln('Thursday');
  5: writeln('Friday');
  6: writeln('Saturday');
  7: writeln('Sunday')
else writeln('Нет столько дней в неделе')
end;
end.