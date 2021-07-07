#ifndef DIALOG_H
#define DIALOG_H
#include <QDialog>
#include <QSqlDatabase>
#include <QSqlQueryModel>
#include <QSqlQuery>


namespace Ui {
class Dialog;
}

class Dialog : public QDialog
{
    Q_OBJECT

public:
    explicit Dialog(QSqlDatabase db, QString city, QWidget *parent = 0);
    ~Dialog();
    QString city();
QString value();
private slots:


private:
    Ui::Dialog *ui;
    QSqlQueryModel *model;
    QSqlQueryModel *cityM;
};

#endif // DIALOG_H
