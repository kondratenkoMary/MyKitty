#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout<<"\nВведите размерность квадратной матрицы и стоблца-вектора: ";
    cin>>n;
    int a[n][n],b[n],c[n];
    cout<<"\nЗаполните матрицу: \n";
    for (int i=1;i<=n;i++)
        for (int j=1;j<=n;j++)
          cin>>a[i][j];
    cout<<"\nЗаоплните вектор-столбец: ";
    for(int i=1;i<=n;i++)
        {
            cin>>b[i];
            c[i]=0;
        }
    cout<<"\nПолученный стоблец-веткор: \n";
    for ( int i=1;i<=n;i++)
    {
        for ( int j=1;j<=n;j++)
            c[i]+=(a[i][j]*b[j]);
        cout<<c[i]<<' ';
    }

    system("PAUSE");

    return 0;
}
