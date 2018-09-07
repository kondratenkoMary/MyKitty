#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cstdio>
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char a;
    int n,s=0;
    cout << "\n ¬веди n: "; cin>>n;
    for (int i=0; i<n; i++)
    {
        cout << "\n ¬веди a: "; cin>>a;
        if(a=='(')
        {
            s++;
        }
        if(a==')')
        {
            s--;
        }
    }
    if(s==0)
    {
        cout<<"\n количество скобок совпадает";
    }
    if(s!=0)
    {
        cout<<"\n количество скобок не совпадает \n";
    }
    system("PAUSE");
    return 0;
}
