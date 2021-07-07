#include "predmetred.h"
#include "ui_predmetred.h"
#include "QPushButton"
predmetred::predmetred(QSqlDatabase db1,  QString predmet, QString school, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::predmetred)
{ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");


    QSqlQuery qry;
    predmetM = new QSqlQueryModel;
    schoolM = new QSqlQueryModel;

    qry.prepare("select nameDisciplin from disciplin;");
    qry.exec();
    predmetM->setQuery(qry);
    ui->comboBox->setModel(predmetM);
    int index = ui->comboBox->findText(predmet);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
    qry.prepare("select nameDepartment from department;");
    qry.exec();
    schoolM->setQuery(qry);
    ui->comboBox_2->setModel(schoolM);
    index = ui->comboBox_2->findText(school);
    if (index !=-1){
        ui->comboBox_2->setCurrentIndex(index);
    }
}


QString predmetred::predmet()
{
    return ui->comboBox->currentText();
}

QString predmetred::school()
{
    return ui->comboBox_2->currentText();
}

predmetred::~predmetred()
{
    delete ui;
}
