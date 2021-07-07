#ifndef PREDMET_H
#define PREDMET_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class predmet;
}

class predmet : public QDialog
{
    Q_OBJECT

public:
    explicit predmet(QSqlDatabase db1, QWidget *parent = 0);
    ~predmet();

private slots:
    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

private:
    Ui::predmet *ui;
    QSqlQueryModel *model;
    QSqlQuery *qry;
    QSqlDatabase db;
};

#endif // PREDMET_H
