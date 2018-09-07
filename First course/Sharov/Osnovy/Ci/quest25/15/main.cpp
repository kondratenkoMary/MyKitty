#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый


    int n,i,x,p,b;
    cout << "\n¬ведите b ";cin>>b;
    cout << "\n¬ведите n ";cin>>n;
    for (i=1;i<=n;i++)
    {
        cout<<"\n¬ведите число ";cin>>x;
        if (x>b)
            p=i;

    }
    cout<<"\n–езультат "<<p<<'\n';
    system("PAUSE");

    return 0;
}
