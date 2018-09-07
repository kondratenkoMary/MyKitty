#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <fstream>
using namespace std;

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    ofstream output;//номер три под буквой А
    output.open("kc.txt",ios::app);
    int k,a;
    cout<<"\nВведите k: ";
    cin>>k;
    for (int i=0;i<k;i++){
        cin>>a;
        output<<a<<' ';
    }
    output.close();
    ifstream input;
    input.open("kc.txt");
    if (!input){
        cout<<"\nОшибка\n";
    }
    while (!input.eof()){
        input>>a;
        if (!input.eof())
            cout<<a<<' ';
    }
    input.close();//номер три под буквой Б
    cout<<'\n';
    input.open("kc.txt");
    int max,min;
    input>>a;
    max=a;
    min=a;
    while (!input.eof()){
        input>>a;
        if (a>max) max=a;
        if (a<min) min=a;
    }
    cout<<"\nМаксимум: "<<max<<endl;
    cout<<"\nМинмум: "<<min<<endl;
    input.close();

    //номер три под буквой В
    input.open("kc.txt");
    ofstream outputPLUS;
    ofstream outputMINUS;
    outputMINUS.open("minus.txt");
    outputPLUS.open("plus.txt");//для положительных чисел
    input>>a;
    while(!input.eof()){

         if (a>0)
             outputPLUS<<a<<" ";
             else outputMINUS<<a<<" ";
        input>>a;
    }
    outputMINUS.close();
    outputPLUS.close();


    system("PAUSE");

    return 0;
}
