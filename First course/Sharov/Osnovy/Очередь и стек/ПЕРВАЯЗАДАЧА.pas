Program polozhiotr;
type
 ref=^node
 node=record
   next:ref;
   data:integer;
 end;
 FIFO=record
   in,out:ref;
 end;
 
 
Procedure InitOrd( var queue:FIFO);
  begin
    new(queue.in);
    queue.in^.next:=nil;
    queue.out:=queue.in;
  end;

Function ChekOrd(var queue:FIFO):boolean;
  begin
    ChekOrd:=queue.in<>queue.out;
  end;

Procedure PutOrd(var queue:FIFO; last:integer);
var
  q:ref;
begin
  new(q);
  q^.data:=last;
  q^.next:=nil;
  queue.in^.next:=q;
  queue.in:=q;
end;

Procedure OurOrd(var queue:FIFO; var first:integer);
var
  q:ref;
begin
  q:=queue.out^.next;
  first:=q^.data;
  queue.out^.next:=q^.next;
  Dispose(q);
  if queue.out^.next = nil
    then queue.in:=queue.out;
end;


var
  qPos,qNeg:FIFO;
  i,n,x:integer;
begin
  