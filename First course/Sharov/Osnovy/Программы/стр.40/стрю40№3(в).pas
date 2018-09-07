Program pervoeslovo;
var
flag:integer;
ch,l:char;
begin
  write('¬ведите заданную литеру: ');
  readln(l);
  writeln('¬ведите первый элемент предложени€');
  readln(ch);
  flag:=0;
  if (ch=l)
    then begin
           flag:=1;
           write(ch);
         end;
  while (ch<>'.') and (flag<>-1) do
    begin
      readln(ch);
      if ch=l
        then begin
               flag:=1;
               write(ch);
             end
        else if flag=1
               then write(ch);
     if (ch=' ')and (flag=1)
       then flag:=-1;
    end;
 end.
     
