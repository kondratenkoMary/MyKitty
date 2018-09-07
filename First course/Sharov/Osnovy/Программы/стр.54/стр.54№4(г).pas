Program transponirovat;
const
  n=4;
type
  TB=array[1..n,1..n] of integer;
var
  b:TB;
  i,j:integer;
  begin
    for i:=1 to n do
      for j:=1 to n do
        read(b[i,j]);
    writeln;
    for i:=1 to n do
      begin
        for j:=1 to n do
          write(b[j,i],' ');
        writeln;
      end;
end.