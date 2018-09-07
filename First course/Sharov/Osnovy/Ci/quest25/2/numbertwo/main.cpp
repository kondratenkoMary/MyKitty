#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int a,p=1;
    cout<<"\nВведите число: ";cin>>a;
    while (a!=0)
    {
        p*=a;
        cout<<"\nВведите число: "; cin>>a;
    }
    cout<<"Произведение элементов последовательность = "<<p<<' ';

    system("PAUSE");

    return 0;
}
