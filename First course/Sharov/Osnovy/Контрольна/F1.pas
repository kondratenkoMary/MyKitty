Program F1;
type
  set1= set of integer;
  set2=set of integer;
  seasons=record
    name:string[100];
    year,month,number:integer;
  end;
var
  s1:set1;
  s2:set2;
  f,sum,win:text;
  a:seasons;
begin
  s1:=[12,1,2];
  s2:=[6,7,8];
  assign(f,'fl.txt');
  assign(sum,'sum.txt');
  assign(win,'win.txt');
  rewrite(sum);
  rewrite(win);
  reset(f);
  while not eof(f) do
    begin 
     readln(f,a.name);
     read(f,a.year);
     read(f,a.month);
     readln(f,a.number);
     if a.month in s2
       then begin
              writeln(sum, a.name);
              write(sum,a.year,' ');
              write(sum,a.month,' ');
              write(sum,a.number,' ');
              writeln;
            end;
     if a.month in s1
       then begin
              write(win, a.name,' ');
              write(win,a.year,' ');
              write(win, a.month,' ');
              writeln(win, a.number,' ');
            end;
    end;
 close(sum);
 close(win);
 close(f);
end.
           
  

