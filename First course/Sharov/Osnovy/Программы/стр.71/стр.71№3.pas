Program seredina;
var
  consist: file of integer;
  count,a:integer;
  c:string;
begin
  count:=0;
  writeln('ֲגוהטעו טלÿ פאיכא');
  readln(c);
  assign(consist,c);
  reset(consist);
  while not eof(consist) do
    begin
      read(consist,a);
      count:=count+1;
    end; 
  if count mod 2 <>0
    then begin
           seek(consist,count div 2);
           read(consist,a);
           write(a);
         end
    else begin
           seek(consist,((count div 2)-1));
           read(consist,a);
           write(a,' ');
           read(consist,a);
           write(a);
         end;
   close(consist);
  end.