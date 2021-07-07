#include "consult.h"
#include "ui_consult.h"
#include "consred.h"
#include <QMessageBox>
#include <QPushButton>
consult::consult(QSqlDatabase db1, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::consult)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");
    db = db1;
    db.open();
    model = new QSqlQueryModel;
    qry = new QSqlQuery;
    qry->prepare("SELECT Teacher.nameTeacher,Listener.nameListener FROM Consult,Listener,Teacher WHERE consult.Listener_idListener=listener.idListener AND consult.teacher_idTeacher=Teacher.idTeacher;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Преподаватель"));
    model->setHeaderData(1,Qt::Horizontal,tr("Слушатель"));

}

consult::~consult()
{
    delete model;
    delete qry;
    delete ui;
}

void consult::on_pushButton_clicked()
{
    consred dial(db,"","");
    dial.exec();

    QString prepod =dial.prepod();
    QString listener =dial.listener();

    QSqlQuery qry1;
    qry1.prepare("select teacher.idTeacher from teacher where nameTeacher = :prepod;");
    qry1.bindValue(":prepod",prepod);
    qry1.exec();
    qry1.next();
    int prepodid = qry1.value(0).toInt();

    qry1.prepare("select listener.idListener from listener where nameListener = :listener;");
    qry1.bindValue(":listener",listener);
    qry1.exec();
    qry1.next();
    int listenerid = qry1.value(0).toInt();

    qry1.prepare("select max(idConsult) from Consult; ");
    qry1.exec();
    qry1.next();
    int id = qry1.value(0).toInt()+1;
if ( prepod!=""&& listener!=""  ) {
    qry1.prepare("insert into consult values ( :prepodid, :listenerid, :id);");
qry1.bindValue(":id", id);
    qry1.bindValue(":prepodid", prepodid);
    qry1.bindValue(":listenerid",listenerid);
    qry1.exec();
}
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);


    }





