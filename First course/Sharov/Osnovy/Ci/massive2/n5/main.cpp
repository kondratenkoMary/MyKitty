#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout<<"\n¬ведите размерность матрицы: ";
    cin>>n;
    float A[n][n],max,min;
    cout<<"\n¬ведите матрицу: \n";
    for (int i=1;i<=n;i++)
    {
        for (int j=1;j<=n;j++)
                cin>>A[i][j];
        cout<<'\n';
    }
    max=A[1][1];
    min=A[1][1];
    int kmin,kmax;
    for (int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            {
                if (A[i][j]>max)
                {
                    max=A[i][j];
                    kmax=i;
                }
                if ( A[i][j]<min )
                {
                    min=A[i][j];
                    kmin=j;
                }
            }
  // cout<<min<<' '<<max;
    //cout<<'\n'<<kmax<<' '<<kmin; провер€ла правильность опеределени€ стобца и строки
    float y[n];
    for ( int i=1;i<=n;i++)
        y[i]=0;              //инициализирую вектор
    cout<<"\n—кал€рное произведение : ";
    for (int i=1;i<=n;i++)
    {
        y[i]+=( A[kmax][i]*A[i][kmin]);
        cout<<y[i]<<' ';
    }
    cout<<'\n';



    system("PAUSE");

    return 0;
}
