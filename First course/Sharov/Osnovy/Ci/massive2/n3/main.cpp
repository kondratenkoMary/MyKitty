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
    int a[n][n];
    cout<<"\nЗаполните матрицу: \n";
    for (int i=1;i<=n;i++)
        for (int j=1;j<=n;j++)
          cin>>a[i][j];
    cout<<"\nПoлученная матрица\n";
    for (int i=1;i<=n;i++)
        {
            for (int j=1;j<=n;j++)
              cout<<a[j][i]<<' ';
            cout<<'\n';
        }

    system("PAUSE");

    return 0;
}
