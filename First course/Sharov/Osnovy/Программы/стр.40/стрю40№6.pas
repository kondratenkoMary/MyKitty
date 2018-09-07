Program skoba;
var
c,k,n,i:integer;
ch:char;
begin
  write('Введите длину последовательности: ');
  readln(n);
  for i:=1 to n do
    begin
      readln(ch);
      if ch='('
        then c:=c+1;
      if ch=')'
        then k:=k+1;
    end;
 if c=k
   then writeln('Совпадает')
   else writeln('Нет');
end.
  