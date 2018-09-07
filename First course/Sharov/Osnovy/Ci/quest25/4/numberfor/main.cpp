#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int a,b,sum;
    sum=0;
    cout<<"\nВведите заданное значение b: "; cin>>b;
    cout<<"\nВведите последовательность.";
    cout<<"\nВведите элемент последовательности: "; cin>>a;
    while (a!=0)
    {
        if (a>b)
            sum+=a;
        cout<<"\nВведите элемент последовательности: "; cin>>a;

    }
    cout<<"\nПолученная сумма: "<<sum;
    system("PAUSE");

    return 0;
}
