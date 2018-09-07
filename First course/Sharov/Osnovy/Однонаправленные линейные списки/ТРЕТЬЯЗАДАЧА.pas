Program dobavlenievkonec;
type
  ref=^node;
  node=record
    next:ref;
    data:integer;
  end;
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
Procedure vkon(l1,l2:ref);
  begin
    while l1^.next<>nil do
      l1:=l1^.next;
    l1^.next:=l2^.next;
  end;
Procedure PrintList(caption:string;l1:ref);

  begin
    write(caption,': ');
    while l1^.next<>nil do
      begin
        l1:=l1^.next;
        write(l1^.data,' ');
      end;
  end;
var
  l1,l2:ref;
begin
  InputList(l1);
  InputList(l2);
  vkon(l1,l2);
  PrintList('Получилось ',l1);
end.
  
        
      
         
        
    