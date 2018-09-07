#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <math.h>
using namespace std;
const double goldch=(1+sqrt(5))/2; // "«олотое" число

double f(double x)
{
	return (sin(x)-log(x));
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    double a, b,eps,x1, x2,f1,f2; // x1,x2-очки, дел€щие текущий отрезок в отношении золотого сечени€
	cout <<"¬ведите a ";cin >> a;
    cout <<"¬ведите b ";cin >> b;
    cout <<"¬ведите погрешность ";cin >> eps;

    x1=b-(b-a)/goldch;
    x2=a+(b-a)/goldch;
    f1=f(x1);
    f2=f(x2);
	while (fabs(b-a)>eps)
    {
	       if (f1>f2)
        {
            b=x2;
            x2=x1;
            f2=f1;
            x1=b-(b-a)/goldch;
            f1=f(x1);
        }
        else
        {
            a=x1;
            x1=x2;
            f1=f2;
            x2=a+(b-a)/goldch;
            f2=f(x2);
        }
	}
	cout<<"("<<(a + b)/2<<", "<<f((a + b)/2)<<")"<<'\n';
    system("PAUSE");

    return 0;
}

