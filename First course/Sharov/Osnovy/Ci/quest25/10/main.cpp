#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int a,p=0,mi,i=1;
    bool f=0;
    cout << "\nВведите число ";cin>>a;
    mi=a;
    while (a!=0)
    {
        if ((a<mi) and (f==0))
        {
             mi=a;
             f=1;
             p=i;
        }
        i++;

        cout<<"\nВведите число: "; cin>>a;
    }
    cout<<"\nПорядковый номер минимального: "<<p<<'\n';
    system("PAUSE");

    return 0;
}
