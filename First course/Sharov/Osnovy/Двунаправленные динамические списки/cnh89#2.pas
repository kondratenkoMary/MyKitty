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
