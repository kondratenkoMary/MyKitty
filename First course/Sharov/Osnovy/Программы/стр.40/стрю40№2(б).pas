Program IL;
var
c,k,i,n:integer;
ch:char;
begin
  write('Введите длину последовательности: ');
  readln(n);
  c:=0;
  k:=0;
  for i:=1 to n do
    begin
      readln(ch);
      if ch='и'
        then c:=c+1
        else if ch='л'
              then c:=c+1
              else c:=0;
      if c=2 
        then begin
               k:=k+1;
               c:=0;
             end;
    end;
 if k<>0
   then writeln('Кол-во повторов: ',k)
   else writeln('Нет повторов');
end.