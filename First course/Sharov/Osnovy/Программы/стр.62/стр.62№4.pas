Program ptavilnaya;
type
  alp=set of char;
var
  setint:alp;
  s:string;
  i:integer;
begin
  writeln('¬ведите строку');
  read(s);
  setint:=[];
  for i:=length(s) downto 1 do
    begin
      if s[i] in setint
        then Delete(s,Pos(s[i],s),1)
      else setint:=setint+[s[i]];
    end;
  writeln(s);
end.