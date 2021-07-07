#include "consred.h"
#include "ui_consred.h"
#include "QPushButton"
consred::consred(QSqlDatabase db1,  QString prepod, QString listener, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::consred)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");
    QSqlQuery qry;
    prepodM = new QSqlQueryModel;
    listenerM = new QSqlQueryModel;

    qry.prepare("select nameTeacher from teacher;");
    qry.exec();
    prepodM->setQuery(qry);
    ui->comboBox->setModel(prepodM);
    int index = ui->comboBox->findText(prepod);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
    qry.prepare("select nameListener from listener;");
    qry.exec();
    listenerM->setQuery(qry);
    ui->comboBox_2->setModel(listenerM);
    index = ui->comboBox_2->findText(listener);
    if (index !=-1){
        ui->comboBox_2->setCurrentIndex(index);
    }
}


QString consred::prepod()
{
    return ui->comboBox->currentText();
}

QString consred::listener()
{
    return ui->comboBox_2->currentText();
}

consred::~consred()
{
    delete ui;
}
