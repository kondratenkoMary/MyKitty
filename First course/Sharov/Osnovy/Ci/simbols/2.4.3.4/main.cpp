#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cstdio>
using namespace std;

int main()
{
   setRusLocale(); //поддержка кириллицы
   textcolor(WHITE); //цвет текста - белый
    char a;
    int n,w,d1,d2,m1,m2,y1,y2,y3,y4;
    cout << "\n ¬веди d1: "; cin>>d1; cout << "\n ¬веди d2: "; cin>>d2;
    cout << "\n ¬веди m1: "; cin>>m1; cout << "\n ¬веди m2: "; cin>>m2;
    cout << "\n ¬веди y1: "; cin>>y1; cout << "\n ¬веди y2: "; cin>>y2;
    cout << "\n ¬веди y3: "; cin>>y3; cout << "\n ¬веди y4: "; cin>>y4;
    cout << "\n ¬веди день денели: "; cin>>w; cout << "\n ¬веди через сколько: "; cin>>n;
    for(int i=0; i<n; i++)
    {
        d2++;
        w++;
        if(d2==10)
        {
            d2=0;
            d1++;
        }
        if((d1==3)&&(d2==1))
        {
            d1=0;
            d2=1;
            m2++;
        }
        if(m2==10)
        {
            m2=0;
            m1++;
        }
        if((m1==1)&&(m2==2))
        {
            m2=1;
            m1=0;
            y4++;
        }
        if(y4==10)
        {
            y4=0;
            y3++;
        }
        if(y3==10)
        {
            y3=0;
            y2++;
        }
        if(y2==10)
        {
            y2=0;
            y1++;
        }
        if(w==8) w=1;
    }

    if(w==1)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"понедельник";
    }
    if(w==2)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"вторник";
    }
    if(w==3)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"среда";
    }
    if(w==4)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"четверг";
    }
    if(w==5)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"п€тница";
    }
    if(w==6)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"суббота";
    }
    if(w==7)
    {
        cout<<d1<<d2<<"."<<m1<<m2<<"."<<y1<<y2<<y3<<y4<<" "<<"воскресенье";
    }

    system("PAUSE");
    return 0;
}
