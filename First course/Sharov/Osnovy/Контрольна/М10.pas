Program M10;
const
  n=7;
var
  a:array[1..n]of integer;
  sr:real;
  sum,i:integer;
begin
  writeln('Заполните массив');
  for i:=1 to n do
    begin
     read(a[i]);
     sr:=sr+a[i];
    end;
    sr:=sr/n;
    for i:=1 to n do
      begin
        if a[i]>sr
        then sum:=sum+a[i];
    end;
  writeln('Сумма всех чисел, больше среднего: ', sum);
  end.
      