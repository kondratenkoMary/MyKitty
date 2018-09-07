Program slovapoalfhavitu;
const
n=10;
var
s,t,first,second:string;
i,j,k,c:integer;
m:array[1..n] of string;
begin
  c:=1;
  j:=1;
  writeln('¬ведите строку');
  read(s);
  for i:=1 to (pos('.',s)-1) do
    begin
      if s[i]<>' '
        then m[j]:=m[j]+s[i]
      else begin
            j:=j+1;
            c:=c+1;
          end;
    end;
 for i:=1 to c do
   for j:=1 to c do
     begin
       first:=m[i];
       second:= m[j];
       k:=1;
       while (k<length(first)) and (k<length(second)) and (first[k]=second[k])do
         k:=k+1;
      if Ord(first[k])< Ord(second[k])
        then begin
               t:=m[i];
               m[i]:=m[j];
               m[j]:=t;
             end;
      end;
for i:=1 to n do
  write(m[i],' ');
 end.