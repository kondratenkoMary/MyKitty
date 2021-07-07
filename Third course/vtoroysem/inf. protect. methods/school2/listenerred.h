#ifndef LISTENERRED_H
#define LISTENERRED_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class listenerred;
}

class listenerred : public QDialog
{
    Q_OBJECT

public:
    explicit listenerred(QSqlDatabase db, QString name, int age, QString school, QString gorod, QWidget *parent = 0);
    QString name();
    int age();
    QString school();
    QString gorod();
    ~listenerred();

private slots:


private:
    Ui::listenerred *ui;
    QSqlQueryModel *schoolM, *gorodM;
};

#endif // LISTENERRED_H
