#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    const int n=5;
    int A[n],B[n],proizved=1,skalar=0;
    cout<<"\n¬ведите координаты первого вектора( первый массив ): ";
    for (int i=0;i<n;i++)
        cin>>A[i];
    cout<<'\n';
    cout<<"\n¬ведите координаты второго вектора( второй массив ): ";
    for(int i=0;i<n;i++)
        cin>>B[i];
    cout<<'\n';
    for (int i=0;i<n;i++)
    {
        proizved=A[i]*B[i];
        skalar=skalar+proizved;
    }
    cout<<"\n—кал€рное произведение равно "<<skalar<<'\n';
    system("PAUSE");

    return 0;
}
