#include <stdio.h>
#include "graphics.h"

int main () {
    initwindow(550,500);

    settextstyle(0,0,10);
    outtextxy(20,160,"HELLO WORLD!");
    settextstyle(0,0,1);
    outtextxy(30,240,"Для продолжения нажмите любую клавишу");

    moveto(30,260);
    lineto(360,260);

    getch();
    closegraph();
    return 0;
}
