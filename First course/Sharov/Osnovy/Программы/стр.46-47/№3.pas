Program denned;
type
DayOfWeek=(Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday);
var
k,n,i:integer;
a:DayOfWeek;
begin
readln(k);
a:=DayOfWeek(k-1);
writeln('Enter N: ');
readln(N);
for i:=1 to N do
  if a<Saturday 
    then a:=Succ(a)
    else a:=DayOfWeek(0);
writeln(a);
end.