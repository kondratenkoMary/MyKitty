Program vivid;
var
  F:text;
  a,i,n:integer;
  s:string;
begin
  writeln('¬ведите им€ файла.');
  readln(s);
  assign(F,s);
  rewrite(F);
  writeln('¬ведите длину последовательности');
  readln(n);
  for i:=1 to n do
     begin
      readln(a);
      write(F,a:3);
     end;
  close(F);
  reset(F);
     while not eof(F) do
       begin
         read(F,a);
         write(a:3);
       end;
  close(F);
end.