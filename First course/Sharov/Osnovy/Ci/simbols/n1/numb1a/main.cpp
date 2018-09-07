#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cstring>
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char c,l;
    int k=0;
    cout<<"\n¬ведите заданную литеру: "; cin>>l;
    cout<<"\n¬ведите символ последовательности: "; cin>>c;
    while (c!='.')
    {
       if (c==l)
        k++;
       cout<<"\n¬ведите символ последовательности: ";cin>>c;
    }
    cout <<"\n—имволов "<<l<<" встречалось "<<k<<" раз(a) "<<'\n';
    system("PAUSE");

    return 0;
}
