Program symmavektorstolb;
const
n=2;
type
  TA=array[1..n,1..n] of integer;
  TB=array[1..n,1..n] of integer;
  TC=array[1..n,1..n] of integer;
var
  a:TA;
  b:TB;
  c:TC;
  prz,i,j,k:integer;
  begin
      writeln('Введите квадратную матрицу a');
      for i:=1 to n do
        for j:=1 to n do
          read(a[i,j]);
      writeln('Введите квадратную матрицу a');
      for i:=1 to n do
        for j:=1 to n do
          read(b[i,j]);
      for i:=1 to n do
          for j:=1 to n do
            begin
              c[i,j]:=0;
              for k:=1 to n do
                c[i,j]:= c[i,j]+a[i,k]*b[k,j];
            end;
      writeln('Произведение матриц: ');
    for i:=1 to n do
      begin 
        for j:=1 to n do
          write(c[i,j],' ');
        writeln;
      end;
 end.