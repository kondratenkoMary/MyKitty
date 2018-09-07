#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int n,i,x,r;
    cout << "\n¬ведите n ";cin>>n;
    for (i=1;i<=n;i++)
    {
        cout<<"\n¬ведите число ";cin>>x;
        if (x<0)
            r=x;

    }
    cout<<"\n–езультат "<<r<<'\n';
    system("PAUSE");

    return 0;
}
