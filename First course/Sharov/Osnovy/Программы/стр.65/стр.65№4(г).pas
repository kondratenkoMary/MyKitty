Program bagazz;
const
  n=5;
type
  bagazh=record
    lastname:string;
    mesto,veshi:integer;
  end;
var
  a:array[1..n] of bagazh;
  i,count,sum:integer;
begin
  count:=0;
  sum:=0;
  for i:=1 to n do
    begin
      write('Введите фамилию: ');
      readln(a[i].lastname);
      write('Введите кол-во мест в Вашем багаже: ');
      readln(a[i].mesto);
      write('Введите кол-во вещей в Вашем багаже: ');
      readln(a[i].veshi);
      sum:=sum+a[i].mesto;
    end;
  for i:=1 to n do
    if a[i].veshi>(sum/n)
      then count:=count+1;
  writeln('Количество пассажиров,у которых кол-во вещей превосходит среднее кол-во мест: ',count,'.');
end.
 