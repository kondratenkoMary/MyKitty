from numpy import linalg

a = [[2,5],
     [4,2]]

b = [9,9]

X = []

FMAX = None

def f(x1,x2):
    return 3*x1+2*x2

def ogr1(x1,x2):
    return 2*x1+5*x2

def ogr2(x1,x2):
    return 4*x1+2*x2

def rec(x1,x2,i):
    global X,FMAX
    if x1!=-1 and x2!=-1:
        #Есть решение и оно лучше
        if ogr1(x1,x2)<=9 and ogr2(x1,x2)<=9 and (FMAX==None or f(x1,x2)>FMAX):
            X = [x1,x2]
            FMAX = f(x1,x2)
            return
        else:
            if ogr1(x1, x2) > 9 or ogr2(x1, x2) > 9:
                #Нет решения
                return
    #Ищем x2
    if i==1:
        t1 = (9-2*x1)/5
        t2 = (9-4*x1)/2
        t = min(t1,t2)
    #x1:
    else:
        t1 = (9-5*x2)/2
        t2 = (9-2*x2)/4
        t = min(t1,t2)
    if t<=1:
        return

    if i==1:
        rec(x1,int(t),2)
        rec(x1,int(t)+1,2)
    else:
        rec(int(t),x2,1)
        rec(int(t)+1,x2,1)

def solve(a,b):
    global X,FMAX
    x = linalg.solve(a,b)
    if int(x[0])==x[0] or int(x[1])==x[1]:
        X = x
        FMAX = f(x[0],x[1])
    else:
        if int(x[0])!=x[0]:
            rec(int(x[0]),-1,1)
            rec(int(x[0])+1,-1,1)
        else:
            rec(-1,int(x[1]),2)
            rec(-1,int(x[1]),2)



def main():
    solve(a,b)
    print('x1=',X[0]+1,sep='')
    print('x2=',X[1]-1,sep='')
    print('f(x,x1,x2)=',FMAX+1,sep='')

if __name__=='__main__':
    main()