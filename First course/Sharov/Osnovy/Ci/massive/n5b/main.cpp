#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout << "\n¬ведите количество элементов массива: ";
    cin>>n;
    int a[n];
    cout<<"\n¬ведите элементы массива: ";
    for ( int i=1;i<=n;i++)
        cin>>a[i];
    p=a[1];
    k=a[2];
    for (int i=3;i<=n;i++)
    {
        a[1]=a[i]

    }
    system("PAUSE");

    return 0;
}
