Program probeli;
const
 n=10;
type
  sa=array[1..n] of char;
var
  a:sa;
  i:integer;
begin
  for i:=1 to n do
    begin
      read(a[i]);
      write(a[i],' ');
    end;
  for i:=1 to n do
    begin
      if a[i]=' '
        then a[i]:='0';
    end;
 for i:=1 to N do
   if a[i]<>'false'
     then write(a[i]);
end.
        