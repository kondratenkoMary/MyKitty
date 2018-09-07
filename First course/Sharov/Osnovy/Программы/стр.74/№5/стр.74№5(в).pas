Program visniz;
type
  stud=record
    lastname:string[12];
    pol:string[2];
    year,hig,sr:integer;
  end;
var
  f:text;
  a:stud;
  b:integer;
begin
  writeln('Задайте средний балл');
  readln(b);
  assign(f,'anketa.txt');
  reset(f);
  while not eof(f) do
    begin 
      read(f,a.lastname);
      read(f,a.pol);
      read(f,a.year);
      read(f,a.hig);
      readln(f, a.sr);
      if a.sr>b
        then write(a.lastname,' ',a.year);
      writeln;
    end;
  close(f);
end.