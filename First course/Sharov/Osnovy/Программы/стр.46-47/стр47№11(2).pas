program abc;
var
  initDirection: string;
  initDirectionNum: integer;
  nextDirection:string;
  nextDirectionNum:integer;
begin
  writeln('Enter initial direction');
  readln(initDirection);
  case (initDirection) of 
    'south': initDirectionNum := 180;
    'west': initDirectionNum := 270; 
    'north': initDirectionNum := 0; 
    'east': initDirectionNum := 90; 
  end;
  writeln('Enter where I will go next :)');
  readln(nextDirection);
  case (nextDirection) of 
    'left': nextDirectionNum := initDirectionNum + 270; 
    'right': nextDirectionNum := initDirectionNum + 90; 
    'back': nextDirectionNum := initDirectionNum + 180; 
    'forward': nextDirectionNum := initDirectionNum; 
  end;
  while (nextDirectionNum >= 360) do
    nextDirectionNum := nextDirectionNum - 360;
  
  case (nextDirectionNum) of
    0: writeln('Ok, I will go to North next'); 
    90: writeln('Ok, I will go to East next'); 
    180: writeln('Ok, I will go to South next'); 
    270: writeln('Ok, I will go to West next'); 
  end;
end.  