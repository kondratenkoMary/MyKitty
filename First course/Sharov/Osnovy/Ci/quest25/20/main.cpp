#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

   int n,i,k=1,a,ma;
    cout << "\n¬ведите n ";cin>>n;
    cout << "\n¬ведите ";cin>>a;
    ma=a;
    for (i=2;i<=n;i++)
    {
        cout<<"\n¬ведите число ";cin>>a;
        if (a>ma)
        {
            ma=a;
            k=1;
        }
        if(a==ma)
            k++;

    }
    cout<<"\n–езультат "<<k<<'\n';
    system("PAUSE");

    return 0;
}
