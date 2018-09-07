#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int a,p,i=1;
    bool f=0;
   cout << "\nВведите число: "; cin>>a;
    while (a!=0)
    {
        if ((a<0) and (f==0))
        {
          p=i;
          f=1;
        }

        cout<<"\nВведите число: ";cin>>a;
        i++;
    }
    cout<<"Порядковый номер первого отрицательного: "<<p<<'\n';
    system("PAUSE");

    return 0;
}
