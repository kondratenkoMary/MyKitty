Program decinpol;
const
n=2;
type
  anketa=record
    lastname,gender:string;
    BirthYear,course,growth:integer;
    math,physics,inform,chem,economy:integer;
  end;
var
  dude:anketa;
  i:integer;
begin
  For i:=1 to n do
    begin
      writeln('Заполните анкету');
      write('Введите фамилию: ');
      readln(dude.lastname);
      write('Введите свой пол: ');
      readln(dude.gender);
      write('Введите свой год рождения: ');
      readln(dude.BirthYear);
      write('Введите номер курса: ');
      readln(dude.course);
      write('Введите оценки по математике, физике, информатике, химии и экономике: ');
      read(dude.math,dude.physics,dude.inform,dude.chem,dude.economy);
      write('Введите свой рост: ');
      readln(dude.growth);
      writeln('Спасибо за внимание!');
    end;
 end.
    
    
    