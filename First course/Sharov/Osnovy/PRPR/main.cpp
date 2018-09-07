#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <fstream>
#include <string>
using namespace std;

struct Student {
	string FIO;
	string group;
	int mark;
};

float getMiddleMark(Student students){
	int countOfGood = 0;
	for (int i=0; i<students.size(); i++){
		if (students[i].mark >= 4){
			countOfGood++;
		}
	}

	float result = (countOfGood / students.size()) * 100;
}


int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый



    Student students [4];
	ifstream is ("f.txt");
	int count = 0;
	while (!is.eof()){
		string familia = is.read();
		string imya = is.read();
		string otchestvo = is.read();
		string group = is.read();
		int mark = is.read;

		students[count].FIO = familia + " " + imya + " " + otchestvo;
		students[count].group = group;
		students[count].mark = mark;

		count++;
	}

	cout<<"Процент студентов хорошистов"<<getMiddleMark(students)<<endl;



    system("PAUSE");

    return 0;

}

