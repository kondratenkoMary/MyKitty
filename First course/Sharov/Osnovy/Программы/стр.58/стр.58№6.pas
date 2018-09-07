Program yati;
var
  s, res:string;
  i:integer;
begin
   writeln('¬ведите строку');
   read(s);
   for i:=1 to length(s) do
     begin
       if s[i] = '.'
       then res := res + '...'
       else res := res + s[i];
     end;
  writeln(res);
end.  