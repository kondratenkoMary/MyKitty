#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout<<"\n¬ведите количество элементов последовательности: ";
    cin>>n;
    int a[n],y=0,z=0,k;
    cout<<"\n¬ведите последовательнось: ";
    for(int i=1;i<=n;i++)
        cin>>a[i];
    for (int i=1;i<=n;i++)
    {
        if ( (i%2)==0 )
            y=y+( (-1)*a[i] );
            else y=y+a[i];
    }
    if ((n%2)==1)
        k=( (n/2)+1);
        else k=(n/2);
    for(int i=1;i<=k;i++)
        {
           z+=a[i]*a[n-i+1];
        }
    cout<<'\n';
    cout <<"\ny = "<<y<<'\n';
    cout<<"\nz = "<<z<<'\n';
    system("PAUSE");

    return 0;
}
