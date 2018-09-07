Program dataiden;
var
day,month,year,n,count:integer;
begin
  writeln('¬ведите текущую дату');
  read(day);
  write('.');
  read(month);
  write('.');
  readln(year);
  write('¬ведите кол-во дней: ');
  readln(n);
  while n <> 0 do
    begin
      day:=day+1;
      n:=n-1;
      case month of
         1,3,5,7,8,10,12: count:=31;
         4,6,9,11: count:=30;
         2: count:=28;
      end;
      if day >=count
        then begin
               day:=1;
               month:=month+1;
             end;
      if month>12
        then begin
               year:=year+1;
               month:=1;
             end;
    end;
write(day,'.',month,'.',year);
end.
             