Program abiturienti;
const
  n=240;
  m=3;
type
  document=record
    name,lastname,fathername,homestreet,lang:string;
    sbal,numerpho:integer;
  end;
var
  temp:array[1..m] of document;
  c:array[1..m] of document;
  i,j:integer;
begin
  for i:=1 to m do 
    begin
      write('¬ведите ‘амилию: ');
      readln(c[i].lastname);
      write('¬ведите »м€: ');
      readln(c[i].name);
      write('¬ведите ќтчество: ');
      readln(c[i].fathername);
      write('¬ведите домашний адрес: ');
      readln(c[i].homestreet);
      write('¬ведите €зык,который изучаете: ');
      readln(c[i].lang);
      write('¬ведите номер телефона: ');
      readln(c[i].numerpho);
      write('¬ведите сумму баллов: ');
      readln(c[i].sbal);
      if c[i].sbal>=n
        then begin
               temp[i]:=c[i];
               j:=j+1;
             end;
   end;
 for i:=1 to j do
   writeln(temp[i]);
end.
      
    
      