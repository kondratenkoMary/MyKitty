#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <fstream>
#include <string>
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    ifstream input;
    input.open("f.txt");
    if (!input)
    {
        cout<<"\nОшбика";
    }
    string s,MAXs;
    input>>s;
    MAXs=s;
    while (!input.eof())
    {
        /*cout<<s.length();
        cout<<':';
        cout<<MAXs.length();
        cout<<'\n'; */
        if(!input.eof())
        {
            input>>s;
        }
        if (s.length()>MAXs.length())
        {
            MAXs=s;
        }

    }
    cout<<MAXs<<endl;
    input.close();
    system("PAUSE");

    return 0;
}
