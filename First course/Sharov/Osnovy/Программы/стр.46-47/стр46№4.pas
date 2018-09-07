Program kalendar;
type
 History=(WorldWar1,Revolution, WorldWar2,Rebuildig);
 year=1900..2000;
 month=1..12;
 day=1..31;
 var
 k:integer;
 y:year;
 m:month;
 d:day;
 begin
   writeln('Событие: ');
   readln(k);
   case History(k-1) of
     WorldWar1:writeln('17.09.1914-Rev');
     Revolution:writeln('20.15.2009-nn');
   end;
 end.