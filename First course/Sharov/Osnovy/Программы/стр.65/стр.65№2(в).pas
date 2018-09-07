Program rost;
const
n=3;
type
  anketa=record
    lastname,gender:string;
    BirthYear,course,growth:integer;
    math,physics,inform,chem,economy:integer;
  end;
var
  dude:anketa;
  i,count,sum,max,min:integer;
  nameX,nameN:string;
  
begin
  For i:=1 to n do
    begin
      writeln('Заполните анкету');
      write('Введите фамилию: ');
      readln(dude.lastname);
      write('Введите свой пол: ');
      readln(dude.gender);
     { write('Введите свой год рождения: ');
      readln(dude.BirthYear);
      write('Введите номер курса: ');
      readln(dude.course);
      write('Введите оценки по математике, физике, информатике, химии и экономике: ');
      read(dude.math,dude.physics,dude.inform,dude.chem,dude.economy);}
      write('Введите свой рост: ');
      readln(dude.growth);
      if dude.gender='мужской'
        then begin
               count:=count+1;
               sum:=sum+dude.growth;
               if dude.growth>max
                 then begin
                        nameX:= dude.lastname;
                        max:=dude.growth;
                      end;
               if min=0
                 then min:=dude.growth
                 else if dude.growth<min
                        then begin
                               nameN:=dude.lastname;
                               min:=dude.growth;
                             end;   
             end;
      writeln('Спасибо за внимание!');
    end;
  writeln('Средний рост студентов мужского пола: ', sum/count);
  writeln('Самый высокий студент: ',nameX,'. ','Его рост: ',max,'.');
  write('Самый низкий студент: ',nameN,'. ','Его рост: ',min,'.');
 end.
    
    
    