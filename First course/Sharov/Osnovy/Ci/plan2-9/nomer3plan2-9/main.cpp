#include <iostream>
#include "rus_io.h"
#include "conio2.h"

using namespace std;

struct node;
typedef node*ref;
struct node
{
    ref next;
    int dat;
};

void DelList( ref &p)
{
    ref q;
    q=p->next;
    p->dat=q->dat;
    p->next=q->next;
    delete q;
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый

    ref list=nullptr, cur=nullptr;
    list=new node;
    cur=list;
    do
    {
        cur->next=new node;
        cur=cur->next;
        cout<<"\n¬ведите число: ";
        cin>>cur->dat;
    }while (cur->dat!=0);
    cur->next=nullptr;
    cur=list->next;
    cout<<endl;
    while (cur!=nullptr)
    {
        cout<<cur->dat<<' ';
        cur=cur->next;
    }

    cur=list->next;

    while (cur->next!=nullptr)
    {
        if (cur->next->dat < 0)
        {
            DelList(cur->next);
        }
        cur=cur->next;
    }

    cur=list->next;

    cout<<endl;
      while (cur!=nullptr)
    {
        cout<<cur->dat<<' ';
        cur=cur->next;
    }

    system("PAUSE");

    return 0;
}
