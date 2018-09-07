Program delprob;
var
mas:array[1..500] of char;
c,ch:char;
i,j:integer;
begin
    writeln('¬ведите символ, вхождение которого не должно быть: ');
    readln(ch);
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
       if mas[j]<>ch
         then write(mas[j]);
end.