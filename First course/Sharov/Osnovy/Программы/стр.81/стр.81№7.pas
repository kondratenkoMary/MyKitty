program Programm1;
Type  
    fileI=file of integer;
    mass=array[1..9] of integer;
    matrix = array[1..2,1..2] of integer;
    soll = array[1..2,1..1] of integer;
var
   i,comm,first,second,m,n:integer;
   s:string;
   matr,solll:matrix;
   sol:soll;
   s2:mass;
   
   Function fact(n:integer):integer;
   begin
   if n>0
   then fact:=n*fact(n-1)
   else fact:=1;
   n:=n-1;
   end;
   function poli(s:string):boolean;
   var i,j:integer;
   begin
   j:=0;
   for i:=1 to (length(s) div 2) do
   begin
      if s[i]=s[length(s)-i+1]
      then j:=j+1;
   end;
   if j= length(s) div 2
   then poli:=true
   else poli:=false;
   end;
   function poryadok(mass1:mass):string;
   Var i,f,n:integer;
     
   begin
   n:=0;
   f:=0;
      for i:=1 to 9 do
      if mass1[i]<mass1[i+1]
      then n:=1
      else f:=1;
      if (n=1) and (f=0)
      then poryadok:='�������';
      if (f=1) and (n=0)
      then poryadok:='����������';
      if (n=1) and (f=1)
      then poryadok:='� ��������';
   end;
   function determin(a:matrix):integer;
   begin
   determin:=(a[1,1]*a[2,2])-(a[1,2]*a[2,1]);
   end;
   function stepen(b,a:real):real;
   var save,i:real;
   begin
   stepen:=exp(a*ln(b));
   end;
   Procedure Three(Var a,b,c:integer);
   var d:integer;
   begin
   if a>c
   then begin
        d:=c;
        c:=a;
        a:=d;
        end;
   if a>b
   then begin
        d:=b;
        b:=a;
        a:=d;
        end;     
    end;
  begin
  for i:=1 to 9 do
  s2[i]:=-i;
  i:=1;
  while i<9 do
  begin
  Three(s2[i],s2[i+1],s2[i+2]);
  I:=i+3;
  end;
  for i:=1 to 9 do
  writeln(s2[i]);
end.