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
    cout<<"/nСамая длинна строка: "<<MAXs<<endl;
    cout<<"Её длина: "<<MAXs.length()<<endl;
    input.close();

    input.open("f.txt");
    ofstream output;
    output.open("newf.txt");
    if (!output)
    {
        cout<<"\nОшибка открытия файла!";
        exit(1);
    }


    while (!input.eof())
    {
        input>>s;
        output<<s;
        for (int i=0;i<MAXs.length();i++)
        {
            output<<' ';
        }
        output<<'\n';
    }
    input.close();
    output.close();

    system("PAUSE");

    return 0;
}
