#include "dialog2.h"
#include "ui_dialog2.h"
#include <QSqlQuery>
#include <QMessageBox>
#include <QPushButton>
Dialog2::Dialog2(QSqlDatabase db, QString predmet,  QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Dialog2)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    model = new QSqlQueryModel;
    QSqlQuery qry;
    predmetM = new QSqlQueryModel;
    qry.prepare("select nameDisciplin from disciplin;");
    qry.exec();
    predmetM->setQuery(qry);
    ui->comboBox->setModel(predmetM);
    int index = ui->comboBox->findText(predmet);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
}

Dialog2::~Dialog2()
{
    delete model;
    delete ui;
}
QString Dialog2::value()
{

    return ui->comboBox->currentText();
    //return ui->lineEdit->text();// текст, передаваемый в основную форму при нажатии ок
}
