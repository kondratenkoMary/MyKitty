Program sredneearifmvdvaspiska;
type
  ref=^node;
  node=record
    next:ref;
    data:integer;
  end;
var
    s,k:integer;
    L1,L2,list:ref;
    
Procedure InputList(var list:ref);
var
  q:ref;
  i,x,n:integer;
begin
  s:=0;
  new(list);
  q:=list;
  write('Введите количество элементов последовательности: ');
  readln(n);
  k:=n;
  for i:=1 to n do
    begin
      new(q^.next);
      q:=q^.next;
      write('Введите ',i,' элемент.');
      readln(x);
      q^.data:=x;
      s:=s+q^.data;
    end;
  q^.next:=nil;
end;
Procedure SredneeArifm(list:ref; var L1:ref; var L2:ref);
var
  a:real;
  h,f:ref;
begin
  a:=s/k;
  new(L1);
  new(L2);
  f:=L2;
  h:=L1;
  while list^.next <> nil do
    begin
      list:=list^.next;
      if list^.data >= a
        then begin
               new(h^.next);
               h:=h^.next;
               h^.data:=list^.data;
             end;
      if list^.data < a
        then begin
               new(f^.next);
               f:=f^.next;
               f^.data:=list^.data;
             end;
    end;
 f^.next:=nil;
 h^.next:=nil;
 
 end;
 Procedure PrintList(caption:string; list:ref);
   begin
     write(caption,': ');
    if list^.next = nil
      then writeln('Список пуст!')
      else while list^.next<>nil do
             begin
               list:=list^.next;
               write(list^.data,' ');
             end;
   end;
    
  begin
    InputList(list);
    PrintList('Исходный список',list);
    SredneeArifm(list,L1,L2);
    PrintList('Список элементов >= среднего арифметического',L1);
    PrintList('Список элементов < среднего арифметического',L2);
  end.     
  
  
  