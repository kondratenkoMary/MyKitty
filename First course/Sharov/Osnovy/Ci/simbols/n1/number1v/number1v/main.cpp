#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    char s,n;
    int k=1,ma=0;
    cout<<"\n¬ведите символ: ";cin>>n;
    cout<<"\n¬ведите символ: "; cin>>s;
    while (s!='.')
    {
        if(n==s)
            k++;
        else if (k>ma)
        {
            ma=k;
            k=1;
        }
        n=s;
        cout<<"\n¬ведите символ: "; cin>>s;
    }
    cout<<"\nƒлина макс: "<<ma<<'\n';
    system("PAUSE");

    return 0;
}
