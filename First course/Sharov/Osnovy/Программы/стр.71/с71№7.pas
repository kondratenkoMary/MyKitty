var
 f:file of integer;
 a,max,min:integer;
 s:string;
begin
  max:=0;
  min:=100;
  write('Введите имя файла ');
  readln(s);
  assign(f,s);
  reset(f);
  while not eof(f) do 
    begin
      read(f,a);
    if a>max then
      max:=a;
    if a<min then
      min:=a;
    end;  
  writeln('Максимум ',max,' Минимум ',min);
  writeln('Старая последовательность ');
  reset(f);
  while not eof(f) do 
    begin
      read(f,a);
      write(a,' ');
    end;
  writeln;
  writeln('Новая последовательность ');
  reset(f);
  while not eof(f) do 
    begin
      read(f,a);
      if a=max 
      then begin
             a:=min;
             write(a,' ');
           end
      else if a=min 
        then begin
               a:=max;
               write(a,' ');
             end
        else write(a,' ');
   
   end;
end.