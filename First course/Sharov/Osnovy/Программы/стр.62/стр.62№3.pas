Program percentinstring;
type
  alph=set of char;
  number=set of char;
var
  gla,sog:alph;
  s:string;
  i,p:integer;
begin
  writeln('¬ведите строку');
  read(s);
  gla:=['A','a','E','e','I','i','O','o','U','u','Y','y'];
  sog:=['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Z'];
  for I:=length(s) downto 1 do
    begin
      if s[i] in gla
        then Delete(s,Pos(s[i],s),1);
      if s[i] in sog 
        then begin
               p:=Ord(s[i])+32;
               s[i]:=Chr(p);
             end;
    end;
  writeln(s);
end.
               
      