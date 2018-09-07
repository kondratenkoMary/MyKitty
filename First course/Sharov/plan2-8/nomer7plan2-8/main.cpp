#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int NOD (int a, int b)
{
    while ( (a!=0)&(b!=0))
    {
        if (a>b)
        {
          a=a%b;
        }
        else b=b%a;
    }
    return (a+b);
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int a,b,rez;
    cout<<"\n¬ведите два целых числа: ";
    cin>>a;
    cin>>b;
    rez=NOD(a,b);
    cout<<"\nќтвет: "<<rez<<endl;

    system("PAUSE");

    return 0;
}
