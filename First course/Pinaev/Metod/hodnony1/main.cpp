#include <iostream>
#include "rus_io.h"
#include "conio2.h"
#include <math.h>
using namespace std;
int arr[8][8], row[64], col[64];
int ktmov1[8] = { -2, -1, 1, 2, 2, 1, -1, -2 };
int ktmov2[8] = { 1, 2, 2, 1, -1, -2, -2, -1 };

int i, j, move_num, d;

void main() {
  addknight();
}
void addknight( )  {
  register int a, b, e;

 /* пометить клетку как посещенную и запомнить координаты клетки */
  arr[i][j] = 1;
  row[move_num] = i;
  col[move_num] = j;
  move_num++;

 /* проверить 8 возможных перемещений коня */
  for ( a = 0 ; a <= 7 ; a++ ) {
   /* если все ходы сделаны, печатаем их */
    if ( move_num >= 64 ) {
      writeboard( );
      exit ( 0 );
    }

   /* определяем колонку и строку для следующего хода */
    b = i + ktmov1[a];
    e = j + ktmov2[a];

   /* проверяем, что после выполенения хода конь остается на шахматной доске */
    if ( b < 0 || b > 7 || e < 0 || e > 7 )
      continue;

   /* проверяем, были ли мы уже в этой клетке */
    if ( arr[b][e] == 1 )
      continue;
     i = b; j = e;
    addknight();
  }

 /* уменьшить счетчик ходов и попробовать сделать следующий ход */
  move_num-- ;

 /* освобождаем клетку, ранее занятую конем */
  arr[row[move_num]][col[move_num]] = 0;
  move_num--;  /* пробуем сделать следующий ход */
  i = row[move_num]; j = col[move_num];
  move_num++;
}

writeboard( ) {
  int a;

  clrscr( );
  gotoxy ( 1, 10 );
  printf ( "Hit any key for next move " );
  gotoxy ( 1, 11 );
  for ( a = 0 ; a <= 63 ; a++ ) {
    if ( a % 8 == 0 )
      printf ( "\n" );
    printf ( "#" );
  }
  for ( a = 0 ; a &lt;= 63 ; a++ ) {
    gotoxy ( col[a] * 3 + 1, 12 + row[a] );
    printf ( "%3d", a + 1 );
    getch( );
  }
}
