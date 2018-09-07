Program ship;
var
k1,k2:string;
begin
  write('Задайте курс при помощи команд из K1: ');
  readln(k1);
  writeln('Еду на ',k1);
  writeln('Следующая команда');
  readln(k2);
  case k2 of
   'вперёд':begin
              if k1='север'
                then writeln('Еду на север');
              if k1='восток'
                then writeln('Еду на восток');
              if k1='юг'
                then writeln('Еду на юг');
              if k1='запад'
                then writeln('Еду на запад');
            end;
   'вправо':begin 
           if k1='север'
             then writeln('Еду на восток');
           if k1='восток'
             then writeln('Еду на юг');
           if k1='юг'
             then writeln('Еду на запад');
           if k1='запад'
             then writeln('Еду на noth');
         end;
   'назад': begin
           if k1='север'
             then writeln('Еду на юг');
           if k1='восток'
             then writeln('Еду на запад');
           if k1='юг'
             then writeln('Еду на север');
           if k1='запад'
             then writeln('Еду на восток');
         end;
   'влево': begin
            if k1='север'
              then writeln('Еду на запад');
            if k1='восток'
              then writeln('Еду на север');
            if k1='юг'
              then writeln('Еду на восток');
            if k1='запад'
              then writeln('Еду на юг');
          end;
 end;
end.