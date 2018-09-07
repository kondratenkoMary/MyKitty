Program otrandpol;
var
  f,w,e:text;
  s:string;
  a:integer;
begin
  writeln('Введите имя файла.');
  readln(s);
  assign(f,s);
  reset(f);
  while not eof(f) do
    begin
      readln(f,a);
      if a>=0
        then begin
               assign(w,'pl.txt');
               rewrite(w);
               write(w,a);
             end;
      if a<0
        then begin
               assign(e,'ms.txt');
               rewrite(e);
               write(e,a:3);
             end;
   end;
   writeln('Положительные');
   assign(w,'pl.txt');
   reset(w);
   while not eof(w) do
     begin
       read(w,a);
       write(a);
     end;
   close(w);
   close(e);
   writeln;
   writeln('Отрицательные');
   assign(e,'ms.txt');
   reset(e);
    while not eof(e) do
     begin
       read(e,a);
       write(a);
     end;
   close(e);
end.
               