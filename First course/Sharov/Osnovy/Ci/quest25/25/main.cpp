#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

      int a,k=1,x,mk=0,n,i;
    cout << "\n¬ведите n ";cin>>n;
    cout << "\n¬ведите x ";cin>>x;
    a=x;
    for (i=2;i<=n;i++)
    {
        a=x;
        cout<<"\n¬ведите число ";cin>>x;
        if (a<x)
            k++;
        else if (a>=x)
        {
            mk=k;
            k=1;
        }
        if (mk<k)
            mk=k;
        a=x;
    }
    cout<<"\n–езультат "<<mk<<'\n';
    system("PAUSE");

    return 0;
}
