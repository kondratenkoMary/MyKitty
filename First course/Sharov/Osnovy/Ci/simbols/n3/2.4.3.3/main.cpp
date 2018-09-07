#include <iostream>
#include "rus_io.h"
#include "conio2.h"
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char a;
    int n=1,k=0;
    cout << "\n ¬веди предложение: ";
    while (a!='.')
    {
        a=getchar();
        n++;
        if (a==' ')//||(a=='.'))
          {
           if (n>5)
               k++;
           n=0;
          }
    }
    cout<<k<<'\n';
    system("PAUSE");

    return 0;
}
