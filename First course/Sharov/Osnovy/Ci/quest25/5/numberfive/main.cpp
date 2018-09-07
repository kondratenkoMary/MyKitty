#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
int a,k=0;
float sum=0;
    cout<<"\n¬ведите число: ";cin>>a;
    while (a!=0)
    {
        k++;
        sum+=a;
        cout<<"\n¬ведите число: "; cin>>a;
    }
    float arf;
    arf=sum/k;
    cout<<"\—реднее арифметическое: "; cout<<arf;
    system("PAUSE");

    return 0;
}
