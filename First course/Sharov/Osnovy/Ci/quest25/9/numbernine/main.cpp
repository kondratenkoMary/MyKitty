#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
int a,mi,ma,r;
cout<<"Введите элементы последовательности: ";cin>>a;
mi=a;
ma=a;
while(a!=0)
{
    if (a>ma)
        ma=a;
    if(a<mi)
        mi=a;
    cin>>a;
}
r=ma-mi;
cout<<"Разность: ";cout<<r;
    system("PAUSE");

    return 0;
}
