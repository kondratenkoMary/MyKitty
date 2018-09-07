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
    input.open("qq.txt");
    if (!input)
    {
        cout<<"\nОшбика";
    }
    string s,MAXs;
    input>>s;
    MAXs=s;
    int count=1,numMax;
    bool flag=false;
    while (!input.eof())
    {
        if(!input.eof())
        {
            input>>s;
        }
        count+=1;
        if (s.length() > MAXs.length())
        {
            MAXs=s;
            numMax=count;
        }
    }
    input.close();
    cout<<"\nПорядковый номер максимальной строки: "<<numMax<<endl;
    system("PAUSE");

    return 0;
}
