unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, Grids;

type
  TForm1 = class(TForm)
    Button1: TButton;
    StringGrid1: TStringGrid;
    Edit1: TEdit;
    Label1: TLabel;
    procedure Button1Click(Sender: TObject);
    procedure QueryKey (Key: hKey);
    procedure StringGrid1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
var
 hTestKey:HKEY;
begin
     if(RegOpenKeyEx (HKEY_LOCAL_MACHINE,('SYSTEM\CurrentControlSet\Services'),
     0, KEY_READ, hTestKey)=ERROR_SUCCESS)
     then QueryKey(hTestKey);
     RegCloseKey(hTestKey); //смари, делаем опен твоего пукана, залетаем по пути
     //обрабатывваем твой пукан и залетаем
end;

procedure TForm1.QueryKey(Key: hKey);
var
  achKey: array [0..255] of CHAR;
  cbName: DWORD;
  achCLass: array [0..MAX_PATH] of CHAR;
  cchClassName: DWORD;
  cSubKeys, cbMaxSubKey, cchMaxClass, cValues, cchMaxValue,
  cbMaxValueData, cbSecurityDescriptor: DWORD;
  ftLastWriteTime: FILETIME;
  i, retCode: integer;
  achValue: array [0..16383] of CHAR;
  cchValue: DWORD;

begin
  StringGrid1.Cells[1,0]:='Name';
  StringGrid1.Cells[0,0]:='index';
  cchValue:=16383;
  cchClassName:=MAX_PATH;
  retCode:= RegQueryInfoKey(Key, achClass, @cchClassName, NIL, @cSubKeys,
  @cbMaxSubKey, @cchMaxClass, @cValues, @cchMaxValue, @cbMaxValueData,
  @cbSecurityDescriptor, @ftLastWriteTime);
  if (cSubKeys>0)
    then
    begin
    StringGrid1.RowCount:=cSubKeys+1;
      for i:=0 to cSubKeys-1 do
        begin
          cbName:=255;
          retCode:= RegEnumKeyEx(Key, i, achKey, cbName,
          NIL, NIL, NIL, @ftLastWriteTime);
          if (retCode=ERROR_SUCCESS)
            then
              begin
                StringGrid1.Cells[0,i+1]:=(INTTOSTR(i));
                StringGrid1.Cells[1, i+1]:=(achKey);
              end;

        end;
     end;
  
end;

procedure TForm1.StringGrid1Click(Sender: TObject);
var
   nameService:string;
   tType: DWORD;
   valueOfDescription: array [0..1023] of CHAR;
   lengthBuffer: DWORD;
   pathOfService: string;
   hTestKey:HKEY;
   newDescription: string;
   k: pChar;

begin
  nameService:=StringGrid1.Cells[1,StringGrid1.Row];
  pathOfService:= 'SYSTEM\\CurrentControlSet\\Services\\'+nameService;
    if(RegOpenKeyEx (HKEY_LOCAL_MACHINE,PAnsiChar(pathOfService),
     0, KEY_READ or KEY_WRITE, hTestKey)=ERROR_SUCCESS)
     then
      begin
          lengthBuffer:=1024;
          if (RegQueryValueEx (hTestKey,'Description',NIL, NIL, @valueOfDescription, @lengthBuffer)=ERROR_SUCCESS )
            then
              begin
                Showmessage(valueOfDescription);
                tType:=REG_SZ;
                newDescription:=Edit1.Text;
                k:=strALLOC(length(newDescription)+1);
                strPCopy(k,newDescription);
                // RegSetValueExA(  hTestKey,'Description',0, tType,PAnsiChar(newDescription), length(newDescription) );
                RegSetValueEx(hTestKey,'Description',0, REG_SZ,k,length(newDescription)+1);
              end
            else RegQueryValueEx (hTestKey,'Description',NIL, NIL, @valueOfDescription, @lengthBuffer);

      end;
     RegCloseKey(hTestKey);
end;
end.
