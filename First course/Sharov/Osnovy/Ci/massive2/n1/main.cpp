#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout<<"\nВведите размерность квадратной матрицы: ";
    cin>>n;
    int a[n][n],sum=0,sumq=0;
    cout<<"\nЗаполните матрицу: \n";
    for (int i=1;i<=n;i++)
       {

        for (int j=1;j<=n;j++)
        {
           cin>>a[i][j];
           if (i==j)
             sum+=a[i][j];
           if ( (i+j)==(n+1) )
             sumq+=a[i][j];
        }
        cout<<'\n';
       }
    cout<<"\nСумма гланой дагонали матрицы: "<<sum<<'\n';
    cout<<"\nСумма побочной диагональи матрицы: "<<sumq<<'\n';
    system("PAUSE");

    return 0;
}
