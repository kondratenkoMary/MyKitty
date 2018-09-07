Program pravilnoechislo;
const
  chisl='0123456789';
var
  s:string;
  i,flag:integer;
begin
  flag:=0;
  writeln('¬ведите число');
  read(s);
  for i:=2 to length(s) do
    if ((Pos(s[1],chisl)<>0) and (s[1]<>'0')) and (Pos(s[i],chisl)<>0)
      then flag:=1;
  if flag=1
    then writeln('true')
  else writeln('False');
end.