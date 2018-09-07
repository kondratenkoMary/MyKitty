Program FL;
var
n,c,k,i:integer;
ch:char;
begin
  k:=0;
  c:=0;
  write('Введите длину последовательности: ');
  readln(n);
  for i:=1 to n do
    begin
      readln(ch);
      if ch='ф'
        then c:=c+1
        else if (ch='л') and (c<>0) 
                 then c:=c+1
                 else c:=0;
      if c=2
        then k:=1;
   end;
if k<>0
  then writeln('Входит')
  else writeln('Не входит');
end.