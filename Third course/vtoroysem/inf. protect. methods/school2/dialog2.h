#ifndef DIALOG2_H
#define DIALOG2_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class Dialog2;
}

class Dialog2 : public QDialog
{
    Q_OBJECT

public:
    explicit Dialog2(QSqlDatabase db, QString predmet, QWidget *parent = 0);
    ~Dialog2();
    QString predmet();
QString value();
private:
    Ui::Dialog2 *ui;
    QSqlQueryModel *model;
    QSqlQueryModel *predmetM;
};

#endif // DIALOG2_H
