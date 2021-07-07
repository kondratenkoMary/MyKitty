#ifndef DIALOG4_H
#define DIALOG4_H

#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>
namespace Ui {
class Dialog4;
}

class Dialog4 : public QDialog
{
    Q_OBJECT

public:
    explicit Dialog4(QSqlDatabase db, QString prepod, QWidget *parent = 0);
    ~Dialog4();
QString value();
QString prepod();

private:
    Ui::Dialog4 *ui;
    QSqlQueryModel *model;
    QSqlQueryModel *prepodM;
};

#endif // DIALOG4_H
