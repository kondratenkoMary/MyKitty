#include "school.h"
#include "ui_school.h"
#include "schoolred.h"
#include <QMessageBox>
#include "QPushButton"
school::school(QSqlDatabase db1, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::school)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    db = db1;
    db.open();
    model = new QSqlQueryModel;
    qry = new QSqlQuery;
    qry->prepare("SELECT nameDepartment, adressDepartment, nameCity FROM department,City WHERE department.F_idCity=city.idCity;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Адрес"));
    model->setHeaderData(2,Qt::Horizontal,tr("Город"));
}

school::~school()
{
    delete model;
    delete qry;
    delete ui;
}

void school::on_pushButton_clicked()
{
    schoolred dial(db,"","","");
    dial.exec();
    QString name=dial.name();
    QString adress =dial.adress();
    QString gorod =dial.gorod();

    QSqlQuery qry1;

    qry1.prepare("select city.idCity from city where nameCity = :gorod;");
    qry1.bindValue(":gorod",gorod);
    qry1.exec();
    qry1.next();
    int gorodid = qry1.value(0).toInt();

    qry1.prepare("select max(idDepartment) from department; ");
    qry1.exec();
    qry1.next();
    int id = qry1.value(0).toInt()+1;
if (gorod !="" && name !="" && adress!="" ) {
    qry1.prepare("insert into department values (:id, :name, :adress, :gorodid);");
    qry1.bindValue(":id",id);
    qry1.bindValue(":name",name);
    qry1.bindValue(":adress", adress);
    qry1.bindValue(":gorodid",gorodid);
    qry1.exec();
}
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);


    }



void school::on_pushButton_2_clicked()
{
    QMessageBox::StandardButton bYes;
    bYes = QMessageBox::question(this, "Подтверждение удаления", "Данное действие может повлиять на другие таблицы и навсегда удалить некоторые записи из таблицы. Желаете продолжить?",
                                 QMessageBox::Yes|QMessageBox::No);
    if (bYes == QMessageBox::Yes){
        QSqlQuery qry1;
        QString name = model->data(model->index(ui->tableView->currentIndex().row(),0),Qt::DisplayRole).toString();

        QString adress = model->data(model->index(ui->tableView->currentIndex().row(),1),Qt::DisplayRole).toString();
        QString gorod = model->data(model->index(ui->tableView->currentIndex().row(),2),Qt::DisplayRole).toString();



        qry1.prepare("select city.idCity from city where nameCity = :gorod;");
        qry1.bindValue(":gorod",gorod);
        qry1.exec();
        qry1.next();
        int gorodid = qry1.value(0).toInt();
        qry1.prepare("select idDepartment from department where nameDepartment = :name and F_idCity = :gorodid and adressDepartment = :adress;");

        qry1.bindValue(":name",name);
        qry1.bindValue(":adress",adress);

        qry1.bindValue(":gorodid",gorodid);

        if (qry1.exec()){
            qry1.next();
            int id = qry1.value(0).toInt();
            qry1.prepare("delete from discInSchool where Department_idDepartment = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();
            qry1.prepare("delete from department where idDepartment = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();

        }
        qry->exec();
        model->setQuery(*qry);
        ui->tableView->setModel(model);
    }
}
