Program qq;
type
  alphabet= set of char;
var
  a:alphabet;
  s:string;
  i,count:integer;
begin
  a:=['а','е','ё','и','о','у','ы','э','ю','я','А','Е','Ё','И','О','У','Ы','Э','Ю','Я'];
  count:=0;
  writeln('Введите строку');
  read(s);
  for i:=1 to length(s) do
      if s[i] in a
        then count:=count+1;
  writeln('В заданной последовательности ',count,' гласных букв.');
end.