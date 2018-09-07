Program delprob;
var
mas:array[1..500] of char;
c:char;
i,j:integer;
begin
    i:=1;
    readln(c);
    while(c<>'.') do
      begin
        mas[i]:=c;
        readln(c);
        i:=i+1;
      end;
   mas[i]:=c;
   for j:=1 to i do
       if mas[j]<>' '
         then write(mas[j]);
end.