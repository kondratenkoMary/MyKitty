program HelloWorld;
type
 Rec = record 
         letter: char;
         count: integer;
       end;
 A = array[1..500] of Rec;
var
  m: A;
  i,k, countInMassive: integer;
  c: char;
  flag: boolean;
begin
  i:=1;
  countInMassive:=1;
  flag := false;
  readln(c);
  while (c<>'.') do
    begin
       for k:=1 to countInMassive do
           if (m[k].letter = c)
           then  begin
                   m[k].count:= m[k].count + 1;
                   flag:= true;
                 end;
       if (flag = false) 
       then
          begin
           m[countInMassive].letter := c;
           countInMassive := countInMassive + 1;
          end;
       flag := false;
       i:= i+1;
       readln(c);
    end;
  for i:=1 to countInMassive do
     writeln('Буква:', m[i].letter, ' Количество: ', m[i].count);
end.
       
