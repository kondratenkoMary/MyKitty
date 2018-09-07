#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout<<"\nВведите номер дня недели: ";cin>>n;
    switch(n)
    {
        case 1: cout<<"Понедельник ";break;
        case 2: cout<<"Вторник ";break;
        case 3: cout<<"Среда ";break;
        case 4: cout<<"Четверг ";break;
        case 5: cout<<"Пятница ";break;
        case 6: cout<<"Суббота ";break;
        case 7: cout<<"Воскресенье ";break;

    }
    system("PAUSE");

    return 0;
}
