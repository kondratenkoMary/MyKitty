#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

   int x,i=1,p;
   cout << "\n¬ведите число x ";cin>>x;
    while (x!=0)
    {
        if (x<0)
             p=i;
        i++;

        cout<<"\n¬ведите еще ";cin>>x;
    }
    cout<<"\n–езультат "<<p<<'\n';
    system("PAUSE");

    return 0;
}
