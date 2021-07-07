#include "prepod.h"
#include "ui_prepod.h"
#include "prepodred.h"
#include <QMessageBox>
#include "QPushButton"
prepod::prepod(QSqlDatabase db1, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::prepod)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    db = db1;
    db.open();
    model = new QSqlQueryModel;
    qry = new QSqlQuery;
    qry->prepare("SELECT nameTeacher, ageTeacher, nameDisciplin,nameCity FROM Teacher,Disciplin,City WHERE teacher.F_idCity=city.idCity AND teacher.F_idDisciplin=disciplin.idDisciplin;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Стаж"));
    model->setHeaderData(2,Qt::Horizontal,tr("Дисциплина"));
    model->setHeaderData(3,Qt::Horizontal,tr("Город"));
}

prepod::~prepod()
{
    delete model;
    delete qry;
    delete ui;
}

void prepod::on_pushButton_clicked()
{
    prepodred dial(db,"",0,"","");
    dial.exec();
    QString name=dial.name();
    int age =dial.age();
    QString predmet =dial.predmet();
    QString gorod =dial.gorod();

    QSqlQuery qry1;
    qry1.prepare("select disciplin.idDisciplin from disciplin where nameDisciplin = :predmet;");
    qry1.bindValue(":predmet",predmet);
    qry1.exec();
    qry1.next();
    int predmetid = qry1.value(0).toInt();

    qry1.prepare("select city.idCity from city where nameCity = :gorod;");
    qry1.bindValue(":gorod",gorod);
    qry1.exec();
    qry1.next();
    int gorodid = qry1.value(0).toInt();

    qry1.prepare("select max(idTeacher) from Teacher; ");
    qry1.exec();
    qry1.next();
    int id = qry1.value(0).toInt()+1;
if (gorod !="" && name !="" && predmet!="" ) {
    qry1.prepare("insert into teacher values (:id, :name, :age, :predmetid, :gorodid);");
    qry1.bindValue(":id",id);
    qry1.bindValue(":name",name);
    qry1.bindValue(":age",age);
    qry1.bindValue(":predmetid", predmetid);
    qry1.bindValue(":gorodid",gorodid);
    qry1.exec();
}
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);


    }



void prepod::on_pushButton_2_clicked()
{
    QMessageBox::StandardButton bYes;
    bYes = QMessageBox::question(this, "Подтверждение удаления", "Данное действие может повлиять на другие таблицы и навсегда удалить некоторые записи из таблицы. Желаете продолжить?",
                                 QMessageBox::Yes|QMessageBox::No);
    if (bYes == QMessageBox::Yes){
        QSqlQuery qry1;
        QString name = model->data(model->index(ui->tableView->currentIndex().row(),0),Qt::DisplayRole).toString();
        int age = model->data(model->index(ui->tableView->currentIndex().row(),1),Qt::DisplayRole).toInt();
        QString predmet = model->data(model->index(ui->tableView->currentIndex().row(),2),Qt::DisplayRole).toString();
        QString gorod = model->data(model->index(ui->tableView->currentIndex().row(),3),Qt::DisplayRole).toString();

        qry1.prepare("select disciplin.idDisciplin from disciplin where nameDisciplin = :predmet;");
        qry1.bindValue(":predmet",predmet);
        qry1.exec();
        qry1.next();
        int predmetid = qry1.value(0).toInt();

        qry1.prepare("select city.idCity from city where nameCity = :gorod;");
        qry1.bindValue(":gorod",gorod);
        qry1.exec();
        qry1.next();
        int gorodid = qry1.value(0).toInt();
        qry1.prepare("select idTeacher from teacher where nameTeacher = :name and F_idCity = :gorodid and F_idDisciplin = :predmetid and ageTeacher = :age;");

        qry1.bindValue(":name",name);
        qry1.bindValue(":age",age);
        qry1.bindValue(":predmetid", predmetid);
        qry1.bindValue(":gorodid",gorodid);

        if (qry1.exec()){
            qry1.next();
            int id = qry1.value(0).toInt();
            qry1.prepare("delete from consult where teacher_idTeacher = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();
            qry1.prepare("delete from teacher where idTeacher = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();

        }
        qry->exec();
        model->setQuery(*qry);
        ui->tableView->setModel(model);
    }
}
