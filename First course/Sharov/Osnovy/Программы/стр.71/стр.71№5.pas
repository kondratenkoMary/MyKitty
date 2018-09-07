Program kolvoend;
var
  consist: file of integer;
  a,k,x,i,sum:integer;
  c,s:string;
begin
  sum:=0;
  writeln('¬ведите им€ файла');
  readln(c);
  writeln('¬ведите новое им€ файла');
  readln(s);
  assign(consist,c);
  rename(consist,s);
  assign(consist,s);
  reset(consist);
  x:=filesize(consist);
  writeln('¬ведите k-ый элемент, с которого считывать последовательность');
  readln(k);
  for i:=k to x do
    begin
      read(consist,a);
      write(a,' ');
      sum:=sum+a;
    end;
  writeln('—умма: ',sum);
  close(consist);
end.
  