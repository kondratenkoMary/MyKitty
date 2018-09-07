Program pnom;
const M: array[1..12] of byte = (31,28,31,30,31,30,31,31,30,31,30,31);
var
    day,month,year,dat,i:integer; 
begin
    write('День:  '); 
    readln(day);
    write('Месяц: '); 
    readln(month);
    write('Год:   '); 
    readln(year);
    dat:= 0;
    for i:=1 to month-1 do
        dat:= dat + M[i];
    dat:= dat + day;
    if month > 2 then
        if year mod 4 = 0 then
            if (year mod 100 = 0) and (year mod 400 <> 0) 
              then dat:=dat
              else dat:= dat + 1;
    writeln('Номер дня с начала года: ',dat);        
end.