Program Polindrom;
var
  s:string;
Procedure polik(s1:string);
  var
    i:integer;
    str:string;
  begin
    s1:='';
    for i:=length(s) downto 1 do 
      begin
        str:=copy(s,i,1);
        s1:=s1+str;
      end;
    if s1 = s
      then writeln('true')
      else writeln('false');
  end;
begin
  writeln('¬ведите строку');
  readln(s);
  polik(s);
end.