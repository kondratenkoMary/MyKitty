N = 3
W = 6
w = [0, 1, 2, 3]
r = [0, 70, 20, 40]
# N= 3
# W = 6
# w = [0,4,1,2]
# r = [0, 70, 20, 40]
d = [[0 for _ in range(W + 1)] for _ in range(N + 1)]

def answer():
    c = W
    i = N
    res = [0,0,0,0]
    while i > 0 and c > 0:
        if d[i][c] != d[i - 1][c]:
            if (d[i][c] - d[i - 1][c]) % r[i] == 0:
                res[i]+=(d[i][c] - d[i - 1][c]) // r[i]
                c -= w[i]
                i -= 1
            else:
                res[i] += (d[i][c] - d[i][c - w[i]]) // r[i]
                c -= w[i]
        else:
            i -= 1
    for i in range(1,4):
        print(i,res[i])

def main():
    for i in range(1,N+1):
        for c in range(W + 1):
            if c<w[i]:
                d[i][c] = d[i-1][c]
            else:
                d[i][c] = max(d[i-1][c],d[i][c-w[i]]+r[i])
    print('Max:')
    print(d[N][W])
    print('Предметы:')
    answer()

if __name__=='__main__':
    main()
