Program qq;
const N=7;
var
i,x,c,flag:integer;
begin
  flag:=0;
  c:=0;
  for i:=1 to N do
    begin
    readln(x);
    if (flag=0) and (x<0)
        then c:=c+1
        else flag:=1;
     end;
  if c=0
    then writeln( 'Последовательностеь не наичнается с отрицательных чисел')
    else writeln('Количество отр. чисел: ', c);
 end.
      