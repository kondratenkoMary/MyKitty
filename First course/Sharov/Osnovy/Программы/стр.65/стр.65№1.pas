Program decinpolar;
type
  polar=record
    re,im:real;
  end;
var
  r,f:polar; 
  x,y:integer;
begin
  writeln('Введите координаты точки в декартовой системе координат');
  readln(x,y);
  r.im:=sqrt(sqr(x)+sqr(y));
  f.re:=arctan(y/x);
  writeln('Полярный радиус r=',r.im);
  writeln('Полярный угол f=',f.re);
end.