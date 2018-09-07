#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int n,i,p=1,a,ma;
    cout << "\nВведите n ";cin>>n;
    cout << "\nВведите число:";cin>>a;
    ma=a;
    for (i=2;i<=n;i++)
    {
        cout<<"\nВведите число "; cin>>a;
        if (a>ma)
        {
            ma=a;
            p=i;
        }

    }
    cout<<"\nПорядковый номер: "<<p<<'\n';
    system("PAUSE");

    return 0;
}
