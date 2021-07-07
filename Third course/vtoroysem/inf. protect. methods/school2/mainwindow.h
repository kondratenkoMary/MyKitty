#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtSql/QSqlDatabase>
#include <QtSql/QSqlQueryModel>
#include <QtSql/QSqlQuery>
#include "graph.h"
#include "ui_graph.h"
namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();
    void connecttosql();
    QSortFilterProxyModel *proxy;
    QStandardItemModel *model1;

graph *pg;
private slots:






    void on_action_triggered();

    void on_action_8_triggered();

    void on_action_9_triggered();

    void on_action_10_triggered();

    void on_action_11_triggered();

    void on_action_15_triggered();

    void on_action_12_triggered();

    void on_action_16_triggered();

    void on_action_14_triggered();

    void on_pushButton_clicked();

    void on_action_2_triggered();

    void on_action_3_triggered();

    void on_action_4_triggered();

    void on_action_5_triggered();

    void on_action_6_triggered();

    void on_action_7_triggered();

    void on_action_26_triggered();

    void on_action_17_triggered();

    void on_action_19_triggered();

    void on_action_20_triggered();

    void on_action_21_triggered();

    void on_action_22_triggered();

    void on_action_27_triggered();

    void on_lineEdit_textEdited(const QString &arg1);

private:
    Ui::MainWindow *ui;
    QSqlDatabase db;
    QSqlQueryModel *model;
    QSqlQuery *qry;
    QSqlQuery *qry1;
    QSqlQuery *qry2;
    QSqlQuery *qry3;
};

#endif // MAINWINDOW_H
