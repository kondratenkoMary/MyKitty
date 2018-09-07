Program qq;
var
flag,x,i,p,otr,b:integer;
begin
  write('¬ведите число b: ');
  readln(b);
  flag:=0;
  Otr:=1;
  i:=1;
  writeln('¬ведите первое число последовательсности: ');
  readln(x);
  while x<>0 do
    begin
      if (x*otr<0) and (x>b) and(flag=0)
        then
          begin
            p:=i;
            flag:=1;
          end;
      i:=i+1;
      readln(x);
    end;
  If flag=1
    then writeln('ќтвет: ', p)
    else writeln('ответ: 0.');
end.
      