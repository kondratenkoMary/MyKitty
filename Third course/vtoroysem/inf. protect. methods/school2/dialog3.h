#ifndef DIALOG3_H
#define DIALOG3_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class Dialog3;
}

class Dialog3 : public QDialog
{
    Q_OBJECT

public:
    explicit Dialog3(QSqlDatabase db, QString depar, QWidget *parent = 0);
    ~Dialog3();
QString value();
QString depar();
private:
    Ui::Dialog3 *ui;
    QSqlQueryModel *model;
    QSqlQueryModel *deparM;
};

#endif // DIALOG3_H
