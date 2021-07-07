#ifndef CONSULT_H
#define CONSULT_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class consult;
}

class consult : public QDialog
{
    Q_OBJECT

public:
    explicit consult(QSqlDatabase db1, QWidget *parent = 0);
    ~consult();

private slots:
    void on_pushButton_clicked();



private:
    Ui::consult *ui;
    QSqlQueryModel *model;
    QSqlQuery *qry;
    QSqlDatabase db;
};

#endif // CONSULT_H
