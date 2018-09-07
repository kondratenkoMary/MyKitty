program abc;
type M=array [1..64] of char;
var a,b,c:char; n,k,i,count:longint;
mas:M;
procedure H(n:integer; a,b,c:char;var mas:M;k:longint);
 begin
  if n=0
  then exit
  else begin
         H(n-1,a,c,b,mas,k);       
         if k=count
           then exit;
         count:=count+1;
         mas[n]:=b;           
         {writeln(n,'|',a,'-->',b);n-номер диска,a-->b откуда берут диск и куда кладут}
         H(n-1,c,b,a,mas,k);
       end; 
 end;
begin
write('введите количество дисков: ');
readln(n);
write('Введите позицию: ');
readln(k);
 for i:=1 to n do
   mas[i]:='A';
H(n,'A','B','C',mas,k);
 for i:=1 to n do
    write(mas[i],' ');
end.