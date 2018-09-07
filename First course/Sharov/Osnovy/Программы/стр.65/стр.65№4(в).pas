Program bagazz;
const
  n=5;
type
  bagazh=record
    lastname:string;
    mesto:integer;
  end;
var
  a:array[1..n] of bagazh;
  i,count:integer;
begin
  count:=0;
  for i:=1 to n do
    begin
      write('Введите фамилию: ');
      readln(a[i].lastname);
      write('Введите кол-во мест в Вашем багаже: ');
      readln(a[i].mesto);
      if a[i].mesto>2
        then count:=count+1;
    end;
  writeln('Количество пассажиров,в чьем багаже более двух мест: ',count,'.');
end.
 