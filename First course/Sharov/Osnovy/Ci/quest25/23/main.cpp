#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

     int n,i,k=1,x,a;
    cout << "\n¬ведите n ";cin>>n;
    cout << "\n¬ведите x ";cin>>x;
    a=x;
    for (i=2;i<=n;i++)
    {
        cout<<"\n¬ведите число ";cin>>x;
        if (x>a)
             k++;
        a=x;

    }
    if (k==n)
    cout<<"\nDA "<<'\n';
    else cout<<"\nNET "<<'\n';
    system("PAUSE");

    return 0;
}
