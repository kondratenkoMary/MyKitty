#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char c,l;
    int k=0,p=0;
    cout<<"\nВведите заданную литеру: "; cin>>l;
    cout<<"\nВведите символ последовательности: "; cin>>c;
    while (c!='.')
    {
       if (c==l)
        k++;
       else if (c!=l)
       {
           p=k;
           k=0;
       }
       if (p<k)
        p=k;
       cout<<"\nВведите символ последовательности: ";cin>>c;
    }
    cout<<"\nМаксимальная длина последовательности заданных литер: "<<p<<'\n';

    system("PAUSE");

    return 0;
}
