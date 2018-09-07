#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char a,b;
    bool flag=false;
    cout<<"\nВведите последовательность символов: ";
    cin>>b;//вводится первый символ
    cin>>a;
    while (a!='.')
    {
        if ( (b=='ф') and (a=='л') )
            flag=true;
        b=a;
        cin>>a;
    }
    if (flag==true)
        cout<<"\nВходит\n";
        else cout<<"\nНе входит\n";

    system("PAUSE");

    return 0;
}
