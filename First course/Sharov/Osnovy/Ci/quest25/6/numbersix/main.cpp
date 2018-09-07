#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n,a,b,k=0;
    float sum=0;
    cout<<"\n¬ведите количество чисел в последовательности";cin>>n;
    cout<<"\n¬ведите число b : ";cin>>b;
    for(int i=0;i<n;i++)
    {
        cout<<"\n¬ведите элемент последовательности: ";cin>>a;
        if(a>b)
            {
                sum+=a;
                k++;
            }

    }
    float arf;
    arf=sum/k;
    cout<<"\n—реднее арифметическое из числе, превосход€щих число b: ";cout<<arf;

    system("PAUSE");

    return 0;
}
