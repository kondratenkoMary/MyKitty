Program friend7;
const
n=3;
type
  spisok=record
    lastname:string;
    byear,year:integer;
  end;
var
  s:array[1..n] of spisok;
  i:integer;
begin
  for i:=1 to n do
    begin
      write('¬ведите фамилию: ');
      readln(s[i].lastname);
      write('¬ведите год рождени€: ');
      readln(s[i].byear);
      s[i].year:=2017-s[i].byear;
    end;
  for i:=1 to n do
    writeln(s[i]);
end.