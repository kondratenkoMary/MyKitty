Program yz;
const 
  N=5;
var
  a:array[1..N] of integer;
  f,i,y,z:integer;
begin
f:=1;
y:=0;
z:=0;
  for i:=1 to N do
    begin
      a[i]:=random(21)+(-10);
      write(a[i],' ');
    end;
  writeln;
  for i:=1 to N do
    begin
      y:=y+f*a[i];
      z:=z+a[i]*a[N-i+1];
      f:=f*(-1);
    end;
 writeln('y = ',y);
 writeln('z = ',z);
end.
 
   