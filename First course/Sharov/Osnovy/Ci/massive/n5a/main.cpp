#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout <<"\n¬ведите количество элементов массива: ";
    cin>>n;
    int mas[n];
    cout<<"\n¬ведите элементы массива:";
    for (int i=1;i<=n;i++)
        cin>>mas[i];
    int p,k;
    p=0;
    k=0;
    if ((n%2)==0)
        k=(n/2);
        else k =((n/2)+1);
    for ( int i=1;i<=k;i++)
    {
        p=mas[i];
        mas[i]=mas[n-i+1];
        mas[n-i+1]=p;
    }
    for (int i=1;i<=n;i++)
        cout<<mas[i]<<' ';
    system("PAUSE");

    return 0;
}
