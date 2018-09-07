Program otrandpol;
var
  f,w,e:text;
  s:string;
  a:integer;
begin
  writeln('Введите имя файла.');
  readln(s);
  assign(f,s);
  assign(w,'pl.txt');
  assign(e,'ms.txt');
  rewrite(w);
  rewrite(e);
  reset(f);
  while not eof(f) do
    begin
      read(f,a);
      if a>=0
        then write(w,a:3);
      if a<0
        then write(e,a:3);
   end;
   close(w);
   close(e);
   writeln('Положительные');
   reset(w);
   while not eof(w) do
     begin
       read(w,a);
       write(a,' ');
     end;
   close(w);
   writeln;
   writeln('Отрицательные');
   reset(e);
    while not eof(e) do
     begin
       read(e,a);
       write(a,' ');
     end;
   close(e);
   close(f);
end.
               