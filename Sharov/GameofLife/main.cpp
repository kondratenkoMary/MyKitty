#include "rus_io.h"
#include <iostream>
#include <stdio.h>
#include "graphics.h"
#include <vector>
#include <conio.h>
#include <windows.h>
#include <cstdlib>

using namespace std;
const int windowX=500,windowY=500;//размер графического окна
int celloneX,celloneY,n,m,borderColor=1,fillColor=4, deadCellFill=0,countstate;//borderColor-цвет для линий поля
                                                                               //fillColor-цвет для заполнения живых клеток
struct Cell{
    int x;
    int y;
    bool isAlive;
};

void printCells(vector<vector<Cell> > cells ){ //рисует поле и заполняет живые клетки
  setcolor(borderColor);
  for(int i=0; i<n;i++){
    line(0,((windowY/n)*i),windowX,((windowY/n)*i));//горизонтальные линии
  }
  for(int i=0; i<m;i++){
    line(((windowX/m)*i),0,((windowX/m)*i),windowY);//вертикальные линии
  }
  for (int i=0;i<n;i++){
    for (int j=0;j<m;j++){
      if (cells[i][j].isAlive==true){
        setfillstyle(borderColor,fillColor);
        floodfill(cells[i][j].x+5,cells[i][j].y+5,borderColor);//выделение живой клетки
      } else {
               setfillstyle(borderColor,deadCellFill);
               floodfill(cells[i][j].x+5,cells[i][j].y+5,borderColor);//если клетка не отмечена живой,
             }                                                        //то её цвет не меняется
    }
  }
}

void init(vector<vector<Cell> >&cells ){  //расчет центра клетки для дальнейшей проверки
  for (int i=0;i<n;i++){                  //на её состояние:мертвое или живое
    for (int j=0;j<m;j++){
      cells[i][j].x=( ( (windowX/m)*j )+ ( (windowX/m)/2) );
      cells[i][j].y=( ( (windowY/m)*i )+ ( (windowY/m)/2) );
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
    int alive = 0;//счетчик живых клеток
      for(int c = -1; c < 2; c++){
        for(int d = -1; d < 2; d++){
          if(!(c == 0 && d == 0)){
            if ( ((i+c)>=0) && ((i+c)<n)&&((j+d)>=0) && ((j+d)<m) ){  //проверка на выход за пределы матрицы
              if(cells[i+c][j+d].isAlive){
                ++alive;
              }
            }
          }
        }
      }

    if(alive < 2){
      newGeneration[i][j].isAlive = false;
    } else if(alive == 3){
             newGeneration[i][j].isAlive = true;
           } else if(alive > 3){
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
    cout<<"\nВас приветствует Игра в ""Жизнь!";
    vector<vector<Cell> >cells;
    cout<<"\nВведите размерность игрового поля (nxm): ";
    cin>>n>>m;
    cells.resize(n);
    for (int i=0; i<cells.size(); i++){
      cells[i].resize(m);
    }
    init(cells);
    char q; //переменная типа char для выбора выполнения программы (по шагам или нет)
    cout<<"\nВыполнять по шагам? (y/n) "<<endl;
    cin>>q;
    initwindow(windowX,windowY," Игра <<Жизнь>> ");
    setcolor(borderColor);
    for(int i=0; i<n;i++){
      line(0,((windowY/n)*i),windowX,((windowY/n)*i));//горизонтальные линии
    }
    for(int i=0; i<m;i++){
       line(((windowX/m)*i),0,((windowX/m)*i),windowY);//вертикальные линии
    }
    do
    {
       if (ismouseclick(WM_LBUTTONDOWN)){
         getmouseclick(WM_LBUTTONDOWN, celloneX, celloneY);
         setfillstyle(1,fillColor);
         floodfill(celloneX, celloneY,borderColor);
       }
    }while( !(GetAsyncKeyState(VK_SPACE)<0) );//состояние клавиши:пока не нажат пробел, отмечаем положение клеток
    for (int i=0;i<n;i++){                   // в первом поколении
      for (int j=0;j<m;j++){
        if (fillColor==getpixel(cells[i][j].x,cells[i][j].y) ){
          cells[i][j].isAlive=true;
        }
      }
    }
    while (isContinue(cells)){// цикл работы игры с условиями продолжения и
      Sleep(100);  // правилами смены поколения
      if ((q=='y') || (q=='Y') ){
        getch();
      }
      cells = buildNextGeneration(cells);
      printCells(cells);
    }
    cout<<"Конец игры."<<endl;
    getch();
    closegraph();
    return 0;
}

