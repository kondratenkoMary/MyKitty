Program qq;
type
  mas=array['a'..'z'] of integer;
var
  m:mas;
  i:char;
begin
  for i:='a' to 'z' do
    begin
      m[i]:=random (21)+(-10);
      write(m[i],' ');
    end;
  writeln;
  for i:='z' downto 'a' do
    write(m[i],' ');
end.
 