Program rgr;
const
  n=3;
var
  a:array[1..n] of integer;
  i,j,flag:integer;
  s:string;
begin
  s:='';
  writeln('Введите элемены массива.');
  for i:=1 to n do
      read(a[i]);
  writeln;
  for i:=1 to n do  
    begin
      flag:=0;
      for j:=1 to n do
          if (a[i]=a[j]) and (i<>j)
            then flag:=1;
     if flag=0
       then s:=s+a[i]+' ';
   end;
   if s=''
     then write('Нет чисел,которые входят в последовательность по одному разу.')
     else write(s);
end.