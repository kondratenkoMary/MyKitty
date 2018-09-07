#include "rus_io.h"
#include <stdio.h>
#include "graphics.h"
#include <conio.h>
#include <windows.h>
#include <vector>
#include <cstdlib>
using namespace std;
int const gamewindowX=600,gamewindowY=600,windowX=600,windowY=200,backgroundgamewindow=7,colorOfGamewindowLine=0,
colorOfButton=10,colorOfButtonLine=14,colorOfButtonText=0,colorAliveCell=5,colorDeadCell=10;
int countstate,celloneX,celloneY,n=10,m=10;//счетчик состояний и координаты пикселя для выделения живых клеток в первом поколении


struct Cell{
    int x;
    int y;
    bool isAlive;
};


void init(vector<vector<Cell> >&cells ){
  for (int i=0;i<n;i++){
    for (int j=0;j<m;j++){
      cells[i][j].x=(  ( 25+((gamewindowX/m)*j) )+ (25+((gamewindowX/m)/2) ) );//расчет центра клетки
      cells[i][j].y=(  ( 25+( (windowY/n)*i ) )+ (25+((windowY/n)/2)) );
    }
  }
}

void printCells(vector<vector<Cell> > cells ){ //рисует поле и заполняет живые клетки
  for (int i=0;i<n;i++){
    for (int j=0;j<m;j++){
      if (cells[i][j].isAlive==true){
        setfillstyle(1,colorAliveCell);
        floodfill(cells[i][j].x+5,cells[i][j].y+5,colorOfGamewindowLine);//выделение живой клетки
      } else {
                setfillstyle(1,colorDeadCell);
                floodfill(cells[i][j].x+5,cells[i][j].y+5,colorOfGamewindowLine);//удаление мертвой клетки
             }
    }
  }
}

void compareGenerations(vector<vector<Cell> > &cells, vector<vector<Cell> > &newGeneration){
  for ( int i=0;i<n;i++){
    for (int j=0; j<m;j++){
      if (cells[i][j].isAlive!=newGeneration[i][j].isAlive){
        countstate=0;//состояние поколения( ни одна клетка не меняет своего состояния или меняет )
        return;
      }
    }
  }
  countstate++;
}

vector<vector <Cell> > buildNextGeneration(vector<vector <Cell> > &cells){  //функция поиска соседей
  vector< vector <Cell> > newGeneration;
  newGeneration = cells;
  for (int i=0;i<n;i++){
    for (int j=0;j<m;j++){
      int alive = 0;//счечик живых клеток
        for(int c = -1; c < 2; c++)
            {
              for(int d = -1; d < 2; d++)
                {
                   if(!(c == 0 && d == 0))
                     {
                       if ( ((i+c)>=0) && ((i+c)<n)&&((j+d)>=0) && ((j+d)<m) ){  //проверка на выход из матрицы
                         if(cells[i+c][j+d].isAlive)
                           {
                             ++alive;
                           }
                       }
                     }
                }
            }
      if(alive < 2)
      {
        newGeneration[i][j].isAlive = false;
      } else if(alive == 3)
               {
                 newGeneration[i][j].isAlive = true;
               } else if(alive > 3)
                        {
                          newGeneration[i][j].isAlive = false;
                        }

    }
}
 compareGenerations(cells, newGeneration);
 return newGeneration;
}

bool isContinue(vector<vector<Cell> > &cells){ //условия продолжения программы
  if (countstate > 2){
    return false;
  }
  for (int i=0;i<n;i++){
    for (int j=0;j<m;j++){
      if ( cells[i][j].isAlive==true){
        return true;
      }
    }
  }
  return false;
}


int main () {
    setRusLocale(); //поддержка кириллицы
    vector<vector<Cell> >cells;
    cells.resize(n);//создаю матрицу как бы
    for (int i=0; i<cells.size(); i++){
      cells[i].resize(m);
    }
    init(cells);
    initwindow(gamewindowX+windowX,gamewindowY+windowY,"Игра в <<Жизнь>>");
    setfillstyle(1,backgroundgamewindow);
    bar(25,25,gamewindowX+25,gamewindowY+25);
    setcolor(colorOfGamewindowLine);
    for(int i=0; i<n;i++){
      line(25,25+( (gamewindowY/n)*i ),gamewindowX+25,25+( (gamewindowY/n)*i ) );//горизонтальные линии
    }
    for(int i=0; i<m;i++){
      line(25+( (gamewindowX/m)*i ),25, 25+( (gamewindowX/m)*i ), gamewindowY+25);//вертикальные линии
   }
   setfillstyle(1,colorOfButton);
   setcolor(colorOfButtonLine);
   bar3d((windowX+gamewindowX)-425,25,(windowX+gamewindowX)-25,175,0,0);
   setbkcolor(colorOfButton);
   settextstyle(4,0,4);
   setcolor(colorOfButtonText);
   outtextxy((windowX+gamewindowX)-355,80,"Начать игру");
   setfillstyle(1,colorOfButton);
   setcolor(colorOfButtonLine);
   bar3d((windowX+gamewindowX)-425,gamewindowY-125,(windowX+gamewindowX)-25,gamewindowY+25,0,0);
   setbkcolor(colorOfButton);
   settextstyle(4,0,4);
   setcolor(colorOfButtonText);
   outtextxy((windowX+gamewindowX)-415,gamewindowY-63,"Следующий шаг");
   setfillstyle(1,colorAliveCell);
   do
   {
     if (ismouseclick(WM_LBUTTONDOWN)){
       getmouseclick(WM_LBUTTONDOWN, celloneX, celloneY);
       if ( (celloneX>25)&&(celloneX<(gamewindowX+25))&&(celloneY>25)&&(celloneY<(gamewindowY+25)) ) {
         floodfill(celloneX, celloneY,0);
       }
     }
   }while( !GetAsyncKeyState(VK_SPACE) );//состояние клавиши


   for (int i=0;i<n;i++){
     for (int j=0;j<m;j++){
       if (colorAliveCell==getpixel(cells[i][j].x,cells[i][j].y) ){
         cells[i][j].isAlive=true;
       }
     }
   }
   while (isContinue(cells)){//МАХА ЭТО НАДА ДЛЯ ШАГА, ТИПА УСЛОВИЕ ПРОДОЛЖЕНИЯ, НО НУЖНО КАК ДЛЯ ШАГА
     Sleep(100);  //ТАК И ДЛЯ ПРОСТО ЦИКЛА ЖИЗНИ
     cells = buildNextGeneration(cells);
     printCells(cells);
   }

   system("PAUSE");
   closegraph();
   return 0;
}
