#include "listener.h"
#include "ui_listener.h"
#include "prepodred.h"
#include <QMessageBox>
#include "listenerred.h"
#include "QPushButton"
listener::listener(QSqlDatabase db1, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::listener)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    db = db1;
    db.open();
    model = new QSqlQueryModel;
    qry = new QSqlQuery;
    qry->prepare("SELECT nameListener, ageListener, nameDepartment,nameCity FROM listener ,department,City WHERE listener.F_idCity=city.idCity AND listener.F_idDepartment=department.idDepartment;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Возраст"));
    model->setHeaderData(2,Qt::Horizontal,tr("Школа"));
    model->setHeaderData(3,Qt::Horizontal,tr("Город"));
}

listener::~listener()
{
    delete model;
    delete qry;
    delete ui;
}

void listener::on_pushButton_clicked()
{
    listenerred dial(db,"",0,"","");
    dial.exec();
    QString name=dial.name();
    int age =dial.age();
    QString school =dial.school();
    QString gorod =dial.gorod();

    QSqlQuery qry1;
    qry1.prepare("select department.idDepartment from department where nameDepartment = :school;");
    qry1.bindValue(":school",school);
    qry1.exec();
    qry1.next();
    int schoolid = qry1.value(0).toInt();

    qry1.prepare("select city.idCity from city where nameCity = :gorod;");
    qry1.bindValue(":gorod",gorod);
    qry1.exec();
    qry1.next();
    int gorodid = qry1.value(0).toInt();

    qry1.prepare("select max(idListener) from listener; ");
    qry1.exec();
    qry1.next();
    int id = qry1.value(0).toInt()+1;
if (gorod !="" && name !="" && school!="" ) {
    qry1.prepare("insert into listener values (:id, :name, :age, :schoolid, :gorodid);");
    qry1.bindValue(":id",id);
    qry1.bindValue(":name",name);
    qry1.bindValue(":age",age);
    qry1.bindValue(":schoolid", schoolid);
    qry1.bindValue(":gorodid",gorodid);
    qry1.exec();
}
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);


    }



void listener::on_pushButton_2_clicked()
{
    QMessageBox::StandardButton bYes;
    bYes = QMessageBox::question(this, "Подтверждение удаления", "Данное действие может повлиять на другие таблицы и навсегда удалить некоторые записи из таблицы. Желаете продолжить?",
                                 QMessageBox::Yes|QMessageBox::No);
    if (bYes == QMessageBox::Yes){
        QSqlQuery qry1;
        QString name = model->data(model->index(ui->tableView->currentIndex().row(),0),Qt::DisplayRole).toString();
        int age = model->data(model->index(ui->tableView->currentIndex().row(),1),Qt::DisplayRole).toInt();
        QString school = model->data(model->index(ui->tableView->currentIndex().row(),2),Qt::DisplayRole).toString();
        QString gorod = model->data(model->index(ui->tableView->currentIndex().row(),3),Qt::DisplayRole).toString();

        qry1.prepare("select department.idDepartment from department where nameDepartment = :school;");
        qry1.bindValue(":school",school);
        qry1.exec();
        qry1.next();
        int schoolid = qry1.value(0).toInt();

        qry1.prepare("select city.idCity from city where nameCity = :gorod;");
        qry1.bindValue(":gorod",gorod);
        qry1.exec();
        qry1.next();
        int gorodid = qry1.value(0).toInt();

        qry1.prepare("select idListener from listener where nameListener = :name and F_idCity = :gorodid and F_idDepartment = :schoolid and ageListener = :age;");

        qry1.bindValue(":name",name);
        qry1.bindValue(":age",age);
        qry1.bindValue(":schoolid", schoolid);
        qry1.bindValue(":gorodid",gorodid);

        if (qry1.exec()){
            qry1.next();
            int id = qry1.value(0).toInt();
            qry1.prepare("delete from consult where Listener_idListener = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();
            qry1.prepare("delete from study where Listener_idListener = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();
            qry1.prepare("delete from listener where idListener = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();

        }
        qry->exec();
        model->setQuery(*qry);
        ui->tableView->setModel(model);
    }
}
