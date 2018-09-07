#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cstdio>
#include <cstring>

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    char *str1,*str2;
    cout<<"\n¬ведите строку : ";
    gets(str1);
    for (int i=0;i<strlen(str1);i++)
        if ( str1[i]=='€')
            strcpy(str2,"ты");
        //else strcpy(str2,str1[i]);
    cout<<str2;


    system("PAUSE");

    return 0;
}
