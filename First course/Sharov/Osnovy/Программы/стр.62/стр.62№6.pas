Program cifriandoperation;
type
  operation=set of char;
  number=set of char;
var
  op:operation;
  n:number;
  i,count,count2:integer;
  s:string;
begin
  count:=0;
  count2:=0;
  writeln('Введите последовательность символов');
  read(s);
  n:=['1','2','3','4','5','6','7','8','9','0'];
  op:=['+','-','*','/'];
  for i:=1 to length(s) do
    begin
      if s[i] in n
        then count:=count+1;
      if s[i] in op
        then count2:=count2+1;
    end;
  writeln('Количество цифр в последовательности: ',count);
  write('Количество арифметических операий в последовательности: ', count2);
end.