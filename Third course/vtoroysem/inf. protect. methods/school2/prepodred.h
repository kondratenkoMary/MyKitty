#ifndef PREPODRED_H
#define PREPODRED_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class prepodred;
}

class prepodred : public QDialog
{
    Q_OBJECT

public:
    explicit prepodred(QSqlDatabase db, QString name, int age, QString predmet, QString gorod, QWidget *parent = 0);
    QString name();
    int age();
    QString predmet();
    QString gorod();
    ~prepodred();

private slots:


private:
    Ui::prepodred *ui;
    QSqlQueryModel *predmetM, *gorodM;
};

#endif // PREPODRED_H
