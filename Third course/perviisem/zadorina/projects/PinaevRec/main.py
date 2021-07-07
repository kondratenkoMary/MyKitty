import sys

code = ''
current_lexeme = 0
cur_value = None
cur_pos = 0
cur_state = 0

STARTS = 0

NONE = 0
POINTSEP = 1
ASSIGNSEP = 2
DOTCOMMASEP = 3
COMMASEP = 4
PLUSSEP = 5
EQSEP = 6
PROGRAMR = 7
WHERER = 8
IDENT = 9
NUMBERCONST = 10

SEPARATORS = [' ', '.', '->', ';', ',', '+','=']
RESERVED_WORDS = ['PROGRAM', 'WHERE']


def loadProgram(filename='input.txt'):
    global code
    code = ''
    f = open(filename)
    for line in f:
        code += ' ' + line.strip()
    f.close()


def isNumberConstant(s):
    f = True
    for c in s:
        f = f and '0' <= c <= '9'
    return f


def isIdentifier(s):
    f = 'A' <= s[0] <= 'Z'
    for c in s:
        f = f and ('A' <= c <= 'Z' or c == '_')
    return f


def analyzeStr(s):
    global current_lexeme, cur_value
    if s.upper() in RESERVED_WORDS:
        current_lexeme = PROGRAMR + RESERVED_WORDS.index(s.upper())
        cur_value = s
        return True
    if isNumberConstant(s):
        current_lexeme = NUMBERCONST
        cur_value = int(s)
        return True
    if isIdentifier(s.upper()):
        current_lexeme = IDENT
        cur_value = s
        return True
    return False


def GetLex():
    global current_lexeme, cur_pos, cur_value
    s = ''
    while cur_pos < len(code):
        ch = code[cur_pos]
        if cur_state == STARTS:
            if (ch in SEPARATORS) or (code[cur_pos:cur_pos + 2] in SEPARATORS):

                if len(s) > 0 and analyzeStr(s):
                    s = ''
                    return

                if ch in SEPARATORS:
                    x = SEPARATORS.index(ch)
                    cur_value = ch
                    cur_pos += 1
                else:
                    x = SEPARATORS.index(code[cur_pos:cur_pos + 2])
                    cur_value = code[cur_pos:cur_pos + 2]
                    cur_pos += 2
                current_lexeme = x
                if x != NONE:
                    return
            else:
                s += ch
                cur_pos += 1
    current_lexeme = NONE
    cur_value = None


def error(s):
    print('Ошибка:', s)
    sys.exit()

def slagaemoe():
    if current_lexeme == IDENT or current_lexeme == NUMBERCONST:
        GetLex()
    else:
        error('Некорректное выражение')


def expression():
    slagaemoe()
    if current_lexeme == PLUSSEP:
        GetLex()
        expression()


def statements():
    expression()
    if current_lexeme==ASSIGNSEP:
        GetLex()
        if current_lexeme==IDENT:
            GetLex()
            if current_lexeme==DOTCOMMASEP:
                GetLex()
                statements()
        else:
            error('Отсутствует идентификатор')
    else:
        error('Отсутствует присваивание')

def const():
    if current_lexeme==IDENT:
        GetLex()
        if current_lexeme==EQSEP:
            GetLex()
            if current_lexeme==NUMBERCONST:
                GetLex()
                if current_lexeme==COMMASEP:
                    GetLex()
                    const()
            else:
                error('Отсутствует числовая константа')
        else:
            error('Отсутствует =')
    else:
        error('Отсутствует идентификатор')

def value():
    if current_lexeme==WHERER:
        GetLex()
        const()
    else:
        error('Отсутствует Where')


def program():
    if current_lexeme == PROGRAMR:
        GetLex()
        if current_lexeme == IDENT:
            GetLex()
            statements()
            if current_lexeme != POINTSEP:
                value()
            if current_lexeme != POINTSEP:
                error('Нет точки в конце программы')
        else:
            error('Отсутствует название программы')
    else:
        error('Отсутствует Program')


def main():
    global cur_pos
    loadProgram()
    if len(code) <= 0:
        error('Программа пуста')
    cur_pos = 0
    GetLex()
    program()


if __name__ == '__main__':
    main()
