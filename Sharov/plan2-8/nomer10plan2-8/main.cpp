#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

string VID (int m[]){

    int count=0,k=n;
    for (int i=0;i<(k-1);i++){
        if (m[i]<m[i+1]){
            count++;
        }
    }
    if (count == k){
        cout<<"\nМассив упорядочен по возрастанию\n";
        exit(1);
    }else {
    count=0;
    for (int i=0;i<(k-1);i++){
       if ( m[i]>m[i+1]){
        count++;
       }
    }
    if (count==k){
        cout<<"\nМассив упорядочен по убыванию\n";
    }else cout<<"\nМассив неупорядочен\n";
    }
}


int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    int n;
    cout<<"\nВведите длину последовательности: ";
    cin>>n;
    int mas[n];
    cout<<"\nВведите последовательность: ";
    for (int i=0;i<n;i++){
        cin>>mas[i];
    }
    VID(mas[n]);

    system("PAUSE");

    return 0;
}
