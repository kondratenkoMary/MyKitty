#include "rus_io.h"
#include <iostream>
#include <stdio.h>
#include "graphics.h"
#include <vector>
#include <conio.h>
#include <windows.h>
#include <cstdlib>

using namespace std;
const int windowX=600,windowY=700;//размер графического окна
int n,m,borderColor=1,fillColor=4, deadCellFill=0,countstate;//borderColor,fillColor-цвета для линий и для заполнения клеток
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
                floodfill(cells[i][j].x+5,cells[i][j].y+5,borderColor);//удаление мертвой клетки
             }
        }
   }
   }
void init(vector<vector<Cell> >&cells ){
for (int i=0;i<n;i++)
{
     for (int j=0;j<m;j++){
        cells[i][j].x=( ( (windowX/m)*j )+ ( (windowX/m)/2) );//расчет центра клетки
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
            }
            else if(alive == 3)
            {
                newGeneration[i][j].isAlive = true;
            }
            else if(alive > 3)
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
    cout<<"\nВведите размерность игрового поля (nxm): ";
    cin>>n>>m;
    cells.resize(n);
    for (int i=0; i<cells.size(); i++){
      cells[i].resize(m);
    }
    init(cells);
    int cellscounter;//кол-во клеток
    cout<<"\nВведите количество клеток в первом поколении: ";
    cin>>cellscounter;
    int celloneX,celloneY;
    for (int i=0;i<cellscounter;i++){
        cout<<"\nВведите координаты "<<i<<" клетки: ";
        cin>>celloneX>>celloneY;
        cells[celloneX][celloneY].isAlive=true;
    }
    char q;// для шага
    cout<<"\nВыполнять по шагам? (y/n) "<<endl;
    cin>>q;
    initwindow(windowX,windowY," Игра <<Жизнь>> ");

    printCells(cells);
    while (isContinue(cells)){

         Sleep(1000);
         if ((q=='y') || (q=='Y') ){
            system("PAUSE");
         }
         cells = buildNextGeneration(cells);
         printCells(cells);
    }
    cout<<"Мы закончили"<<endl;
    getch();
    closegraph();
    return 0;
}

