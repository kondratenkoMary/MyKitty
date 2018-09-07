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

void InsRing( ref & p, int a)
{
    ref q;
    q=new node;
    q->dat=a;
    q->next=p->next;
    p->next=q;
}

int main()
{
    setRusLocale(); //поддержка кириллицы
    textcolor(WHITE); //цвет текста - белый
    int S,D;
    cout<<"\n¬ведите S : ";
    cin>>S;
    cout<<"\n¬ведите D: ";
    cin>>D;
    ref ring=NULL,cur=NULL;
    ring=new node;
    (*ring).next=ring;
    cur=ring;
    do
    {
        (*cur).next=new node;
        cur=(*cur).next;
        cout<<"\n¬ведите число: ";
        cin>>(*cur).dat;
    }while ( (*cur).dat!=0);
    (*cur).next=ring;
    cur=(*ring).next;
    while (cur!=ring)
    {
        if ( (*cur).dat== S){
            InsRing(cur,D);
        }
        cur=cur->next;

    }
    cur=ring->next;
    while (cur!=ring){
        cout<<cur->dat<<' ';
        cur=cur->next;
    }


    system("PAUSE");

    return 0;
}
