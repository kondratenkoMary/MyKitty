Program skalyar;
const 
  N=5;
var
  mas1:array[1..N] of integer;
  mas2:array[1..N] of integer;
  prz,i:integer;
begin
  prz:=0;
  for i:=1 to N do
    begin
      read(mas1[i]);
      read(mas2[i]);
      prz:=prz+(mas1[i]*mas2[i]);
    end;
  writeln('—кал€рное произведение двух векторов: ', prz);
end.
  
  