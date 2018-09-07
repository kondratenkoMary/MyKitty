Program qq;
var b,x,sum:real;
begin
  write('¬ведите число b: ');
  readln(b);
  sum:=0;
  writeln('¬ведите первое число последовательности');
  readln(x);
  while x<>0 do
    begin
      if x>b 
        then sum:=sum+1;
    readln(x);
    end;
  writeln('—умма чисел: ',sum,'.');
end.
  