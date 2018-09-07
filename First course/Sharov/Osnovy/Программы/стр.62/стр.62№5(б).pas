Program boleeodnogo;
var
  s:string;
  c:string;
  count,i,j:integer;
begin
  writeln('¬ведите строку');
  read(s);
  count:=1;
  c:='';
  for i:=1 to length(s) do
    begin
      for j:=1 to length(s) do
          if (i<>j) and (s[i]=s[j])
            then count:=count+1;
      if count>1
        then if pos(s[i],c)=0
               then c:=c+s[i];
      count:=1;
    end;
write(c);
end.