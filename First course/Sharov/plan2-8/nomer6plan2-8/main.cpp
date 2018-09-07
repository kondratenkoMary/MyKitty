#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <string>
#include <cmath>
using namespace std;
void Equation (float k, float b)
{
    float x;
    if (k==0)
    {
        cout<<"Корней нет.";
    }
    else {
        x=(-b)/k;
        cout<<"Корень линейного уравнения: "<<x;
    }

}

void Equation (float a, float b, float c)
{
    float x1,x2,d=0;
    d=b*b-4*a*c;
    if (d<0)
    {
        cout<<"Корней нет";
    }
    else if (a!=0)
    {
        x1=( (-b)-sqrt(d) )/2*a;
        x2=( (-b)+sqrt(d) )/2*a;
        cout<<"Корни уравнения: "<<x1<<", "<<x2;
    }
         else Equation(b,c);

}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    float a,b,c,k;
    cout<<"\nВведите коэффициенты линейного уравнения: ";
    cin>>k;
    cin>>b;
    cout<<'\n';
    Equation(k,b);
    cout<<'\n';
    cout<<"\nВведите коэффициенты квадратного уравнения: ";
    cin>>a;
    cin>>b;
    cin>>c;
    cout<<'\n';
    Equation(a,b,c);
    cout<<'\n';

    system("PAUSE");

    return 0;
}

