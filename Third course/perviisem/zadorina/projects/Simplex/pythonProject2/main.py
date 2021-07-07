A = [10, 6, 3]
B = [2.5, 2.5, 2]
C = [9, 0.2, 0.3]
summa = [0 for _ in range(3)]
mA = [[0 for _ in range(3)] for _ in range(3)]  # Матрицы
mB = [[0 for _ in range(3)] for _ in range(3)]
mC = [[0 for _ in range(3)] for _ in range(3)]
sA = [0 for _ in range(3)]  # Суммы столбцов
sB = [0 for _ in range(3)]
sC = [0 for _ in range(3)]


def main():
    for i in range(3):
        summa[i] = A[i] + B[i] + C[i]
    for i in range(3):
        A[i] /= summa[0]
        B[i] /= summa[1]
        C[i] /= summa[2]
    for i in range(3):
        for j in range(3):
            mA[i][j] = A[j] / A[i]
            mB[i][j] = B[j] / B[i]
            mC[i][j] = C[j] / C[i]
    for i in range(3):
        sA[i] = 0
        sB[i] = 0
        sC[i] = 0
        for j in range(3):
            sA[i] += mA[j][i]
            sB[i] += mB[j][i]
            sC[i] += mC[j][i]
    for i in range(3):
        for j in range(3):
            mA[j][i] /= sA[i]
            mB[j][i] /= sB[i]
            mC[j][i] /= sC[i]
    for i in range(3):
        for j in range(3):
            print('{:.4f}'.format(mA[i][j]), end=' ')
        print()
    print()
    for i in range(3):
        for j in range(3):
            print('{:.4f}'.format(mB[i][j]), end=' ')
        print()
    print()
    for i in range(3):
        for j in range(3):
            print('{:.4f}'.format(mC[i][j]), end=' ')
        print()


if __name__ == '__main__':
    main()
