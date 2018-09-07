Program qq;
var
a,x,max,n,i,c,b:integer;
begin
write('¬ведите длину последовательности: ');
read(n);
write('¬ведите первый элемент последовательности: ');
read(x);
a:=x;
c:=1;
max:=1;
for i:=2 to n do
  begin
    read(x);
    if x>a
      then c:=c+1
      else if c>max
             then begin
                   max:=c;
                   c:=1;
                  end;
    a:=x;
    if i=n
      then if c> max
             then max:=c;
 end;
if max<>0
  then writeln('ответ: ', max)
  else writeln('NO');
end.
  