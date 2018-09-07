Program tip1;
var
  consist: file of integer;
  n,i,a,sum:integer;
  c:string;
begin
  sum:=0;
  writeln('Âגוהטעו טלÿ פאיכא');
  readln(c);
  assign(consist,c);
  reset(consist);
     while not eof(consist) do 
       begin
         read(consist,a);
         sum:=sum+a;
       end;
 close(consist);
 writeln('Ñףללא: ',sum);
 end.