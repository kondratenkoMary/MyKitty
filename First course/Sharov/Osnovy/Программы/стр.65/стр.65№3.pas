Program competition;
const
n=2;
type
  anketa=record
    lastname,name,fathername:string;
    BirthYear,resul:integer;
  end;
var
  dudes:array[1..n] of anketa;
  temp:anketa;
  i,max:integer;
begin
  max:=0;
  For i:=1 to n do
    begin
      writeln('Заполните анкету');
      write('Введите фамилию: ');
      readln(dudes[i].lastname);
      write('Введите Имя: ');
      readln(dudes[i].name);
      write('Введите Отчество: ');
      readln(dudes[i].fathername);
      write('Введите свой год рождения: ');
      readln(dudes[i].BirthYear);
      write('Введите результат в метрах: ');
      readln(dudes[i].resul);
      writeln('Спасибо за внимание!');
    end;
  for i:=1 to n do
    if dudes[i].resul>max
      then begin
             max:=dudes[i].resul;
             temp:=dudes[i];
           end;
 writeln('Победитель: ',temp);
 end.