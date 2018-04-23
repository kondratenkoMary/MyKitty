program qq;
var kolichn,i,kn,n,k:integer;
    m:array [1..1000] of char;
    vremya:real;
  
procedure Hon(n:integer; a,b,c:char);
var i:integer;
begin
  if n>0
  then begin
         Hon(n-1,a,c,b);
         k:=k+1;
         m[n]:=b;
         write(k,':  ');
         for i:=1 to kolichn do
           write(m[i]);
         writeln;
         if kn=k
         then for i:=1 to kolichn do
                write(m[i]);
         Hon(n-1,c,b,a);
       end;
end;
begin

  readln(kolichn);
  readln(kn);
  for i:=1 to kolichn do
  m[i]:='A';
  k:=0;
  vremya:=milliseconds;
  Hon(kolichn,'A','B','C');
  write((milliseconds-vremya)/1000);
end.