Program skalyarnoeproizvedenie;
const
  n=3;
type
  TA=array[1..n,1..n] of integer;
var
  a:TA;
  i,j,proiz,Maxstr,Minstolb,max,min:integer;
begin
  for i:=1 to n do
    for j:=1 to n do
      read(a[i,j]);
  max:=a[1,1];
  min:=a[1,1];
  Maxstr:=1;
  Minstolb:=1;
  for i:=1 to n do
      for j:=1 to n do
        begin
          if a[i,j]>max
            then begin
                   max:=a[i,j];
                   Maxstr:=i;
                 end;
          if a[i,j]<min
            then begin
                   min:=a[i,j];
                   Minstolb:=j;
                 end;
        end;
    for j:=1 to n do
      proiz:=proiz+a[Maxstr,j]*a[j,Minstolb];
  writeln('Ответ: ', proiz);
end.
                 
  