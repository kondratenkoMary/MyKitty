#ifndef CONSRED_H
#define CONSRED_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class consred;
}

class consred : public QDialog
{
    Q_OBJECT

public:
    explicit consred(QSqlDatabase db, QString prepod, QString listener, QWidget *parent = 0);
    QString prepod();
    QString listener();
    ~consred();

private slots:



private:
    Ui::consred *ui;
    QSqlQueryModel *prepodM, *listenerM;
};

#endif // CONSRED_H
