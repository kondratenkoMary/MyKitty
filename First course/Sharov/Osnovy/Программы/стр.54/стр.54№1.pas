Program summadiag;
const
N=3;
type
matr=array[1..n,1..n] of integer;
var
m: matr;
sum,i,j:integer;
begin
  sum:=0;
  for i:=1 to n do
    for j:=1 to n do
      read(m[i,j]);
  for i:=1 to n do
    for j:=1 to n do
      begin
        if i=j
          then sum:=sum+m[i,j];
        if j=i
          then sum:=sum+m[j,i];
      end;
 writeln('Полученная сумма: ', sum);
end.