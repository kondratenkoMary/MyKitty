Program zapisatpolozhitelnie;
type
  ref=^node;
  node=record
    next:ref;
    data:integer;
  end;
Procedure Inputlist(var list:ref);
  var
    q:ref;
    x:integer;
  begin
    writeln('Введите последовательность');
    read(x);
    new(list);
    q:=list;
    if x <> 0 
      then while x<>0 do
             begin
               new(q^.next);
               q:=q^.next;
               q^.data:=x;
               read(x);
             end
      else begin
             new(list);
             q:=list;
             q^.next:=nil;
           end;
   q^.next:=nil;
 end;
Procedure PrintList(caption:string; list:ref);
  begin
    write(caption,': ');
    if list^.next = nil
      then writeln('Список пуст')
    else while list^.next<>nil do
      begin
        list:=list^.next;
        write(list^.data,' ');
      end;
  end;     
var
  h,l2,list:ref;
begin
  Inputlist(list);
  PrintList('Исходный список',list);
  new(l2);
  h:=l2;
  while list^.next <> nil do
    begin
      list:=list^.next;
      if list^.data>0
        then begin
               new(h^.next);
               h:=h^.next;
               h^.data:=list^.data;
             end;
   end;
 h^.next:=nil;
 writeln;
 PrintList('Полученный',l2);
end.
     
     
     