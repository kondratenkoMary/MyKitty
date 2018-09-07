#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

int a,b,e,k=0;
cout<<"\nВведите число b: ";cin>>b;
cout<<"\nВведите число e: ";cin>>e;
cout<<"\nВведите элементы последовательности: ";cin>>a;
while(a!=0)
{
    if (abs(b-a)==e)
        k++;
    cin>>a;
}
cout<<"Количество: ";cout<<k;
    system("PAUSE");

    return 0;
}
