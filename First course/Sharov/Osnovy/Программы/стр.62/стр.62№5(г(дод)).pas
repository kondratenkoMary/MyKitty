Program boleeodnogo;
type
  alp=set of char;
var
  a:alp;
  s:string;
  c:string;
  i,j,k:integer;
begin
  writeln('¬ведите строку');
  read(s);
  a:=['a','e','i','o','u','y','b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z'];
  c:='';
  for i:=1 to length(s) do
    begin
      if s[i] in a 
        then c:=c+s[i];
    end;
 