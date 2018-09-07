#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    const int n=10;
    int a[n];
    for(int i=0;i<n;i++)
        cin>>a[i];
    cout<<"\nВсе положительные числа: ";
    for(int i=0;i<n;i++)
    {
        if (a[i]>0)
            cout<<a[i]<<' ';
    }
    cout<<'\n';
    cout<<"\nВсе отрицательные числа: ";
    for(int i=0;i<n;i++)
    {
        if (a[i]<0)
            cout<<a[i]<<' ';
    }
    cout<<'\n';
    system("PAUSE");

    return 0;
}
