#include "listenerred.h"
#include "ui_listenerred.h"
#include "QPushButton"
listenerred::listenerred(QSqlDatabase db1, QString name, int age, QString school, QString gorod, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::listenerred)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    ui->lineEdit->setText(name);
    ui->spinBox->setValue(age);
    QSqlQuery qry;
    schoolM = new QSqlQueryModel;
    gorodM = new QSqlQueryModel;

    qry.prepare("select nameDepartment from department;");
    qry.exec();
    schoolM->setQuery(qry);
    ui->comboBox->setModel(schoolM);
    int index = ui->comboBox->findText(school);
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

QString listenerred::name()
{
    return ui->lineEdit->text();
}

int listenerred::age()
{
    return ui->spinBox->value();
}

QString listenerred::school()
{
    return ui->comboBox->currentText();
}

QString listenerred::gorod()
{
    return ui->comboBox_2->currentText();
}

listenerred::~listenerred()
{
    delete ui;
}
