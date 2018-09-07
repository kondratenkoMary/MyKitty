Program rubls;
var
a:integer;
begin
  writeln(' оличество рублей до 30: ');
  readln(a);
  case a of
    1,21:writeln(a,' рубль');
    2,3,4,22,23,24: writeln(a,' рубл€');
    5..20,25..30: writeln(a,' рублей');
 end;
end.
 