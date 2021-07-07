#include "dialog3.h"
#include "ui_dialog3.h"
#include <QSqlQuery>
#include <QMessageBox>
#include <QPushButton>
Dialog3::Dialog3(QSqlDatabase db, QString depar, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Dialog3)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

     model = new QSqlQueryModel;
     QSqlQuery qry;
     deparM = new QSqlQueryModel;
     qry.prepare("select nameDepartment from department;");
     qry.exec();
     deparM->setQuery(qry);
     ui->comboBox->setModel(deparM);
     int index = ui->comboBox->findText(depar);
     if (index !=-1){
         ui->comboBox->setCurrentIndex(index);
     }
}

Dialog3::~Dialog3()
{
    delete model;
    delete ui;
}
QString Dialog3::value()
{
    return ui->comboBox->currentText();
}
