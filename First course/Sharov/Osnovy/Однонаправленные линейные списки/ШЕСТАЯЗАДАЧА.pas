program sliyaniespiskov;

type
  ref = ^node;
  node = record
    next: ref;
    data: integer;
  end;

var
  L1, L2, L: ref;


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

procedure slin(L1, L2: ref; var L: ref);
var
  q: ref;
begin
  new(L);
  L^.next := L1^.next;
  q := L;
  while q^.next <> nil do
    q := q^.next;
  q^.next := L2^.next;
end;

procedure sortirovka(var L: ref);
var
  q1, q2: ref;
  t: integer;
begin
  q1 := L^.next;
  while q1^.next <> nil do
  begin
    q2 := q1^.next;
    while q2^.next <> nil do
    begin
      if q1^.data > q2^.data
      then begin
        t := q1^.data;
        q1^.data := q2^.data;
        q2^.data := t;
      end;
      q2 := q2^.next;
    end;
    q1 := q1^.next;
  end;
end;



begin
  InputList(L1);
  InputList(L2);
  PrintList('Первый список', L1);
  PrintList('Второй список', L2);
  slin(L1, L2, L);
  sortirovka(L);
  PrintList('Полученный список', L);
end.


