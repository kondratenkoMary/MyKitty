#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int n,a,sum;
    sum=0;
    cout<<"\nВведите количество элементов последовательности: ";cin>>n;
    for (int i=1; i<=n; i++)
    {
        cin>>a;
        if(a<0)
            sum+=a;
    }
    cout<<"\nПолученная сумма: "<<sum;
    system("PAUSE");

    return 0;
}
