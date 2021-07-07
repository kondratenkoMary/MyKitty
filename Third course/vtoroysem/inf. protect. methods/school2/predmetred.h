#ifndef PREDMETRED_H
#define PREDMETRED_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class predmetred;
}

class predmetred : public QDialog
{
    Q_OBJECT

public:
    explicit predmetred(QSqlDatabase db, QString predmet, QString school, QWidget *parent = 0);
    QString predmet();
    QString school();
    ~predmetred();

private slots:


private:
    Ui::predmetred *ui;
    QSqlQueryModel *predmetM, *schoolM;
};

#endif // PREDMETRED_H
