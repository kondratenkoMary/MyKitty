Program dataiden;
var
day1,month1,year1,day2,month2,year2,c:integer;
begin
  c:=0;
  writeln('Введите первую дату');
  read(day1);
  write('.');
  read(month1);
  write('.');
  readln(year1);
  writeln('Введите вторую дату');
  read(day2);
  write('.');
  read(month2);
  write('.');
  readln(year2);
  if (year1<year2)
   then c:=1;
  if month1<month2
   then c:=1;
  if day1<day2
   then c:=1;
  if c=1
    then writeln('Первая дата предшествует второй')
    else writeln('Не предшествует');
end.
        
          
