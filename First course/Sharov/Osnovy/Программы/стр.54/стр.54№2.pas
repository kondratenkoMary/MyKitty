Program symmavektorstolb;
const
n=3;
type
  matrix=array[1..n,1..n] of integer;
  vektor=array[1..n] of integer;
  proiz=array[1..n] of integer;
var
  m:matrix;
  v:vektor;
  p:proiz;
  prz,i,j:integer;
  begin
    writeln('Введите вектор-столбец');
    for i:=1 to n do
        read(v[i]);
      writeln('Введите квадратную матрицу');
      for i:=1 to n do
        for j:=1 to n do
          read(m[i,j]);
      for i:=1 to n do
        begin
          for j:=1 to n do
              prz:= prz+m[i,j]*v[j];
          p[i]:=prz;
          prz:=0;
        end;
     
      writeln('Произведение матрицы на вектор-столбец: ');
    for i:=1 to n do
    write(p[i],' ');
 end.