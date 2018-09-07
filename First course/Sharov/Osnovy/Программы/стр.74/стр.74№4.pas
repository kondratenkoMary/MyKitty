Program tipintext;
var
  f:file of integer;
  w:text;
  s,s2:string;
  n,a,i:integer;
begin
  writeln('Введите имя типизированного файла');
  readln(s);
  writeln('Введиет имя текстового файла');
  readln(s2);
  assign(w,s2);
  writeln('Введите длину последвоателньости');
  readln(n);
  assign(f,s);
  rewrite(f);
  for i:=1 to n do
    begin
      read(a);
      write(f, a);
    end;
  close(f);
  rewrite(w);
  reset(f);
  while not eof(f) do
    begin
      read(f,a);
      write(w,a:3);
    end;
 close(f);
 close(w);
 reset(w);
 while not eof(w) do
   begin
     read(w,a);
     write(a,' ');
   end;
end.