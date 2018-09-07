Program calculator;
var
  a,b:real;
  ch:char;
begin
  writeln('¬ведите два числа');
  readln(a,b);
  writeln('¬ведите действие');
  readln(ch);
  case ch of
  '+': writeln(a,'+',b,'=',a+b);
  '-': writeln(a,'-',b,'=',a-b);
  '*': writeln(a,'*',b,'=',a*b);
  '/': writeln(a,'/',b,'=',a/b);
  end;
end.