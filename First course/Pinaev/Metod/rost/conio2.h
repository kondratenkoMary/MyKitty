#pragma GCC diagnostic ignored "-Wnarrowing"

#ifndef _CONIO2_H_
#define _CONIO2_H_

#include <conio.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <windows.h>
#include <string.h>

/**
 * Colors which you can use in your application.
 */
typedef enum
{
    BLACK,          /**< black color */
    BLUE,           /**< blue color */
    GREEN,          /**< green color */
    CYAN,           /**< cyan color */
    RED,            /**< red color */
    MAGENTA,        /**< magenta color */
    BROWN,          /**< brown color */
    LIGHTGRAY,      /**< light gray color */
    DARKGRAY,       /**< dark gray color */
    LIGHTBLUE,      /**< light blue color */
    LIGHTGREEN,     /**< light green color */
    LIGHTCYAN,      /**< light cyan color */
    LIGHTRED,       /**< light red color */
    LIGHTMAGENTA,   /**< light magenta color */
    YELLOW,         /**< yellow color */
    WHITE           /**< white color */
} COLORS;

/*@{*/
/**
 * This defines enables you to use all MinGW conio.h functions without
 * underscore.
 */
#define cgets   _cgets
#define cprintf _cprintf
#define cputs   _cputs
#define cscanf  _cscanf

#ifdef UNICODE
    #define cgetws   _cgetws
    #define getwch   _getwch
    #define getwche  _getwche
    #define putwch   _putwch
    #define ungetwch _ungetwch
    #define cputws   _cputws
    #define cwprintf _cwprintf
    #define cwscanf  _cwscanf
#endif
/*@}*/

/**
 * Define alias for _conio_gettext.
 * If you want to use gettext function from some other library
 * (e.g. GNU gettext) you have to define _CONIO_NO_GETTEXT_ so you won't get
 * name conflict.
 */
#ifndef _CONIO_NO_GETTEXT_
  #define gettext _conio_gettext
#endif

#define ScreenClear clrscr

/**
 * @anchor cursortypes
 * @name Cursor types
 * Predefined cursor types. */
/*@{*/
#define _NOCURSOR 0         /**< no cursor */
#define _SOLIDCURSOR 100    /**< cursor filling whole cell */
#define _NORMALCURSOR 20    /**< cursor filling 20 percent of cell height */
/*@}*/

/**
 * Structure holding information about screen.
 * @see gettextinfo
 * @see inittextinfo
 */
struct text_info {
    unsigned char curx;          /**< cursor coordinate x */
    unsigned char cury;          /**< cursor coordinate y */
    unsigned short attribute;    /**< current text attribute */
    unsigned short normattr;     /**< original value of text attribute after
                                      start of the application. If you don't
                                      called the <TT>inittextinfo</TT> on the
                                      beginning of the application, this always
                                      will be black background and light gray
                                      foreground */
    unsigned char screenwidth;   /**< screen width */
    unsigned char screenheight;  /**< screen height */
};

/**
 * Structure used by gettext/puttext.
 * @see _conio_gettext
 * @see puttext
 */
struct char_info {
#ifdef UNICODE
    wchar_t letter;        /**< character value */
#else
    char letter;           /**< character value */
#endif
    unsigned short attr;   /**< attribute value */
};

/**
 * Returns information of the screen.
 * @see text_info
 */
void gettextinfo (struct text_info * info);

/**
 * Call this if you need real value of normattr attribute in the text_info
 * structure.
 * @see text_info
 */
void inittextinfo (void);

/**
 * Clears rest of the line from cursor position to the end of line without
 * moving the cursor.
 */
void clreol (void);

/**
 * Clears whole screen.
 */
void clrscr (void);

/**
 * Delete the current line (line on which is cursor) and then moves all lines
 * below one line up. Lines below the line are moved one line up.
 */
void delline (void);

/**
 * Insert blank line at the cursor position.
 * Original content of the line and content of lines below moves one line down.
 * The last line is deleted.
 */
void insline (void);

/**
 * Gets text from the screen. If you haven't defined <TT>_CONIO_NO_GETTEXT_</TT>
 * prior to including <TT>conio2.h</TT> you can use this function also under
 * the <TT>gettext</TT> name.
 * @see char_info
 * @see puttext
 * @param left Left coordinate of the rectangle, inclusive, starting from 1.
 * @param top Top coordinate of the rectangle, inclusive, starting from 1.
 * @param right Right coordinate of the rectangle, inclusive, starting from 1.
 * @param bottom Bottom coordinate of the rectangle, inclusive, starting from 1.
 * @param buf You have to pass buffer of size
 * <TT>(right - left + 1) * (bottom - top + 1) * sizeof(char_info)</TT>.
 */
void _conio_gettext (int left, int top, int right, int bottom,
                     struct char_info * buf);

/**
 * Puts text back to the screen.
 * @see char_info
 * @see _conio_gettext
 * @param left Left coordinate of the rectangle, inclusive, starting from 1.
 * @param top Top coordinate of the rectangle, inclusive, starting from 1.
 * @param right Right coordinate of the rectangle, inclusive, starting from 1.
 * @param bottom Bottom coordinate of the rectangle, inclusive, starting from 1.
 * @param buf You have to pass buffer of size
 * <TT>(right - left + 1) * (bottom - top + 1) * sizeof(char_info)</TT>.
 */
void puttext (int left, int top, int right, int bottom, struct char_info * buf);

/**
 * Copies text.
 * @param left Left coordinate of the rectangle, inclusive, starting from 1.
 * @param top Top coordinate of the rectangle, inclusive, starting from 1.
 * @param right Right coordinate of the rectangle, inclusive, starting from 1.
 * @param bottom Bottom coordinate of the rectangle, inclusive, starting from 1.
 * @param destleft Left coordinate of the destination rectangle.
 * @param desttop Top coordinate of the destination rectangle.
 */
void movetext (int left, int top, int right, int bottom, int destleft,
              int desttop);

/**
 * Moves cursor to the specified position.
 * @param x horizontal position
 * @param y vertical position
 */
void gotoxy(int x, int y);

/**
 * Puts string at the specified position.
 * @param x horizontal position
 * @param y vertical position
 * @param str string
 */
void cputsxy (int x, int y, char * str);

/**
 * Puts char at the specified position.
 * @param x horizontal position
 * @param y vertical position
 * @param ch char
 */
void putchxy (int x, int y, char ch);

/**
 * Sets the cursor type.
 * @see @ref cursortypes
 * @param type cursor type, under Win32 it is height of the cursor in percents
 */
void _setcursortype (int type);

/**
 * Sets attribute of text.
 * @param _attr new text attribute
 */
void textattr (int _attr);

/**
 * Sets text attribute back to value it had after program start.
 * It uses text_info's normattr value.
 * @see text_info
 */
void normvideo (void);

/**
 * Sets text background color.
 * @see COLORS
 * @param color new background color
 */
void textbackground (int color);

/**
 * Sets text foreground color.
 * @see COLORS
 * @param color new foreground color
 */
void textcolor (int color);

/**
 * Reads the cursor X position.
 * @returns cursor X position
 */
int wherex (void);

/**
 * Reads the cursor Y position.
 * @returns cursor Y position
 */
int wherey (void);

/**
 * Reads password. This function behaves like cgets.
 *
 * @see cgets
 * @param prompt prompt which will be displayed to user
 * @param str string for the password. <TT>str[0]</TT> have to contain
 * length of the <TT>str</TT> - 3
 * @returns <TT>&str[2]</TT>, the password will be stored in <TT>str</TT>
 * beginning at <TT>str[2]</TT>, in <TT>str[1]</TT> will be length of the
 * string without <TT>\\0</TT>, at <TT>str[2 + str[1]]</TT> will be \\0.
 */
char * getpass (const char * prompt, char * str);

/**
 * Makes foreground colors light.
 * If the current foreground color is less than <TT>DARKGRAY</TT> adds
 * 8 to the its value making dark colors light.
 * @see COLORS
 * @see lowvideo
 */
void highvideo (void);

/**
 * Makes foreground colors dark.
 * If the current foreground color is higher than <TT>LIGHTGRAY</TT> substracts
 * 8 from its value making light colors dark.
 * @see COLORS
 * @see highvideo
 */
void lowvideo (void);

/*@{*/
/** Link with libmsvcr70.a or libmsvcr70d.a or libmsvcr71.a or libmsvcr71d.a
 *  if you want any of these functions. */
#ifdef UNICODE
_CRTIMP wchar_t * __cdecl         _cgetws(wchar_t *);
_CRTIMP unsigned short __cdecl    _getwch(void);
_CRTIMP unsigned short __cdecl    _getwche(void);
_CRTIMP unsigned short __cdecl    _putwch(wchar_t);
_CRTIMP unsigned short __cdecl    _ungetwch(unsigned short);
_CRTIMP int __cdecl               _cputws(const wchar_t *);
_CRTIMP int __cdecl               _cwprintf(const wchar_t *, ...);
_CRTIMP int __cdecl               _cwscanf(const wchar_t *, ...);
#endif
/*@}*/






static int __BACKGROUND = BLACK;
static int __FOREGROUND = LIGHTGRAY;
static struct text_info __text_info = {
    1, 1,
    LIGHTGRAY + (BLACK << 4),
    LIGHTGRAY + (BLACK << 4),
    80, 25
};
static int __CONIO_TOP = 0;
static int __CONIO_LEFT = 0;

static void
__fill_text_info (void)
{
    CONSOLE_SCREEN_BUFFER_INFO info;

    GetConsoleScreenBufferInfo(GetStdHandle(STD_OUTPUT_HANDLE), &info);
    __CONIO_LEFT = info.srWindow.Left;
    __CONIO_TOP = info.srWindow.Top;
    __text_info.curx = info.dwCursorPosition.X - __CONIO_LEFT + 1;
    __text_info.cury = info.dwCursorPosition.Y - __CONIO_TOP  + 1;
    __text_info.attribute = info.wAttributes;
    __text_info.screenwidth  = info.srWindow.Right - info.srWindow.Left + 1;
    __text_info.screenheight = info.srWindow.Bottom - info.srWindow.Top + 1;
}

void
gettextinfo (struct text_info * info)
{
    __fill_text_info();
    *info = __text_info;
}

void
inittextinfo (void)
{
    CONSOLE_SCREEN_BUFFER_INFO info;

    GetConsoleScreenBufferInfo (GetStdHandle(STD_OUTPUT_HANDLE), &info);
    __text_info.normattr = info.wAttributes;
}

void
clrscr (void)
{
    DWORD written;
    int i;

    __fill_text_info();
    for (i = __CONIO_TOP; i < __CONIO_TOP + __text_info.screenheight; i++) {
      FillConsoleOutputAttribute (GetStdHandle (STD_OUTPUT_HANDLE),
        __FOREGROUND + (__BACKGROUND << 4), __text_info.screenwidth,
        (COORD) {__CONIO_LEFT, i},
        &written);
      FillConsoleOutputCharacter (GetStdHandle(STD_OUTPUT_HANDLE), ' ',
        __text_info.screenwidth,
        (COORD) {__CONIO_LEFT, i},
        &written);
    }
    gotoxy (1, 1);
}


void
clreol (void)
{
    COORD coord;
    DWORD written;

    __fill_text_info();
    coord.X = __CONIO_LEFT + __text_info.curx - 1;
    coord.Y = __CONIO_TOP  + __text_info.cury - 1;

    FillConsoleOutputCharacter (GetStdHandle (STD_OUTPUT_HANDLE),
      ' ', __text_info.screenwidth - __text_info.curx + 1, coord, &written);
    gotoxy (__text_info.curx, __text_info.cury);
}


void
delline (void)
{
    COORD coord;
    SMALL_RECT rect;
    CHAR_INFO fillchar;

    __fill_text_info();
    coord.X = __CONIO_LEFT;
    coord.Y = __CONIO_TOP + __text_info.cury - 1;
    rect.Left = __CONIO_LEFT;
    rect.Top = __CONIO_TOP + __text_info.cury;
    rect.Right = __CONIO_LEFT + __text_info.screenwidth - 1;
    rect.Bottom = __CONIO_TOP + __text_info.screenheight - 1;
    fillchar.Attributes = __FOREGROUND + (__BACKGROUND << 4);
#ifdef UNICODE
    fillchar.Char.UnicodeChar = L' ';
    ScrollConsoleScreenBufferW (GetStdHandle (STD_OUTPUT_HANDLE),
      &rect, NULL, coord, &fillchar);
#else
    fillchar.Char.AsciiChar = ' ';
    ScrollConsoleScreenBufferA (GetStdHandle (STD_OUTPUT_HANDLE),
      &rect, NULL, coord, &fillchar);
#endif


    gotoxy (__text_info.curx, __text_info.cury);
}

void
insline (void)
{
    COORD coord;
    SMALL_RECT rect;
    CHAR_INFO fillchar;

    __fill_text_info();
    coord.X = __CONIO_LEFT;
    coord.Y = __CONIO_TOP + __text_info.cury;
    rect.Left = __CONIO_LEFT;
    rect.Top = __CONIO_TOP + __text_info.cury - 1;
    rect.Right = __CONIO_LEFT + __text_info.screenwidth - 1;
    rect.Bottom = __CONIO_TOP + __text_info.screenheight - 2;
    fillchar.Attributes = __FOREGROUND + (__BACKGROUND << 4);
#ifdef UNICODE
    fillchar.Char.UnicodeChar = L' ';
    ScrollConsoleScreenBufferW (GetStdHandle (STD_OUTPUT_HANDLE),
      &rect, NULL, coord, &fillchar);
#else
    fillchar.Char.AsciiChar = ' ';
    ScrollConsoleScreenBufferA (GetStdHandle (STD_OUTPUT_HANDLE),
      &rect, NULL, coord, &fillchar);
#endif

    gotoxy (__text_info.curx, __text_info.cury);
}

void
movetext (int left, int top, int right, int bottom, int destleft, int desttop)
{
    struct char_info * buffer;

    buffer = (char_info*)malloc ((right - left + 1) * (bottom - top + 1) * sizeof(struct char_info));
    gettext (left, top, right, bottom, buffer);
    puttext (destleft, desttop, destleft + right - left, desttop + bottom - top, buffer);
    free(buffer);
}

#define __CALC_POS(i, j) (i * size.X + j)

void
_conio_gettext (int left, int top, int right, int bottom,
  struct char_info * buf)
{
    int i, j, n;
    SMALL_RECT r;
    CHAR_INFO* buffer;
    COORD size;

    __fill_text_info();
    r = (SMALL_RECT) {__CONIO_LEFT + left - 1, __CONIO_TOP + top - 1,
      __CONIO_LEFT + right - 1, __CONIO_TOP + bottom - 1};
    size.X = right - left + 1;
    size.Y = bottom - top + 1;
    buffer = (CHAR_INFO*) malloc (size.X * size.Y * sizeof(CHAR_INFO));

    ReadConsoleOutput (GetStdHandle (STD_OUTPUT_HANDLE),
      (PCHAR_INFO) buffer, size, (COORD) {0, 0}, &r);

    for (i = n = 0; i < size.Y; i++)
    for (j = 0; j < size.X; j++)
    {
#ifdef UNICODE
        buf[n].letter = buffer[__CALC_POS(i, j)].Char.UnicodeChar;
#else
        buf[n].letter = buffer[__CALC_POS(i, j)].Char.AsciiChar;
#endif
        buf[n].attr = buffer[__CALC_POS(i, j)].Attributes;
        n++;
    }
    free (buffer);
}

void
puttext (int left, int top, int right, int bottom, struct char_info * buf)
{
    int i, j, n;
    SMALL_RECT r;
    CHAR_INFO* buffer;
    COORD size;

    __fill_text_info();
    r = (SMALL_RECT) {__CONIO_LEFT + left - 1, __CONIO_TOP + top - 1,
      __CONIO_LEFT + right - 1, __CONIO_TOP + bottom - 1};
    size.X = right - left + 1;
    size.Y = bottom - top + 1;
    buffer = (CHAR_INFO*)malloc (size.X * size.Y * sizeof(CHAR_INFO));

    for (i = n = 0; i < size.Y; i++)
    for (j = 0; j < size.X; j++)
    {
#ifdef UNICODE
        buffer[__CALC_POS(i, j)].Char.UnicodeChar = buf[n].letter;
#else
        buffer[__CALC_POS(i, j)].Char.AsciiChar = buf[n].letter;
#endif
        buffer[__CALC_POS(i, j)].Attributes = buf[n].attr;
        n++;
    }

    WriteConsoleOutput (GetStdHandle (STD_OUTPUT_HANDLE),
      buffer, size, (COORD) {0, 0}, &r);
    free (buffer);
}

void
gotoxy(int x, int y)
{
  COORD c;

  c.X = __CONIO_LEFT + x - 1;
  c.Y = __CONIO_TOP  + y - 1;
  SetConsoleCursorPosition (GetStdHandle(STD_OUTPUT_HANDLE), c);
}

void
cputsxy (int x, int y, char * str)
{
    gotoxy (x, y);
    cputs (str);
}

void
putchxy (int x, int y, char ch)
{
    gotoxy (x, y);
    putch (ch);
}

void
_setcursortype (int type)
{
    CONSOLE_CURSOR_INFO Info;

    if (type == 0) {
        Info.bVisible = FALSE;
    } else {
      Info.dwSize = type;
      Info.bVisible = TRUE;
    }
    SetConsoleCursorInfo (GetStdHandle (STD_OUTPUT_HANDLE),
      &Info);
}


void
textattr (int _attr)
{
    __FOREGROUND = _attr & 0xF;
    __BACKGROUND = _attr >> 4;
    SetConsoleTextAttribute (GetStdHandle(STD_OUTPUT_HANDLE), _attr);
}

void
normvideo (void)
{
    textattr (__text_info.normattr);
}

void
textbackground (int color)
{
    __BACKGROUND = color;
    SetConsoleTextAttribute (GetStdHandle (STD_OUTPUT_HANDLE),
      __FOREGROUND + (color << 4));
}


void
textcolor (int color)
{
    __FOREGROUND = color;
    SetConsoleTextAttribute (GetStdHandle (STD_OUTPUT_HANDLE),
      color + (__BACKGROUND << 4));
}


int
wherex (void)
{
    __fill_text_info();
    return __text_info.curx;
}


int
wherey (void)
{
    __fill_text_info();
    return __text_info.cury;
}

char *
getpass (const char * prompt, char * str)
{
    int maxlength = str[0];
    int length = 0;
    int ch = 0;
    int x, y;

    cputs(prompt);
    __fill_text_info();
    x = __text_info.curx;
    y = __text_info.cury;

    while (ch != '\r') {
        ch = getch();
        switch (ch) {
            case '\r' : /* enter */
                break;
            case '\b' : /* backspace */
                if (length > 0) putchxy (x + --length, y, ' ');
                gotoxy (x + length, y);
                break;
            default:
                if (length < maxlength) {
                    putchxy (x + length, y, '*');
                    str[2 + length++] = ch;
                }
        }
    }

    str[1] = length;
    str[2 + length] = '\0';
    return &str[2];
}

void
highvideo (void)
{
    if (__FOREGROUND < DARKGRAY) textcolor(__FOREGROUND + 8);
}

void
lowvideo (void)
{
    if (__FOREGROUND > LIGHTGRAY) textcolor(__FOREGROUND - 8);
}

#endif /* _CONIO2_H_ */
