predicates
 uravn_run
 solve_uravn(real,real,real)
 diskr(real,real,real)
 mSin(real,real)
 mStep(real,real,real,real,real,real)
 sin_run
clauses
 uravn_run:-
   write("A="),
   readreal(A),
   write("B="),
   readreal(B),
   write("C="),
   readreal(C),
   solve_uravn(A,B,C).
 solve_uravn(A,B,C):-
   A=0,B<>0,write("A=0 -> X="), X = -C/B, write(X);
   A=0,B=0,write("No solution");
   A<>0,D=B*B-4*A*C,diskr(A,B,D).
 diskr(A,B,D):-
   D<0,write("D<0 -> No roots");
   D=0,X=-B/(2*A),write("D=0 -> X="),write(X);
   D>0,X1=(-B+sqrt(D))/(2*A),X2=(-B-sqrt(D))/(2*A),write("D>0 -> X1="),write(X1),write(" X2="),write(X2).
 sin_run:-
   write("X="),
   readreal(X),
   write("Eps="),
   readreal(Eps),
   mSin(X,Eps).
 mSin(X,Eps):-    
   Sum=0,
   mStep(Sum,X,X,1,1,Eps).
 mStep(Sum,X,Mn,I,Del,Eps):-
   S=Mn/Del,  
   abs(S)>=Eps,
   NextX=-X,   
   NextMn=Mn*NextX*X,   
   NextI=I+2,
   NextDel=Del*NextI*(I+1),          
   NextSum=Sum+S,
   mStep(NextSum,NextX,NextMn,NextI,NextDel,Eps);
   write(Sum).
   
   
   
      													
goal
  sin_run 