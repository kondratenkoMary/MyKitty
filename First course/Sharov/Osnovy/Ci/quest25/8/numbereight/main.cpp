#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

  float a,ma;
  int n;
  cout<<"\nВведите количество элементов последовательности: ";cin>>n;
  cout<<"Введите элементы последовательности: ";cin>>a;
  ma=a;
  for(int i=1;i<n;i++)
  {
      cin>>a;
      if(a>ma)
        ma=a;
  }
  cout<<"\n";
  cout<<"Максимальные элемент последовательности: ";cout<<ma;
    system("PAUSE");

    return 0;
}
