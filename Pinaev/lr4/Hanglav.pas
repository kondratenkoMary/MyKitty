program qq;
var kolichn,i,kn,n,k:integer;
    m:array [1..100] of char;
    d:real;
  
procedure Hon(n:integer; a,b,c:char);
var i:integer;
begin
  if n>0
  then begin
         Hon(n-1,a,c,b);
         k:=k+1;
         m[n]:=b;
         if kn=k
         then for i:=1 to kolichn do
                write(m[i]);
         Hon(n-1,c,b,a);
       end;
end;
begin
  write('Введите количество дисков: ');
  readln(kolichn);
  write('Введите шаг: ');
  readln(kn);
  for i:=1 to kolichn do
  m[i]:='A';
  k:=0;
  Hon(kolichn,'A','B','C');
end.