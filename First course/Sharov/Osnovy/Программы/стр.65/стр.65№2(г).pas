Program rost;
const
n=3;
type
  anketa=record
    lastname,gender:string;
    math,physics,inform,chem,economy:integer;
    sredn:real;
  end;
var
  dudes:array[1..n] of anketa;
  i,count,sum:integer;
begin
  sum:=0;
  count:=0;
  for i:=1 to n do
    begin
      writeln('Заполните анкету');
      write('Введите фамилию: ');
      readln(dudes[i].lastname);
      writeln('Введите свой пол: ');
      readln(dudes[i].gender);
      write('Введите оценки по математике, физике, информатике, химии и экономике: ');
      readln(dudes[i].math,dudes[i].physics,dudes[i].inform,dudes[i].chem,dudes[i].economy);
      if dudes[i].gender='женский'
        then begin
               count:=count+1;
               sum:=sum+dudes[i].math+dudes[i].physics+dudes[i].inform+dudes[i].chem+dudes[i].economy;
               dudes[i].sredn:=(dudes[i].math+dudes[i].physics+dudes[i].inform+dudes[i].chem+dudes[i].economy)/5;
             end;     
      writeln('Спасибо за внимание!');
    end;
    for i:=1 to n do
      if (dudes[i].sredn>(sum/(count*5))) and (dudes[i].gender='женский')
        then writeln('Студентка, у которой средний балл выше чем средний балл у всех студенток: ', dudes[i].lastname);
  writeln('Средний балл всех студенток: ', sum/(count*5));
 end.
    
