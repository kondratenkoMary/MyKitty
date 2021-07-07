#ifndef LISTENER_H
#define LISTENER_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class listener;
}

class listener : public QDialog
{
    Q_OBJECT

public:
    explicit listener(QSqlDatabase db1, QWidget *parent = 0);
    ~listener();

private slots:
    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

private:
    Ui::listener *ui;
    QSqlQueryModel *model;
    QSqlQuery *qry;
    QSqlDatabase db;
};

#endif // LISTENER_H
