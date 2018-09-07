#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <math.h>
using namespace std;

double f (double x)
{
    return sin(x)-(1/x);
}
int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    double a,b,c,eps;
    cout<<"\nВведите погрешность: ";
    cin>>eps;
    cout<<"\nВведите левую границу интервала - a: ";
    cin>>a;
    cout<<"\nВведите правую границу интервала - b: ";
    cin>>b;
    while ((b-a)>eps)
    {
        c=(a+b)/2;
        if ( (f(b)*f(c))<0)
            a=c;
            else
                b=c;
    }
    cout<<"Корень x="<<(a+b)/2<<"\n";

    system("PAUSE");

    return 0;
}
