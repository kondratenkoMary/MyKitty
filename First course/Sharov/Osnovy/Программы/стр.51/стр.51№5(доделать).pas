Program transportirovka;
const
  N=8;
var
  a:array[1..N] of integer;
  c,i:integer;
begin
  for i:=1 to N do
    begin
      a[i]:=random(21)+(-10);
      write(a[i],' ');
    end;
  writeln;
  for i:=1 to (N div 2) do
    begin
      c:=a[i];
      a[i]:= a[N-i+1];
      a[N-i+1]:=c;
    end;
  write('Полученный перевернутый массив: ');
  for i:=1 to N do
    write(a[i],' ');
end.
    
 