#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QString>
#include "QBitArray"
#include <QVariant>

namespace Ui {
class MainWindow;
class QBitArray;
class  QVariant;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:
    void cleanInput();
    void cleanCombination();
    void cleanOutput();

    int getM(QString);
    void on_pushButton_clicked();
    QString controlBit(bool, QString);
    void on_pushButton_2_clicked();
    void findJ();
    void on_pushButton_3_clicked();
    void on_pushButton_4_clicked();


    void on_lineEdit_editingFinished();
    void on_lineEdit_7_editingFinished();
    void on_lineEdit_textChanged(const QString &arg1);
    void on_lineEdit_7_textChanged(const QString &arg1);
    int from2to10(QString);


private:
    Ui::MainWindow *ui;
    QString input;
    QString controlNumber;
    QString output;
    QString output1;
    int l;
    int m; int sumA;
    int n;
    int R;
    int m1;
    int R1;
    int kr;
    int J;
    int r;
};

#endif // MAINWINDOW_H
