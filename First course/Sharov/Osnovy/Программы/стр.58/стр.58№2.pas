Program eglishinstring;
const
  dict='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
var
  s,s2:string;
  i:integer;
begin
  writeln('Введите строку');
  read(s);
  for i:=1 to length(s) do
    begin
      if Pos((s[i]), dict)<>0
        then s2:=s2+ord(s[i])
      else s2:=s2+s[i];
    end;
 writeln('Полученная строка: ', s2);
end.