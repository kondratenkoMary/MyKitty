#ifndef SCHOOLRED_H
#define SCHOOLRED_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class schoolred;
}

class schoolred: public QDialog
{
    Q_OBJECT

public:
    explicit schoolred(QSqlDatabase db, QString name, QString adress, QString gorod, QWidget *parent = 0);
    QString name();
    QString adress();
    QString gorod();
    ~schoolred();

private slots:


private:
    Ui::schoolred *ui;
    QSqlQueryModel *gorodM;
};

#endif // SCHOOLRED_H
