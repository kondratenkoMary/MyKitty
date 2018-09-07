Program A1A2;
type 
  ref=^node;
  node=record
    right,left:ref;
    data: real;
  end;
Procedure InputList( var list:ref);
var
  i,n,x:integer;
  q:ref;
begin
  new(list);
  list^.left:=nil;
  q:=list;
  write('Введите количество элементов: ');
  readln(n);
  for i:=1 to 2*n do
    begin
      write('Введите ',i,' элементов: ');
      readln(x);
      new(q^.right);
      q^.right^.left:=q;
      q:= q^.right;
      q^.data:=x;
    end;
  q^.right:=nil;
end;
Procedure PrintList(caption:string;list:ref);
  begin
    write(caption,': ');
    while list^.right<>nil do
      begin
        list:=list^.right;
        write(list^.data,' ');
      end;
    writeln;
  end;
Procedure summ(list:ref);
  var
    sum,u,v:real;
    q,h:ref;
    i,n:integer;
  begin
    sum:=0;
    for i:=1 to 2*n do
      begin
        new(q^.right);
        new(h^.left);
        q^.right^.left:=q;
        q:=q^.right;
        u:=q^.data;
        h^.right^.left:=h;
        h:=h^.left;
        v:=h^.data;
        sum:=sum+v*u;
      end;
    writeln('Получено: ',sum);
  end;
var 
  list:ref;
begin
  InputList(list);
  PrintList('Исходный список',list);
  summ(list);
end.
  