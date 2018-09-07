Program otr_polozh;
 const N=10;
var  
  Mas:array[1..N] of integer;
  count,i:integer;
begin
  for i:=1 to N do
          read(Mas[i]);
 writeln;
 for i:=1 to N do
     if Mas[i] < 0
       then write(Mas[i],' ');
 writeln;
 for i:=1 to N do
   if Mas[i] > 0 
     then write(Mas[i],' ');
end.
      
