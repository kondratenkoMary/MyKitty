#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cstring>

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char a,b;
    int c=0;
    cout<<"\n¬ведите последовательность символов: ";
    cin>>b;
    cin>>a;
    while (a!='.')
    {
        if  ( ( b=='и') and (a=='л') )
            c++;
        b=a;
        cin>>a;
    }
    cout<<c<<" раз входит цепочка литер 'ил'. "<<'\n';
    system("PAUSE");

    return 0;
}
