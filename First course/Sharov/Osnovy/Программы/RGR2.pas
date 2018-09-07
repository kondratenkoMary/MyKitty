Program rgr;
var
  set1,set2: set of integer;
  i,n,a:integer;
begin
  set1:= [];
  set2:=[];
  writeln('¬ведите длину последовательности');
  readln(n);
  writeln('ƒанна€ последовательность: ');
  for i:= 1 to n do
    begin
      read(a);
      if not(a in set1)
        then begin
               set1:=set1+[a];
               if not (a in set2)
                 then set2:=set2+[a];
             end
        else  if a in set2
                  then set2:=set2-[a];
              end;
 if set2<>[]
   then writeln('„исла,которые встретились в последовательности один раз: ',set2)
   else writeln('Ќет чисел, которые вход€т в последовательность по одному разу.');
end.