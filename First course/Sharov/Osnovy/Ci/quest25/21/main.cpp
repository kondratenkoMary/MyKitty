#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

     int n,i,leng=0,a,mxleng=0;
    cout << "\nВведите n ";cin>>n;
    for (i=1;i<=n;i++)
    {
        cout<<"\nВведите число ";cin>>a;
        if (a==0)
            leng++;
        else if (a!=0)
        {
              mxleng=leng;
              leng=0;
        }
        if (mxleng<leng)
            mxleng=leng;
    }
    cout<<"\nМаксимум "<<mxleng<<'\n';
    system("PAUSE");

    return 0;
}
