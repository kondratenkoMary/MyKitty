public class Simplex {

    private double[][] tableaux; // таблица
    private int numberOfConstraints; // количество ограничений
    private int numberOfOriginalVariables; // количество исходных переменных

    private boolean maximizeOrMinimize;

    private static final boolean MAXIMIZE = true;
    private static final boolean MINIMIZE = false;
    private int[] basis; // basis[i] = базовая переменная, соответствующая строке i

    public Simplex(double[][] tableaux, int numberOfConstraint,
    int numberOfOriginalVariable, boolean maximizeOrMinimize) {
    this.maximizeOrMinimize = maximizeOrMinimize;
    this.numberOfConstraints = numberOfConstraint;
    this.numberOfOriginalVariables = numberOfOriginalVariable;
    this.tableaux = tableaux; basis = new int[numberOfConstraints];
    for (int i = 0; i < numberOfConstraints; i++)
        basis[i] = numberOfOriginalVariables + i;
    solve();
    }

// запускаем симплексный алгоритм, начиная с начальной BFS
    private void solve() {
        while (true) {
            show();
            int q = 0;
            // найти входящий столбец q
            if (maximizeOrMinimize) {
                q = dantzig();
                } else {
                    q = dantzigNegative();
                        } if (q == -1) break; // оптимальный
            // найти выходящую строку p
            int p = minRatioRule(q);
            if (p == -1)
                throw new ArithmeticException("Линейная программа не ограничена");
            // пересечение
            pivot(p, q);
            // обновляем базу
            basis[p] = q;
        }
    }

// индекс неосновного столбца с наибольшей положительной стоимостью
private int dantzig() {
    int q = 0;
    for (int j = 1; j < numberOfConstraints + numberOfOriginalVariables; j++)
        if (tableaux[numberOfConstraints][j] > tableaux[numberOfConstraints][q])
            q = j;
    if (tableaux[numberOfConstraints][q] <= 0)
        return -1; // оптимальный
        else
            return q;
}

// индекс неосновного столбца с наибольшей отрицательной стоимостью
private int dantzigNegative() {
    int q = 0;
    for (int j = 1; j < numberOfConstraints + numberOfOriginalVariables; j++)
        if (tableaux[numberOfConstraints][j] < tableaux[numberOfConstraints][q])
            q = j;
        if (tableaux[numberOfConstraints][q] >= 0)
            return -1; // оптимальный
             else
                 return q;
}

// найти строку p, используя правило минимального отношения (-1, если такой строки не
private int minRatioRule(int q) {
    int p = -1;
    for (int i = 0; i < numberOfConstraints; i++) {
        if (tableaux[i][q] <= 0)
            continue;
            else if (p==-1)
                p=i;
            else if ((tableaux[i][numberOfConstraints
                + numberOfOriginalVariables] / tableaux[i][q]) < (tableaux[p][numberOfConstraints
                + numberOfOriginalVariables] / tableaux[p][q]))
                p=i;
    }
    return p;
}

// поворот на входе (p, q) с использованием исключения Гаусса-Джордан
private void pivot(int p, int q){
    // все, кроме строки p и столбца q
    for (int i = 0; i <= numberOfConstraints; i++)
        for (int j = 0; j <= numberOfConstraints + numberOfOriginalVariables; j++)
            if (i != p && j != q)
                tableaux[i][j] -= tableaux[p][j] * tableaux[i][q]
                        / tableaux[p][q];
    // обнуляем столбец q
    for (int i = 0; i <= numberOfConstraints; i++)
        if (i != p)
            tableaux[i][q] = 0.0;
    // масштабируем строку p
    for (int j = 0; j <= numberOfConstraints + numberOfOriginalVariables; j++)
        if (j != q)
            tableaux[p][j] /= tableaux[p][q];
    tableaux[p][q] = 1.0;
}

// вернуть оптимальное объективное значение
public double value() {
        return -tableaux[numberOfConstraints][numberOfConstraints + numberOfOriginalVariables];
    }

// возвращаем вектор простого решения
public double[] primal() {
    double[] x = new double[numberOfOriginalVariables];
    for (int i = 0; i < numberOfConstraints; i++)
        if (basis[i] < numberOfOriginalVariables)
            x[basis[i]] = tableaux[i][numberOfConstraints
                    + numberOfOriginalVariables];
        return x;
}

// печатаем таблицы
public void show() {
    System.out.println("M = " + numberOfConstraints);
    System.out.println("N = " + numberOfOriginalVariables);
        for (int i = 0; i <= numberOfConstraints; i++) {
            for (int j = 0; j <= numberOfConstraints + numberOfOriginalVariables; j++) {
                System.out.printf("%7.2f ", tableaux[i][j]);
            }
            System.out.println();
        }
        System.out.println("value = " + value());
        for (int i = 0; i < numberOfConstraints; i++)
            if (basis[i] < numberOfOriginalVariables)
                System.out.println("x_" + basis[i] + " = " + tableaux[i][numberOfConstraints + numberOfOriginalVariables]);
        System.out.println();
    }

    private enum Constraint {
        lessThan, equal, greatherThan
    }

    public static class Modeler {
        private double[][] a; // таблица
        private int numberOfConstraints; // количество ограничений
        private int numberOfOriginalVariables; // количество исходных переменных

        public Modeler(double[][] constraintLeftSide, double[] constraintRightSide, Constraint[] constraintOperator, double[] objectiveFunction) {
            numberOfConstraints = constraintRightSide.length;
            numberOfOriginalVariables = objectiveFunction.length;
            a = new double[numberOfConstraints + 1][numberOfOriginalVariables + numberOfConstraints + 1];
            // инициализируем ограничение
            for (int i = 0; i < numberOfConstraints; i++){
                for (int j = 0; j < numberOfOriginalVariables; j++) {
                    a[i][j] = constraintLeftSide[i][j];
                }
            }
            for (int i = 0; i < numberOfConstraints; i++)
                a[i][numberOfConstraints + numberOfOriginalVariables] = constraintRightSide[i];
            // инициализируем слабую переменную
            for (int i = 0; i < numberOfConstraints; i++) {
                int slack = 0;
                switch (constraintOperator[i]) {
                    case greatherThan:
                        slack = -1;
                        break;
                    case lessThan:
                        slack = 1;
                        break;
                    default:
                }
                a[i][numberOfOriginalVariables + i] = slack;
            }
            // инициализировать целевую функцию
            for (int j = 0; j < numberOfOriginalVariables; j++)
                a[numberOfConstraints][j] = objectiveFunction[j];
        }
        public double[][] getTableaux() {
            return a;
        }

        public int getNumberOfConstraint() {
            return numberOfConstraints;
        }

        public int getNumberOfOriginalVariable() {
            return numberOfOriginalVariables;
        }

    }

    public static void main(String[] args) {

        double[] objectiveFunc = { 3,2,1,1};
        double[][] constraintLeftSide = {
                {2,2,0,3}, {0,1,2,1}, {1,2,2,2}};
        Constraint[] constraintOperator = { Constraint.equal, Constraint.equal, Constraint.equal};
        double[] constraintRightSide = {9,4,8};

        Modeler model = new Modeler(constraintLeftSide, constraintRightSide, constraintOperator, objectiveFunc);

        Simplex simplex = new Simplex(model.getTableaux(), model.getNumberOfConstraint(), model.getNumberOfOriginalVariable(), MAXIMIZE);

        double[] x = simplex.primal();
        for (int i = 0; i < x.length; i++)
            System.out.println("x[" + i + "] = " + x[i]);
       System.out.println("Решение: " + simplex.value());
    }


}

