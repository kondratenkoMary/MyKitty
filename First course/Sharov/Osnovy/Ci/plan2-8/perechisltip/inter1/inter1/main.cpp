#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int g,n,d;
    cout<<"\n¬ведите год: "; cin>>g;
    cout<<"\n¬едите мес€ц: "; cin>>m;
    cout<<"\n¬ведите день: ";cin>>d;

    system("PAUSE");

    return 0;
}
