Program celoe;
var
flag:integer;
ch:char;
begin
  write('Введите первый элемент последовательности: ');
  readln(ch);
  flag:=1;
  while ch <> '*' do
    begin
      if (ch=' ') or (ch=',') or (ch='.')
        then flag:=0;
      readln(ch);
    end;
if flag=1
  then writeln('Правильная')
  else writeln('NO');
end.