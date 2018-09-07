#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <string>
using namespace std;

bool polindrom(string word)
{
	int len = word.length();
	for(int i = 0; i < len/2; ++i)
	{
		if(word[i] != word[len-i-1])
		{
			return false;
		}
	}
	return true;
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    string str;
	cout << "Введите строку: ";
	cin >> str;
	if(polindrom(str))
	{
		cout << "Полиндром"<<endl;
	}
	else
	{
		cout << "Не полиндром"<<endl;
	}

    system("PAUSE");

    return 0;
}
