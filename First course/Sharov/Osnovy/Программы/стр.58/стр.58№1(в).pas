Program znakiprepinaniya;
const
  dictionary='.,!?;:-';
var
  str:string;
  count,i:integer;
begin
  count:=0;
  writeln('Введите строку');
  read(str);
  for i:=1 to length(str) do
      if Pos(str[i], dictionary)<>0
        then count:=count+1;
  writeln('Ответ: ', count);
end.