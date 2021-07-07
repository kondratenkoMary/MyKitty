#include "dialog4.h"
#include "ui_dialog4.h"
#include "QPushButton"
Dialog4::Dialog4(QSqlDatabase db, QString prepod, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Dialog4)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    model = new QSqlQueryModel;
    QSqlQuery qry;
    prepodM = new QSqlQueryModel;
    qry.prepare("select nameTeacher from teacher;");
    qry.exec();
    prepodM->setQuery(qry);
    ui->comboBox->setModel(prepodM);
    int index = ui->comboBox->findText(prepod);
    if (index !=-1){
        ui->comboBox->setCurrentIndex(index);
    }
}

Dialog4::~Dialog4()
{
    delete model;
    delete ui;
}

QString Dialog4::value()
{
    return ui->comboBox->currentText();
}
