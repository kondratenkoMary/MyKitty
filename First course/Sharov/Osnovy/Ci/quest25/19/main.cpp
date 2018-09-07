#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

   int n,i,a,k=0;
   bool f=0;
    cout << "\n¬ведите n ";cin>>n;
    for (i=1;i<=n;i++)
    {
        cout<<"\n¬ведите число ";cin>>a;
        if ((a<0) and (f==0))
            k++;
        else
            f=1;

    }
    cout<<"\n–езультат "<<k<<'\n';
    system("PAUSE");

    return 0;
}
