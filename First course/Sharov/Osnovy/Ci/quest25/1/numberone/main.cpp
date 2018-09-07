#include <iostream>
#include "rus_io.h"
#include "conio2.h"
using namespace std;
int main()
{
    setRusLocale();
    textcolor(WHITE);
    int n;
    float a,sum;
    sum=0;
    cout<<"\n¬ведите количество элементов последовательности: ";
    cin>>n;
    cout<<"\n¬ведите элементы последовательности: ";
    for(int i=1; i<=n; i++)
        {
            cin>>a;
            sum+=a;
        }

    cout<<"\n—умма всех элементов последовательность = "<<sum;
     getch();
    return 0;
}
