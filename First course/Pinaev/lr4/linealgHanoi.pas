program qq;
var  s,k1,k,maxn,kv,i,n:longint;
     m:array [1..64] of char;
     d:real;
     
procedure Hk(n,k1:longint; x,y,z:char);
var i:integer;
begin
  s:=s div 2;
  if k1>=s
   then begin
          m[n]:=y;
          if n-1<>0 then 
           Hk(n-1,k1-s,z,y,x);
        end
   else begin
          m[n]:=x;
          if n-1<>0 then 
           Hk(n-1,k1,x,z,y);
        end;
end;


procedure H(n:longint; a,b,c:char);
var i:longint;
begin
  if n>0 then
  begin
    H(n-1,a,c,b);
    m[n]:=b;
    inc(k);{
    write(k,': ');
    for i:=1 to maxn do
    write(m[i]);
    writeln;}
    if k=kv then 
     for i:=1 to maxn do write(m[i]);
    H(n-1,c,b,a);
  end;
end;
begin
  readln(maxn,kv);
  for i:=1 to maxn do
   m[i]:='A';
  s:=1;
  for i:=1 to maxn do
   s:=s*2;
  Hk(maxn,kv,'A','B','C');
  k:=0;
  for i:=1 to maxn do
  begin
    write(m[i]);
    m[i]:='A';
  end;  
  writeln;  
  H(maxn,'A','B','C'); 
end.  