Program kominatorika;
var
  n,m,k,i:integer;
  d:real;
Function pesoch(n1,m1,k1:integer):real;
 var
   i:integer;
  begin
    n1:=1;
    m1:=1;
    k1:=1;
    for i:=1 to n do
        n1:=n1*i;
    d:=n1;
    for i:=1 to m do
      m1:=m1*i;
    for i:=1 to k do
      k1:=k1*i;
    pesoch:=n1/(m1*k1);
  end;
begin
  writeln('Введите числа m и n');
  read(m,n);
  k:=n-m;
  writeln('Число сочетаний: ',pesoch(n,m,k));
  writeln('Число перестановок: ',d);
end.
    
  
      
      
      
        