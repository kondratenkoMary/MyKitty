#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cmath>

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int i;
    double x,qrtX,e,sh,sum,standartf;
    long double raznost;
    cout<<"\nВведите аргумент: ";cin>>x;
    cout<<"\nВведите погрешность: ";cin>>e;
    qrtX=x*x;
    sh=x;//при i=0 значение функции равно аргументу
    sum=0;
    i=2;

   // bool f=(abs(sh))>e;
    while((abs(sh))>e)
    {
        sum+=sh;
        sh=sh*(qrtX /((2*i-2)*(2*i-1)));
        i++;
    }
    cout<<"\nВычисленное значение через ряд: "<<sum<<'\n';
    cout<<"\nКоличество слогаемых: "; cout<<i<<'\n';
    cout<<"\Найдем значение через стандартную функцию\n";
    standartf=sinh(x);
    cout<<"\nВычисленное значение через стандартную функцию: "<<standartf<<'\n';
    cout<<"\nНайдем разность между результатами\n";
    raznost=standartf-sum;
    cout<<"\nПолученная разность: ";cout<<raznost<<'\n';

    system("PAUSE");

    return 0;
}
