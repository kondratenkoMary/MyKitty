#ifndef SCHOOL_H
#define SCHOOL_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class school;
}

class school : public QDialog
{
    Q_OBJECT

public:
    explicit school (QSqlDatabase db1, QWidget *parent = 0);
    ~school();

private slots:
    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

private:
    Ui::school *ui;
    QSqlQueryModel *model;
    QSqlQuery *qry;
    QSqlDatabase db;
};

#endif // SCHOOL_H
