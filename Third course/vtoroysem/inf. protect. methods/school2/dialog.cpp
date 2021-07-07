#include "dialog.h"
#include "ui_dialog.h"
#include <QSqlQuery>
#include <QMessageBox>
#include <QPushButton>
Dialog::Dialog(QSqlDatabase db, QString city, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Dialog)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    model=new QSqlQueryModel;
    QSqlQuery qry;
    cityM = new QSqlQueryModel;
    qry.prepare("select nameCity from city;");
    qry.exec();
    cityM->setQuery(qry);
    ui->comboBox->setModel(cityM);
    int index = ui->comboBox->findText(city);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
}

Dialog::~Dialog()
{
    delete model;
    delete ui;
}

QString Dialog::value()
{
    return ui->comboBox->currentText();
}
