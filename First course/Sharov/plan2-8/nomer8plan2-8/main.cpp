#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int Difference (int m[])
{
    int max,min;
    max=m[0];
    min=m[0];
    for (int i=1;i<10;i++)
    {
        if (m[i]>max){
            max=m[i];
        }
        if (m[i]<min){
            min=m[i];
        }
    }
    return (max-min);
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int n;
    cout<<"\nВведите количесво групп: ";
    cin>>n;
    int mas [n][10],dif,maxDif;
    for (int i=0;i<n;i++)
        for (int j=0;j<10;j++){
            cin>>mas[i][j];
        }
    dif=Difference(mas[0]);//просто разность максимума и минимума
    maxDif=dif;//наибольшая разность
    int ngroup=1;
   for (int i=1;i<n;i++){
    dif=Difference(mas[i]);
    if (dif>maxDif){
        maxDif=dif;
        ngroup=i+1;
    }

   }
   cout<<"\nНомер группы: "<<ngroup<<endl;





    system("PAUSE");

    return 0;
}
