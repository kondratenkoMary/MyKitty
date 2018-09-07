program obratnispisok;

type
  ref = ^node;
  node = record
    next: ref;
    data: integer;
  end;

var
  L1, L2,cur: ref;


procedure InputList(var list: ref);
var
  q: ref;
  i, a, n: integer;
begin
  new(list);
  q := list;
  write('Количество элементов списка: ');
  readln(n);
  for i := 1 to n do
  begin
    new(q^.next);
    q := q^.next;
    writeln('Введите ', i, ' элемент.');
    readln(a);
    q^.data := a;
  end;
  q^.next := nil;
end;

procedure PrintList(caption: string; list: ref);
begin
  write(caption, ': ');
  while list^.next <> nil do
  begin
    list := list^.next;
    write(list^.data, ' ');
  end;
end;
Procedure InitList(var L2:ref);
  begin
    new(L2);
    L2^.next:=nil;
  end;
  
Procedure revers(L1:ref; var p:ref);
var
  f,q,s:ref;
begin
  q:=L1;
  q:=q^.next;
  new(f);
  f^.data:=q^.data;
  p^.next:=f;
  while q^.next <> nil do
    begin
      q:=q^.next;
      new(f);
      f^.data:=q^.data;
      s:=p^.next;
      p^.next:=f;
      f^.next:=s;
    end;
 end;

begin
  InputList(L1);
  PrintList('Исходный список',L1);
  InitList(L2);
  cur:=L2;
  revers(L1,cur);
  PrintList('Полученный список',L2);
end.
  