unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls;

type
  TForm1 = class(TForm)
    Image1: TImage;
    Button1: TButton;
    Edit1: TEdit;
    Label1: TLabel;
    Image2: TImage;
    Button2: TButton;
    procedure Button1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Button2Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
    function cluster_anal(x1,x2,y1,y2:real):real;
  end;

var
  Form1: TForm1;
  dot_coord: array [1..50,1..4] of integer;
  dot_distance: array[1..50] of real;
  dot_color: array [0..6] of integer;
  dot_chosen: array [1..10] of integer;

implementation

{$R *.dfm}

function TForm1.cluster_anal(x1,x2,y1,y2:real):real;
begin
  cluster_anal:=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
end;


procedure TForm1.Button1Click(Sender: TObject);
var
  i,j,p,dot_number,bruh:integer;
  rnd,xaxis,yaxis:integer;
  min_dist,minimal,distanceI,distanceJ:real;
  minI,minJ,numclust,countclust:integer;
  countsame:array [1..50] of integer;
  minimalI,minimalJ:integer;
begin
  dot_number:=strtoint(edit1.text);//ћ≈“ќƒ ЅЋ»∆ј…Ў≈√ќ —ќ—≈ƒј

  Image1.Canvas.Rectangle(0,0,370,370);//раскраска белым цветом

  for p:=1 to 50 do
  begin
    xaxis:=Random(123);//поле 123 на 123 точки
    yaxis:=Random(123);
    dot_coord[p][1]:=p;//номер точки
    dot_coord[p][2]:=xaxis;//коорд х
    dot_coord[p][3]:=yaxis;//коорд џыџыџыџ
    dot_coord[p][4]:=p;//цвет (номер кластера)
  end;

  numclust:= 50;

  while numclust>dot_number do//пока кол-во кластеров больше нужного
  begin
  min_dist:=500;
  minimal:=500;

  for i:=1 to 50-1 do
  begin
    for j:=i+1 to 50 do
      begin
        if dot_coord[i][4]<>dot_coord[j][4]// если это не 1 кластер
        then begin
               distanceI:=cluster_anal(dot_coord[i][2],dot_coord[j][2],dot_coord[i][3],dot_coord[j][3]);//находим рассто€ние между точками
               if (distanceI<min_dist)//минимально ли это рассто€ние?
               then begin
                      min_dist:=distanceI;
                      minI:=i;
                      minJ:=j;
                    end;
             end
        else continue;
      end;
    if (minimal>min_dist)//проверка на самое минимальное рассто€ние между всеми точками
    then begin
      minimal:=min_dist;
      minimalI:=minI;
      minimalJ:=minJ;
    end;
  end;

  for i:=1 to 50 do//объединение кластеров
  begin
    if dot_coord[i][4]=dot_coord[minimalj][4]
    then dot_coord[i][4]:=dot_coord[minimalI][4];
  end;

  for i:=1 to 50 do//нахождение количества кластеров
    countsame[i]:=0;
  for i:=1 to 50 do
  begin
    for j:=1 to 50 do
    begin
      if i=dot_coord[j][4]
      then inc(countsame[i]);
    end;
  end;
  countclust:=0;
  for i:=1 to 50 do
    if countsame[i]>0
    then inc(countclust);
  numclust:=countclust;
  end;
  j:=1;
  for i:=1 to 50 do
  begin
    if countsame[i]>0
    then begin
           dot_chosen[j]:=i;
           inc(j);
         end;
  end;

  for p:=1 to 50 do//отрисовка точек
  begin
    xaxis:=3*dot_coord[p][2];
    yaxis:=3*dot_coord[p][3];
    for i:=xaxis to xaxis+2 do
      for j:=yaxis to yaxis+2 do
      begin
        for bruh:=1 to dot_number do
        begin
          if dot_chosen[bruh]=dot_coord[p][4]//выбор цвета точки
          then Image1.Canvas.Pixels[i, j]:=dot_color[bruh-1];
        end;
      end;
  end;
 /////////////////////////////

 form1.Button2Click(sender);



end;

procedure TForm1.FormCreate(Sender: TObject);
begin
  dot_color[0]:=clBlack;
  dot_color[1]:=clRed;
  dot_color[2]:=clLime;
  dot_color[3]:=clBlue;
  dot_color[4]:=clPurple;
  dot_color[5]:=clDkGray;
  dot_color[6]:=clGreen;
  button2.Enabled:=false;
end;

procedure TForm1.Button2Click(Sender: TObject);
var
  iter_num,iter,xaxis,yaxis:integer;
  min_distance,distance:real;
  cluster_center:array [1..10,1..3] of real;
  dots:array [1..50,1..3] of integer;
  max_cluster:integer;
  i,j,minJ,p:integer;
begin
  //iter_num:=strtoint(edit2.text);//ћ≈“ќƒ   —–≈ƒЌ»’
  max_cluster:=strtoint(edit1.Text);

  Image2.Canvas.Rectangle(0,0,370,370);//раскраска белым цветом

  for i:=1 to 50 do//коорд точек и номера кластера точки
  begin
    dots[i][1]:=0;//номер кластера
    dots[i][2]:=dot_coord[i][2];//x
    dots[i][3]:=dot_coord[i][3];//y
  end;

  for i:=1 to  max_cluster do//коорд середины кластера
  begin
    cluster_center[i][1]:=i;//номер кластера
    cluster_center[i][2]:=dot_coord[i][2];//x
    cluster_center[i][3]:=dot_coord[i][3];//y
    dots[i][1]:=i;
  end;

  for iter:=1 to iter_num do
  begin
    for i:=1 to 50 do
    begin
      if dots[i][1]=0//если точка не в кластере
      then begin
             min_distance:=500;
             for j:=1 to max_cluster do
             begin
                distance:=cluster_anal(dots[i][2],cluster_center[j][2],dots[i][3],cluster_center[j][3]);//находим рассто€ние между центром и точкой
                if distance<min_distance
                then begin min_distance:=distance; minJ:=j; end;
             end;
             dots[i][1]:=trunc(cluster_center[minj][1]);
             cluster_center[minJ][2]:=(cluster_center[minJ][2]+dots[i][2])/2;//х нового центра
             cluster_center[minJ][3]:=(cluster_center[minJ][3]+dots[i][3])/2;//y нового центра
           end;
    end;
  end;

  for p:=1 to 50 do//отрисовка точек
  begin
    xaxis:=3*dots[p][2];
    yaxis:=3*dots[p][3];
    for i:=xaxis to xaxis+2 do
      for j:=yaxis to yaxis+2 do
      begin
        Image2.Canvas.Pixels[i, j]:=dot_color[dots[p][1]];
      end;
  end;
end;

end.
