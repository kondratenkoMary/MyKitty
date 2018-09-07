Program kolichestvootr;
const
  n=4;
  m=3;
type
 TA=array[1..n,1..m] of integer;
 TC=array[1..n] of integer;
var
  a:TA;
  c:TC;
  i,j,count:integer;
begin
  for i:=1 to n do
    for j:=1 to m do
      read(a[i,j]);
  writeln;
  for j:=1 to m do
    begin
      count:=0;
      for i:=1 to n do
        if a[i,j]<0
          then begin
                 count:=count+1;
                 c[j]:=count;
               end;
     end;
  for i:=1 to m do
    write(c[i],' ');
end.
      