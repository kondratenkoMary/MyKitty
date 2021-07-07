from queue import Queue

# Запасы
Ai = [22, 13, 17, 18]
# Потребности
Bj = [7, 7, 7, 7, 42]
# Стоимость
price = [[9, 17, 29, 28, 8],
         [13, 21, 27, 16, 29],
         [20, 30, 24, 7, 26],
         [11, 19, 30, 6, 2]]


# Найти минимальную цену
def getMin(price):
    mini, minj = -1, -1
    for i in range(len(price)):
        for j in range(len(price[0])):
            if price[i][j] >= 0 and (mini == -1 or price[i][j] < price[mini][minj]):
                mini, minj = i, j
    return mini, minj

# Вычислить значение целевой функции
def processPlan(price, plan):
    s = 0
    for i in range(len(price)):
        for j in range(len(price[0])):
            if plan[i][j] > 0:
                s += price[i][j] * plan[i][j]
    return s

# Построение опорного плана методом наименьшей стоимости
def buildStartPlan(a, b, price):
    plan = [[-1 for x in range(5)] for y in range(4)]
    mi, mj = None, None
    while mi != -1:
        mi, mj = getMin(price)
        if a[mi] < b[mj]:
            if a[mi] != 0:
                plan[mi][mj] = a[mi]
            else:
                plan[mi][mj] = -1
            b[mj] -= a[mi]
            for j in range(5):
                price[mi][j] = -1
            a[mi] = 0
        else:
            if b[mj] != 0:
                plan[mi][mj] = b[mj]
            a[mi] -= b[mj]
            for i in range(4):
                price[i][mj] = -1
            b[mj] = 0
    return plan


# Проверка вырожденности плана
def isDegenerate(plan):
    s = 0
    for x in plan:
        for y in x:
            if y > 0:
                s += 1
    return s != len(price) + len(price[0]) - 1

# Проверка оптимальности плана
def isOptimal(plan, price, u, v):
    mi, mj = 0, 0
    result = True
    for i in range(len(price)):
        for j in range(len(price[0])):
            if plan[i][j] == -1 and u[i] + v[j] > price[i][j]:
                if u[i] + v[j] - price[i][j] > u[mi] + v[mj] - price[mi][mj]:
                    mi, mj = i, j
                result = False
    return result, mi, mj


# Вычислить потенциалы u и v
def getPotentials(plan, price):
    u = [None for x in range(len(price))]
    v = [None for x in range(len(price[0]))]
    u[0] = 0
    q = Queue()
    for i in range(len(price)):
        q.put(i)
    while not q.empty():
        i = q.get()
        if u[i] is None:
            f = True
            for j in range(len(price[0])):
                if plan[i][j] >= 0 and v[j] is not None:
                    u[i] = price[i][j] - v[j]
                    f = False
            if f:
                q.put(i)
                continue
        for j in range(len(price[0])):
            if plan[i][j] >= 0:
                v[j] = price[i][j] - u[i]
    return u, v

# Проверка границ матрицы
def inMap(i, j):
    return 0 <= i <= 3 and 0 <= j <= 4

def isPovorot(i1, j1, i2, j2, i3, j3):
    return not (i1 == i2 == i3 or j1 == j2 == j3)

# Построение цикла
def buildPerem(plan, mi, mj):
    di = [0, 1, 0, -1]
    dj = [1, 0, -1, 0]
    q = Queue()
    q.put((mi, mj, [(mi, mj)]))
    while not q.empty():
        wi, wj, l = q.get()
        for z in range(4):
            x = 1
            while inMap(wi + di[z] * x, wj + dj[z] * x):
                qi, qj = wi + di[z] * x, wj + dj[z] * x
                if qi == mi and qj == mj and (len(l) < 2 or (isPovorot(qi, qj, wi, wj, l[-2][0], l[-2][1]))):
                    return l
                if plan[qi][qj] != -1 and not (qi, qj) in l and (
                        len(l) < 2 or (isPovorot(qi, qj, wi, wj, l[-2][0], l[-2][1]))):
                    q.put((qi, qj, l + [(qi, qj)]))
                x += 1


# Изменение коэффициентов в цикле
def handlePerem(plan, l):
    bi0 = -1
    bj0 = -1
    i0 = -1
    j0 = -1
    for i in range(4):
        for j in range(5):
            if plan[i][j] == 0:
                bi0 = i
                bj0 = j
    count = 0
    mx = 1
    for x in range(1, len(l), 2):
        if plan[l[x][0]][l[x][1]] < plan[l[mx][0]][l[mx][1]]:
            mx = x
    m = plan[l[mx][0]][l[mx][1]]
    sign = 1
    for x in range(len(l)):
        if plan[l[x][0]][l[x][1]] == -1:
            plan[l[x][0]][l[x][1]] += 1 + (sign * m)
        else:
            plan[l[x][0]][l[x][1]] += sign * m
        sign *= -1
    for i in range(4):
        for j in range(5):
            if plan[i][j] != -1:
                count += 1
            if plan[i][j] == 0:
                i0 = i
                j0 = j
    if count > 8:
        if bi0 != -1 and bj0 != -1:
            plan[bi0][bj0] = -1
        else:
            plan[i0][j0] = -1
    return plan


def printResult(price, plan, ai, bj):
    from tabulate import tabulate
    header = [''] + ['B' + str(i) for i in range(1, 6)] + ['Запасы']
    table = []
    for i in range(4):
        row = ['A' + str(i)]
        for j in range(5):
            if plan[i][j] >= 0:
                row += [str(price[i][j]) + '[' + str(plan[i][j]) + ']']
            else:
                row += [str(price[i][j])]
        row.append(ai[i])
        table.append(row)
    table.append(['Потребности'] + [bj[j] for j in range(5)] + [''])
    print(tabulate(table, header, tablefmt='plain'))


def main():
    if sum(Ai) != sum(Bj):
        print('Сумма запасов и потребностей не совпадает')
        return
    # Построение опорного плана
    import copy
    plan = buildStartPlan(Ai[:], Bj[:], copy.deepcopy(price))
    printResult(price, plan, Ai, Bj)
    print('Значение целевой функции при опорном плане:', processPlan(price, plan))
    if isDegenerate(plan):
        print('Опорный план вырожденный')
        return
    while True:
        # Вычисление потенциалов
        u, v = getPotentials(plan, price)
        # Проверка оптимальности
        r, mi, mj = isOptimal(plan, price, u, v)
        if r:
            break
        # Вычисление нового плана
        plan = handlePerem(plan, buildPerem(plan, mi, mj))
    printResult(price, plan, Ai, Bj)
    print('Значение целевой функции при оптимальном плане:', processPlan(price, plan))


if __name__ == '__main__':
    main()
