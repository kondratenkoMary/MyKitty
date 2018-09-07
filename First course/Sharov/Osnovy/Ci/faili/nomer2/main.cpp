#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <fstream>
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый


    char name[100];
    int a,n,c;
    cout<<"Введите название файла: ";
    cin>>name;
    ifstream  input;
    input.open(name);
    if (!input)
       {
        cout<<"\nОшибка открытия файла\n";exit(1);
       }
    int sum=0;
    a=input.peek();
    while (!input.eof())
    {
        input>>c;
        sum+=c;
        if (!input.eof())
            cout<<c<<"+";
            else cout<<c<<"=";
    }
    input.close();
    cout<<sum;

    system("PAUSE");

    return 0;
}
