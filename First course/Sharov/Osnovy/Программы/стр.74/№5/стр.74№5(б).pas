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
  max,min:integer;
  s,s1,s2,s3:string;
begin
  max:=0;
  min:=1000;
  assign(f,'anketa.txt');
  reset(f);
  while not eof(f) do
    begin 
      read(f,a.lastname);
      read(f,a.pol);
      read(f,a.year);
      read(f,a.hig);
      readln(f, a.sr);
      if a.hig > max
        then begin
               max:= a.hig;
               s:=a.lastname;
               s1:=a.pol;
             end;
      if a.hig < min
        then begin
               min:= a.hig;
               s2:=a.lastname;
               s3:=a.pol;
             end;
     end;
  close(f);
  writeln('Самый высокий студент: ',s,' ',s1,'.');
  write('Самый низкий студент: ', s2,' ',s3,'.');
end.
      