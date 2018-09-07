#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int n,i,x,max;
    cout << "\n¬ведите n ";cin>>n;
    cout << "\n¬ведите x ";cin>>x;
    max=x;
    for (i=2;i<=n;i++)
    {
        cout<<"\n¬ведите число ";cin>>x;
        if (x<0)
          if (x<max)
            max=x;

    }
    cout<<"\n–езультат "<<max<<'\n';
    system("PAUSE");

    return 0;
}
