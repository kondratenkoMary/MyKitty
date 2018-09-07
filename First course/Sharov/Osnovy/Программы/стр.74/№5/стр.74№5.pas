program qq;
type
  stud=record
    lastname:string[12];
    pol:string[2];
    year,hig,sr:integer;
  end;
var
  f:text;
  a:stud;
  sum:real;
  c:integer;
begin
  assign(f,'anketa.txt');
  reset(f);
  while not eof(f) do
    begin 
      read(f,a.lastname);
      read(f,a.pol);
      read(f,a.year);
      read(f,a.hig);
      readln(f, a.sr);
      if (a.pol='м ') and (a.year<=1997)
        then begin
               c:=c+1;
               sum:=sum+a.hig;
             end;
   end;
 writeln('Средний рост: ', sum/c:7:2);
end.
   