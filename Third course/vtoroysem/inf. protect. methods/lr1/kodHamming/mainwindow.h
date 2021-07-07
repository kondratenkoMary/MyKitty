#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QString>
#include "QBitArray"
#include <QVariant>
#include <math.h>

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
    void CleanInf();
    void CleanCombA();
    void CleanResult();
    void on_pushButton_clicked();
    char summBit(int, QString);
    char evenBit(QString);
    void on_pushButton_2_clicked();
    int findN(QString);
    void on_pushButton_3_clicked();
    void on_pushButton_4_clicked();

    void on_lineEdit_editingFinished();
    void on_lineEdit_3_editingFinished();
    void on_lineEdit_textChanged(const QString &arg1);
    void on_lineEdit_3_textChanged(const QString &arg1);
    void on_lineEdit_6_textChanged(const QString &arg1);

private:
    Ui::MainWindow *ui;
    int k;
    int m;
    int n;
    QString input;
    QString controlNumber;
    QString control;
    QString output;
};

#endif // MAINWINDOW_H
