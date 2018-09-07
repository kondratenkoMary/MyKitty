Program olichie_ot_poslednego_chisla;
const 
  N=10;
var  
  Mas:array[1..N] of integer;
  count,i:integer;
begin
  for i:=1 to N do
      begin
        Mas[i]:=random(20)+1;
        write(Mas[i],' ');
      end;
  count:=0;
  writeln;
  for i:=1 to (N-1) do
    begin
      if Mas[i]<>Mas[N]
        then count:=count+1;
    end;
  writeln('Количество чисел, отличающихся от последнего числа: ',count);
end.