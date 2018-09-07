#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
int a,b,p=0,i=1;
bool f=0;
cout<<"\n¬ведите число b-отрицательное: "; cin>>b;
cout<<"\n¬ведите число: "; cin>>a;
while (a!=0)
{
    if ((a<0) and (a>b) and (f==0))
    {
        p=i;
        f=1;
    }
    cout<<"\n¬ведите число: "; cin>>a;
    i++;
}
cout<<"\nќтвет: "<<p<<'\n';
    system("PAUSE");

    return 0;
}
