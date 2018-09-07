#pragma GCC diagnostic ignored "-Wwrite-strings"

#define WIN32_LEAN_AND_MEAN
#define _WIN32_WINNT 0x0500

#include <windows.h>
#include <stdio.h>
#include <iostream>
using namespace std;
#define WM_SETCONSOLEINFO (WM_USER+201)
#pragma pack(push, 1)
typedef struct _CONSOLE_INFO
{
  ULONG Length;
 COORD ScreenBufferSize;
 COORD WindowSize;
 ULONG WindowPosX;
 ULONG WindowPosY;
 COORD FontSize;
 ULONG FontFamily;
 ULONG FontWeight;
 WCHAR FaceName[32];
 ULONG CursorSize;
 ULONG FullScreen;
 ULONG QuickEdit;
 ULONG AutoPosition;
 ULONG InsertMode;
 USHORT ScreenColors;
 USHORT PopupColors;
 ULONG HistoryNoDup;
 ULONG HistoryBufferSize;
 ULONG NumberOfHistoryBuffers;
 COLORREF ColorTable[16];
 ULONG CodePage;
 HWND Hwnd;
 WCHAR ConsoleTitle[0x100];
 } CONSOLE_INFO;
#pragma pack(pop)

typedef struct CONSOLE_FONT
{
  DWORD index;
  COORD dimension;
} CONSOLE_FONT;

typedef struct _M__CONSOLE_FONT_INFOEX {
  ULONG cbSize;
  DWORD nFont;
  COORD dwFontSize;
  UINT  FontFamily;
  UINT  FontWeight;
  WCHAR FaceName[LF_FACESIZE];
} _M_CONSOLE_FONT_INFOEX, *_M_PCONSOLE_FONT_INFOEX;

typedef struct _M__CONSOLE_SCREEN_BUFFER_INFOEX {
  ULONG      cbSize;
  COORD      dwSize;
  COORD      dwCursorPosition;
  WORD       wAttributes;
  SMALL_RECT srWindow;
  COORD      dwMaximumWindowSize;
  WORD       wPopupAttributes;
  BOOL       bFullscreenSupported;
  COLORREF   ColorTable[16];
} _M_CONSOLE_SCREEN_BUFFER_INFOEX, *_M_PCONSOLE_SCREEN_BUFFER_INFOEX;

typedef BOOL (WINAPI *PGetCurrentConsoleFontEx)(HANDLE hConsoleOutput, BOOL bMaximumWindow, _M_PCONSOLE_FONT_INFOEX lpConsoleCurrentFontEx);
typedef BOOL (WINAPI *PSetCurrentConsoleFontEx)(HANDLE hConsoleOutput, BOOL bMaximumWindow, _M_PCONSOLE_FONT_INFOEX lpConsoleCurrentFontEx);
typedef BOOL (WINAPI *PGetConsoleScreenBufferInfoEx)(HANDLE hConsoleOutput, _M_PCONSOLE_SCREEN_BUFFER_INFOEX lpConsoleScreenBufferInfoEx);
typedef BOOL (WINAPI *PSetConsoleScreenBufferInfoEx)(HANDLE hConsoleOutput, _M_PCONSOLE_SCREEN_BUFFER_INFOEX lpConsoleScreenBufferInfoEx);

typedef BOOL (WINAPI *PSetConsoleFont)(HANDLE, DWORD);
typedef BOOL (WINAPI *PGetConsoleFontInfo)(HANDLE, BOOL, DWORD, CONSOLE_FONT*);
typedef int (WINAPI *PGetNumberOfConsoleFonts)();

BOOL SetConsoleInfo(HWND hwndConsole, CONSOLE_INFO *pci);
VOID WINAPI SetConsoleFont(int fontX, int fontY, wchar_t *fontName);
static void GetConsoleSizeInfo(CONSOLE_INFO *pci, HANDLE hOutput);
int windowsVersionTest(void);

/******************************************************************************
  main

  Creates a palette with the default colors and changes font size.
******************************************************************************/
void set_locale(int cp)
{
  SetConsoleFont(8, 12, L"Lucida Console");
  SetConsoleCP(cp);
  SetConsoleOutputCP(cp);
}

void setRusLocale()
{
  set_locale(1251);
}

/******************************************************************************
  windowsVersionTest

  Checks to see if have Vista/7 or earlier by attempting to retrieve function
  from kernel32.dll that is only available in Vista+ version of Windows.
******************************************************************************/
int windowsVersionTest(void)
{
    /* Retrieving pointers for Windows Vista/7 Functions */
  PGetCurrentConsoleFontEx pGetCurrentConsoleFontEx = (PGetCurrentConsoleFontEx)
    GetProcAddress(GetModuleHandle("kernel32.dll"), "GetCurrentConsoleFontEx");

    /* If exists then we have Vita/7 */
  if (pGetCurrentConsoleFontEx)
  {
    return 1;
  }
  else
  {
    return 0;
  }
}

/******************************************************************************
  SetConsolePalette

  Sets the console palette and font size.
******************************************************************************/
VOID WINAPI SetConsoleFont(int fontX, int fontY, wchar_t *fontName)
{
  HANDLE hOutput = GetStdHandle(STD_OUTPUT_HANDLE);

    /* Retrieving pointers for Windows Vista/7 Functions */
  PGetCurrentConsoleFontEx pGetCurrentConsoleFontEx = (PGetCurrentConsoleFontEx)
    GetProcAddress(GetModuleHandle("kernel32.dll"), "GetCurrentConsoleFontEx");
  PSetCurrentConsoleFontEx pSetCurrentConsoleFontEx = (PSetCurrentConsoleFontEx)
    GetProcAddress(GetModuleHandle("kernel32.dll"), "SetCurrentConsoleFontEx");
  PGetConsoleScreenBufferInfoEx pGetConsoleScreenBufferInfoEx = (PGetConsoleScreenBufferInfoEx)
    GetProcAddress(GetModuleHandle("kernel32.dll"), "GetConsoleScreenBufferInfoEx");
  PSetConsoleScreenBufferInfoEx pSetConsoleScreenBufferInfoEx = (PSetConsoleScreenBufferInfoEx)
    GetProcAddress(GetModuleHandle("kernel32.dll"), "SetConsoleScreenBufferInfoEx");

    /* Check for pointers: if they exist, we have Vista/7 and we can use them */
  if (pGetCurrentConsoleFontEx && pSetCurrentConsoleFontEx &&
      pGetConsoleScreenBufferInfoEx && pSetConsoleScreenBufferInfoEx)
  {
    _M_CONSOLE_FONT_INFOEX cfi = {sizeof(_M_CONSOLE_FONT_INFOEX)};

      /* Tell the font info how big it is, to avoid memory corruption */
    cfi.cbSize = sizeof(_M_CONSOLE_FONT_INFOEX);
    pGetCurrentConsoleFontEx(hOutput, TRUE, &cfi);

      /* Set the font type to name indicated by wide string literal */
      /* Set to 0 to keep current settings */
    lstrcpyW(cfi.FaceName, fontName);
    cfi.dwFontSize.X = fontX;
    cfi.dwFontSize.Y = fontY;
    cfi.FontFamily = 0; /* Set to 0x30 for Terminal font */
    cfi.FontWeight = 0;

      /* Set the console font info */
    pSetCurrentConsoleFontEx(hOutput, TRUE, &cfi);
  }
  else  /* We don't have access to the vista functions */
  {
	COLORREF palette[16] =
	{
		0x00000000, 0x00800000, 0x00008000, 0x00808000,
		0x00000080, 0x00800080, 0x00008080, 0x00c0c0c0,
		0x00808080, 0x00ff0000, 0x0000ff00, 0x00ffff00,
		0x000000ff, 0x00ff00ff, 0x0000ffff, 0x00ffffff
	};
    int i;
    CONSOLE_INFO ci = { sizeof(ci) };
    HWND hwndConsole = GetConsoleWindow();

    GetConsoleSizeInfo(&ci, hOutput);

      /* Set to 0 to keep current settings */
    ci.FontSize.X = fontX;
    ci.FontSize.Y = fontY;
    ci.FontFamily = 0; /* Set to 0x30 for Terminal font */
    ci.FontWeight = 0;

    lstrcpyW(ci.FaceName, fontName);
    ci.CursorSize = 100;
    ci.FullScreen = FALSE;
    ci.QuickEdit = FALSE;
    ci.AutoPosition = 0x10000;
    ci.InsertMode = TRUE;
    ci.ScreenColors = MAKEWORD(0x7, 0x0);
    ci.PopupColors = MAKEWORD(0x5, 0xf);
    ci.HistoryNoDup = TRUE;
    ci.HistoryBufferSize = 50;
    ci.NumberOfHistoryBuffers = 4;

    for(i = 0; i < 16; i++)
    {
      ci.ColorTable[i] = palette[i];
    }

    ci.CodePage = 0;
    ci.Hwnd = hwndConsole;
    lstrcpyW(ci.ConsoleTitle, L"");

    SetConsoleInfo(hwndConsole, &ci);
  }
}

/******************************************************************************
  GetConsoleSizeInfo (XP only)

  Fills up some info about the console font in the CONSOLE_INFO struct.
******************************************************************************/
static void GetConsoleSizeInfo(CONSOLE_INFO *pci, HANDLE hOutput)
{
  CONSOLE_SCREEN_BUFFER_INFO csbi;

  GetConsoleScreenBufferInfo(hOutput, &csbi);
  pci->ScreenBufferSize = csbi.dwSize;
  pci->WindowSize.X = csbi.srWindow.Right - csbi.srWindow.Left + 1;
  pci->WindowSize.Y = csbi.srWindow.Bottom - csbi.srWindow.Top + 1;
  pci->WindowPosX = csbi.srWindow.Left;
  pci->WindowPosY = csbi.srWindow.Top;
}

/******************************************************************************
  SetConsoleInfo (XP only)

  Ends up sending a message to windows to reset the console info.
******************************************************************************/
BOOL SetConsoleInfo(HWND hwndConsole, CONSOLE_INFO *pci)
{
  DWORD dwConsoleOwnerPid;
  HANDLE hProcess;
  HANDLE hSection, hDupSection;
  PVOID ptrView = 0;
  HANDLE hThread;

  /* Open the process which "owns" the console */
  GetWindowThreadProcessId(hwndConsole, &dwConsoleOwnerPid);
  hProcess = OpenProcess(MAXIMUM_ALLOWED, FALSE, dwConsoleOwnerPid);


  /* Create a SECTION object backed by page-file, then map a view of  */
  /* this section into the owner process so we can write the contents  */
  /* of the CONSOLE_INFO buffer into it  */
  hSection = CreateFileMapping(INVALID_HANDLE_VALUE, 0, PAGE_READWRITE, 0, pci->Length, 0);


  /* Copy our console structure into the section-object */
  ptrView = MapViewOfFile(hSection, FILE_MAP_WRITE|FILE_MAP_READ, 0, 0, pci->Length);
  memcpy(ptrView, pci, pci->Length);
  UnmapViewOfFile(ptrView);


  /* Map the memory into owner process  */
  DuplicateHandle(GetCurrentProcess(), hSection, hProcess, &hDupSection, 0, FALSE, DUPLICATE_SAME_ACCESS);

  /* Send console window the "update" message WM_SETCONSOLEINFO */
  SendMessage(hwndConsole, WM_SETCONSOLEINFO, (WPARAM)hDupSection, 0);

  /*clean up */
  hThread = CreateRemoteThread(hProcess, 0, 0, (LPTHREAD_START_ROUTINE)CloseHandle, hDupSection, 0, 0);
  CloseHandle(hThread);
  CloseHandle(hSection);
  CloseHandle(hProcess);
  return TRUE;
}
