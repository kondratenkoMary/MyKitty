Program vivid;
var
  F:text;
  a,i,n,sum:integer;
  s,s1:string;
begin
  writeln('¬ведите им€ файла.');
  readln(s);
  assign(F,s);
  rewrite(F);
  writeln('¬ведите длину последовательности');
  readln(n);
  for i:=1 to n do
     begin
      readln(a);
      write(F,a);
      if (a>=0) and (i=1)
        then s1:=s1+a;
      if (a<=0) and (i=1)
        then s1:=s1+a;
      if (a>=0) and (i<>1)
        then s1:=s1+'+'+a;
      if (a<=0) and (i<>1)
        then s1:=s1+a;
      sum:=sum+a;
     end;
  write(s1,'=',sum);
end.
