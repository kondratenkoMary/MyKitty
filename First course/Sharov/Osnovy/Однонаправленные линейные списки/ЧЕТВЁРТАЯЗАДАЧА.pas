Program deletchetnznach;
type
  ref=^node;
  node=record
    next:ref;
    data:integer;
  end;
var
  list:ref;
  
  
Procedure InputList(var list:ref);
  var
    q:ref;
    a,i,n:integer;
  begin
    new(list);
    q:=list;
    write('Количество элементов списка: ');
    read(n);
    writeln('.');
    for i:=1 to n do
      begin
        new(q^.next);
        q:=q^.next;
        writeln('Введите ',i,' элемент.');
        readln(a);
        q^.data:=a;
      end;
   q^.next:=nil;
 end;
Procedure PrintList(caption:string;list:ref);

  begin
    write(caption,': ');
    while list^.next<>nil do
      begin
        list:=list^.next;
        write(list^.data,' ');
      end;
  end;
Procedure del(var p:ref);
var
  q:ref;
begin
      if p^.next<> nil
        then begin
               q:=p^.next;
               p^.next:=q^.next;
               dispose(q);
             end;
end; 
Procedure delchet(list:ref);
begin 
    while list^.next <> nil do
      begin
        list:=list^.next;
        if (list^.data mod 2)  = 0
          then del (list);
     end;
end;
begin
  InputList(list);
  PrintList('Исходный список',list);
  Delchet(list);
  PrintList('Полученный список',list);
end.
                 