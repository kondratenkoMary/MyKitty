#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

   int n,i,a,p=0,mi;
   bool f=0;
    cout << "\nВведите n ";cin>>n;
    for (i=1;i<=n;i++)
    {
        cout<<"\nВведите число ";cin>>a;
        if ((a>0) and (f==0))
        {
            p=i;
            f=1;
        }

    }
    cout<<"\nПорядковый номер: "<<p<<'\n';
    system("PAUSE");

    return 0;
}
