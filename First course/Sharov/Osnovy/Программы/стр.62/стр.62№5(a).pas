Program odnabukv;
var
  s:string;
  c:char;
  count,i,j:integer;
begin
  writeln('¬ведите строку');
  read(s);
  count:=1;
  for i:=1 to length(s) do
    begin
      c:=s[i];
      for j:=1 to length(s) do
          if (i<>j) and (s[i]=s[j])
            then count:=count+1;
      if count=1
        then writeln(s[i]);
      count:=1;
    end;
end.
  
  