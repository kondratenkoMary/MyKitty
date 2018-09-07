Program stepen;
var
  N, Res, St: integer; 
function Pow(A, St: integer): integer;
var
  i: Integer;
begin
  Result:= 1;
  if St = 0 then
    Result := 1
  else
    for i:= 1 to St do
      Result := Result * A;
end;

begin
  Write('¬ведите N = ');
  ReadLn(N);
  Write('¬ведите степень St = ');
  ReadLn(St);
  Res := Pow(N, St);
  Write('–езультат = ', Res);
end.