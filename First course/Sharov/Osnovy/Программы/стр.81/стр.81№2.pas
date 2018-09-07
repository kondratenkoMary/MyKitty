Program polindrom;
Function pol(s:string):boolean;
  var
    i,j,count:integer;
  begin
    pol:=false;
    j:=length(s);
    for i:=1 to length(s) do
      begin
        if s[i]=s[j]
          then count:=count+1;
        j:=j-1;
      end;
    if count=length(s)
      then pol:=true;
  end;
var
  str:string;
begin
  writeln('¬ведите строку');
  readln(str);
  write('явл€етс€ ли строка полиндромом? ');
  write('ќтвет: ',pol(str),'.');
end.
    
    
        
         