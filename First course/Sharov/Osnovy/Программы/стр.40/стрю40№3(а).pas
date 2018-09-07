Program slova;
var
count:integer;
ch:char;
begin
  count:=1;
  readln(ch);
  while ch<>'.' do
    begin
      if ch=' '
        then count:=count+1;
      readln(ch);  
    end;
  writeln('Кол-во: ',count);
end.