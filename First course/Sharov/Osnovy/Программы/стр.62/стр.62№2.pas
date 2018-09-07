Program percentinstring;
type
  alph=set of char;
  number=set of char;
var
  gla,sog:alph;
  n:number;
  s:string;
  proc:real;
  i,Gcount,Scount,count:integer;
begin
  Gcount:=0;
  Scount:=0;
  count:=0;
  writeln('Введите строку');
  read(s);
  gla:=['A','a','E','e','I','i','O','o','U','u','Y','y'];
  sog:=['B','b','C','c','D','d','F','f','G','g','H','h','J','j','K','k','L','l','M','m','N','n','P','p','Q','q','R','r','S','s','T','t','V','v','W','w','X','x','Z','z'];
  n:=['0'..'9'];
  for i:=1 to length(s) do
    begin
      if s[i] in gla
        then  Gcount:=Gcount+1;
      if s[i] in sog
        then Scount:=Scount+1;
      if s[i] in n
        then count:=count+1;
    end;
  writeln('Процент гласных букв от общего числа символов в строке: ', (100*Gcount)/length(s));
  writeln('Процент согласных букв от общего числа символов в строке: ', (100*Scount)/length(s));
  writeln('Процент цифр от общего числа символов в строке: ', (100*count)/length(s));
 end.
  
  