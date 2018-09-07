#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    const int n=5;
    int k=0,a[n];
    cout<<"\nВведите последовательность: ";
    for(int i=0;i<n;i++)
        cin>>a[i];
    for ( int i=0;i<n;i++)
    {
        if ( a[i]!=a[n-1])
            k++;
    }
    cout<<"\nОтличаются от последнего: "<<k<<'\n';
    system("PAUSE");

    return 0;
}
