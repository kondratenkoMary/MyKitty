#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <cmath>

using namespace std;

double findef(double x) {
	return (cos(x)-x*x+2*x);
}
int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    const double goldnumber = (1 + sqrt(5)) / 2;
	double a, b;
	double Eps;
	double x1, x2;
	int count=0;
	cout<<"\nВведите интеравал и погрешность для нахождения максимума: ";
	cin >> a >> b >> Eps;
	while (fabs(b - a) > Eps) {
            count+=1;
		   x1 = b - (b - a) / goldnumber;
	       x2 = a + (b - a) / goldnumber;
	       if (findef(x1) <= findef(x2))
	           a = x1;
	       else
	           b = x2;
	}
	cout << "(" << (a + b) / 2 << ", " << findef((a + b) / 2) << ")";
    cout<<"\nКоличество обращений к функции: "<<count;

    system("PAUSE");

    return 0;
}
