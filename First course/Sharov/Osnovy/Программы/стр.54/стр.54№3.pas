Program pechatmatrix;
const
  n=5;
type
  matrix=array[1..n,1..n] of integer;
var
  m:matrix;
  i,j:integer;
  begin
    for i:=1 to n do
      for j:=1 to n do
        read(m[i,j]);
    for i:=1 to n do
      begin
        for j:= 1 to n do
          write(m[i,j],' ');
        writeln;
      end;
end.
       
