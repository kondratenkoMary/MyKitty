Program alpphabet;
const
alf='јаЅб¬в√гƒл≈е®Є∆ж«з»и…й кЋлћмЌнќоѕп–р—с“т”у‘ф’х÷ц„чЎшўщЏъџы№ьЁэёюя€';
var
s:string;
i,k:integer;
begin
  writeln('¬ведите строку');
  read(s);
  k:=0;
  for i:=1 to 66 do
    if pos(alf[i],s)>0 
      then begin
             k:=1;
             write(alf[i]);
           end;
 if k=0
   then writeln('–усских букв нет');
 end.