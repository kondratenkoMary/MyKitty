Program sredneearifmeticheskoye;
  const
    n=3;
  type
    Amas=array[1..n, 1..10] of integer;
  var
    i,j:integer;
    a:Amas;
  function f( var am:Amas):real;
    var 
      max,sr:real;
      sum,k,p:integer;
    begin
      for k:=1 to n do
        begin
          sum:=0;
          for p:=1 to 10 do
            sum:=sum+am[k,p];
          sr:=sum/10;
          if sr>max
            then max:=sr;
        end;
      f:=max;
    end;
  begin
    writeln('Вводите группы чисел');
    for i:=1 to n do
      begin
        writeln(' Вводите ',i,' группу чисел');
        for j:=1 to 10 do
            read(a[i,j]);
      end;
     writeln('Максимальное среднее арифместическое группы ', f(a));
 end.
    