Program yati;
var
  str:string;
  k,i:integer;
begin
   k:=0;
   writeln('¬ведите строку');
   read(str);
   for i:=1 to length(str) do
     begin
       k:= pos('€',str);
       if k<>0
       then begin
              delete(str,Pos('€',str),1);
              insert('ты',str,k)
            end;
     end;
  writeln(str);
end.  