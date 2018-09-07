Program sredniiball;
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
  sr:real;
begin
  For i:=1 to n do
    begin
      writeln('Заполните анкету');
      write('Введите фамилию: ');
      readln(dude.lastname);
      write('Введите свой пол(мужской/женский): ');
      readln(dude.gender);
      write('Введите свой год рождения: ');
      readln(dude.BirthYear);
      write('Введите номер курса: ');
      readln(dude.course);
      write('Введите оценки по математике, физике, информатике, химии и экономике: ');
      read(dude.math,dude.physics,dude.inform,dude.chem,dude.economy);
      write('Введите свой рост: ');
      readln(dude.growth);
      if ((2015-dude.BirthYear)=20) and (dude.gender='мужской')
        then begin
               write(dude.lastname,'. ');
               sr:=(dude.math+dude.physics+dude.inform+dude.chem+dude.economy)/5;
               writeln('Средний балл: ',sr,'.');
             end;
      writeln('Спасибо за внимание!');
    end;
 end.
    
    
    