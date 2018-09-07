Program sdvigna2;
const
  N=8;
  k=2;
var
  a:array[1..N] of integer;
  t,j,i:integer;
begin
  for i:=1 to N do
    begin
      a[i]:=random(21)+(-10);
      write(a[i],' ');
    end;
 writeln;
 for j:= 1 to k do
  begin
   t:= a[n];
   for i:= n downto 2 do
    a[i]:= a[i-1];
   a[1]:= t;
  end; 
for i:=1 to n do
  write(a[i],' ');
end.