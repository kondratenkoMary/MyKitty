Program mas81;
const
  n=7;
type
  mas=array[1..n] of integer;
var
  a:mas;
  i:integer;
function otv(var Mmas:mas):string;
var
  j,c1,c2:integer;
begin
  c1:=1;
  c2:=1;
  for j:=1 to (n-1) do
    begin
      if Mmas[j+1]>Mmas[j]
        then c1:=c1+1;
      if Mmas[j+1]<Mmas[j]
        then c2:=c2+1;
      if c1=n
        then otv:='упорядочен по возрастанию';
      if c2=n
        then otv:='упорядочен по убыванию'; 
      if (c1<>n) and (c2<>n)
        then otv:='неупорядочен';
    end;
end;
begin
  writeln('Введите элементы массива');
  for i:=1 to n do
    begin
      read(a[i]);
      write(' ');
    end;
  writeln('Заданный целочисленный массив ',otv(a),'.');
end.