#ifndef PREPOD_H
#define PREPOD_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class prepod;
}

class prepod : public QDialog
{
    Q_OBJECT

public:
    explicit prepod(QSqlDatabase db1, QWidget *parent = 0);
    ~prepod();

private slots:
    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

private:
    Ui::prepod *ui;
    QSqlQueryModel *model;
    QSqlQuery *qry;
    QSqlDatabase db;
};

#endif // PREPOD_H
