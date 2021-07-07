#include "prepodred.h"
#include "ui_prepodred.h"
#include "QPushButton"
prepodred::prepodred(QSqlDatabase db1, QString name, int age, QString predmet, QString gorod, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::prepodred)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    ui->lineEdit->setText(name);
    ui->spinBox->setValue(age);
    QSqlQuery qry;
    predmetM = new QSqlQueryModel;
    gorodM = new QSqlQueryModel;

    qry.prepare("select nameDisciplin from disciplin;");
    qry.exec();
    predmetM->setQuery(qry);
    ui->comboBox->setModel(predmetM);
    int index = ui->comboBox->findText(predmet);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
    qry.prepare("select nameCity from city;");
    qry.exec();
    gorodM->setQuery(qry);
    ui->comboBox_2->setModel(gorodM);
    index = ui->comboBox_2->findText(gorod);
    if (index !=-1){
        ui->comboBox_2->setCurrentIndex(index);
    }
}

QString prepodred::name()
{
    return ui->lineEdit->text();
}

int prepodred::age()
{
    return ui->spinBox->value();
}

QString prepodred::predmet()
{
    return ui->comboBox->currentText();
}

QString prepodred::gorod()
{
    return ui->comboBox_2->currentText();
}

prepodred::~prepodred()
{
    delete ui;
}
