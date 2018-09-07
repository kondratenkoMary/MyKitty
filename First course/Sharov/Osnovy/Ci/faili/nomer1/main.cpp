#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <fstream>
#include <cstdlib>
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char name[100];
    int a,n;
    cout<<"¬ведите название файла: ";
    cin>>name;
    ofstream  output;
    output.open(name);
    cout<<"¬ведите количество элементов последовательности: ";
    cin>>n;
    cout<<'\n';
    cout<<"¬водите последовательность: ";
    for (int i=0;i<n;i++){
        cin>>a;
        output<<a<<' ';
    }

    output.close();



    system("PAUSE");

    return 0;
}
