#include "schoolred.h"
#include "ui_schoolred.h"
#include "QPushButton"
schoolred::schoolred(QSqlDatabase db1, QString name,  QString adress, QString gorod, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::schoolred)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    ui->lineEdit->setText(name);
    ui->lineEdit_2->setText(adress);
    QSqlQuery qry;
    gorodM = new QSqlQueryModel;


    qry.prepare("select nameCity from city;");
    qry.exec();
    gorodM->setQuery(qry);
    ui->comboBox->setModel(gorodM);
    int index = ui->comboBox->findText(gorod);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
}

QString schoolred::name()
{
    return ui->lineEdit->text();
}


QString schoolred::adress()
{
    return ui->lineEdit_2->text();
}

QString schoolred::gorod()
{
    return ui->comboBox->currentText();
}

schoolred::~schoolred()
{
    delete ui;
}
