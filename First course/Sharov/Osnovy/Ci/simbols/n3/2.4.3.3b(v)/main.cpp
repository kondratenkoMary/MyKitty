#include <iostream>
//#include "rus_io.h"
//#include "conio2.h"
#include <cstdio>
using namespace std;

int main()
{
//    setRusLocale(); //поддержка кириллицы
//    textcolor(WHITE); //цвет текста - белый
    char a,b,k;
    int n=0;
    cout << "\n ¬веди b: "; cin>>b;
    cout << "\n ¬веди a: ";
    while (a!='.')
    {
        a=getchar();
        if ((k==' ')&&(a==b)) n++;
        k=a;
    }
    cout<<n;
//    system("PAUSE");
    cin>>a;
    return 0;
}
