Program kolichestvozadannih;
var
  zstr,str:string;
  count,i,k:integer;
begin
  count:=0;
  writeln('Введите заданную подстроку');
  readln(zstr);
  writeln('Введите строку');
  readln(str);
  k:=pos(zstr, str);
  while k<>0 do 
    begin
      count:=count+1;
      delete(str,k,length(zstr));
      k := pos(zstr,str);
    end;
  writeln('Количесвто вхождений: ',count);
end.
  