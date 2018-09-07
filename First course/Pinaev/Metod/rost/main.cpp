#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cmath>
using namespace std;
int i=1,c;
  void ToH(int dsk, char a, char b, char c,char element[])
{
    if( dsk != 0 )
    {
        ToH( dsk-1, a, c, b,element );
        if  (i==p)
        {
            return;
        }
        i++;
        element[x-1]=c;


        //cout << a << "->" << b << endl;
        ToH( dsk-1, c, b,  a ,element);
    }
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int x;
    cout << "¬ведите количество дисков: ";
    cin >> x;
    cout<<'\n';
    int p;
    cout<<"¬ведите позицию: ";
    cin>>p;
    char element[x];
    for ( int i=0;i<x;i++)
        elemetn[i]='A';
    ToH(x, 'A', 'B', 'C',elemet);
    for ( int i=0;i<x;i++)
        cout<<i+1<<" диск "<<element[i]<<endl;

    system("PAUSE");

    return 0;
}



