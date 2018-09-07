#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

      int a,k=0,x;
    cout << "\n¬ведите x ";cin>>a;
    while (x!=0)
    {
        cout<<"\n¬ведите число ";cin>>x;
        if ((x*a)<0)
            k++;
        a=x;
    }
    cout<<"\n–езультат "<<k<<'\n';
    system("PAUSE");

    return 0;
}
