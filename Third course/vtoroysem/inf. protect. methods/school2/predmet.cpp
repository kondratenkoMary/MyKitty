#include "predmet.h"
#include "ui_predmet.h"
#include "predmetred.h"
#include <QMessageBox>
#include "QPushButton"
predmet::predmet(QSqlDatabase db1, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::predmet)
{
    ui->setupUi(this);
    ui->buttonBox->button(QDialogButtonBox::Ok)->setText("Ок");
    ui->buttonBox->button(QDialogButtonBox::Cancel)->setText("Отмена");

    db = db1;
    db.open();
    model = new QSqlQueryModel;
    qry = new QSqlQuery;
    qry->prepare("SELECT Disciplin.nameDisciplin,Department.nameDepartment FROM DiscInSchool,Department,Disciplin WHERE DiscInSchool.Department_idDepartment=department.idDepartment AND DiscInSchool.Disciplin_idDisciplin=Disciplin.idDisciplin;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Предмет"));
    model->setHeaderData(1,Qt::Horizontal,tr("Отделение"));

}

predmet::~predmet()
{
    delete model;
    delete qry;
    delete ui;
}

void predmet::on_pushButton_clicked()
{
    predmetred dial(db,"","");
    dial.exec();

    QString predmet =dial.predmet();
    QString school =dial.school();

    QSqlQuery qry1;
    qry1.prepare("select disciplin.idDisciplin from disciplin where nameDisciplin = :predmet;");
    qry1.bindValue(":predmet",predmet);
    qry1.exec();
    qry1.next();
    int predmetid = qry1.value(0).toInt();

    qry1.prepare("select department.idDepartment from department where nameDepartment = :school;");
    qry1.bindValue(":school",school);
    qry1.exec();
    qry1.next();
    int schoolid = qry1.value(0).toInt();

    qry1.prepare("select max(idDiscInSchool) from DiscInSchool; ");
    qry1.exec();
    qry1.next();
    int id = qry1.value(0).toInt()+1;
if ( predmet!=""&& school!=""  ) {
    qry1.prepare("insert into DiscInSchool values ( :predmetid, :schoolid, :id);");
qry1.bindValue(":id", id);
    qry1.bindValue(":predmetid", predmetid);
    qry1.bindValue(":schoolid",schoolid);
    qry1.exec();
}
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);


    }



void predmet::on_pushButton_2_clicked()
{
    QMessageBox::StandardButton bYes;
    bYes = QMessageBox::question(this, "Подтверждение удаления", "Данное действие может повлиять на другие таблицы и навсегда удалить некоторые записи из таблицы. Желаете продолжить?",
                                 QMessageBox::Yes|QMessageBox::No);
    if (bYes == QMessageBox::Yes){
        QSqlQuery qry1;

        QString predmet = model->data(model->index(ui->tableView->currentIndex().row(),0),Qt::DisplayRole).toString();
        QString school = model->data(model->index(ui->tableView->currentIndex().row(),1),Qt::DisplayRole).toString();

        qry1.prepare("select disciplin.idDisciplin from disciplin where nameDisciplin = :predmet;");
        qry1.bindValue(":predmet",predmet);
        qry1.exec();
        qry1.next();
        int predmetid = qry1.value(0).toInt();

        qry1.prepare("select department.idDepartment from department where nameDepartment = :school;");
        qry1.bindValue(":school",school);
        qry1.exec();
        qry1.next();
        int schoolid = qry1.value(0).toInt();

        qry1.prepare("select idDiscInSchool from DiscInSchool where  Department_idDepartment = :schoolid and Disciplin_idDisciplin = :predmetid;");


        qry1.bindValue(":schoolid", schoolid);
        qry1.bindValue(":predmetid",predmetid);

        if (qry1.exec()){
            qry1.next();
            int id = qry1.value(0).toInt();
            qry1.prepare("delete from discinschool where idDiscInSchool = :id;");
            qry1.bindValue(":id",id);
            qry1.exec();

        }
        qry->exec();
        model->setQuery(*qry);
        ui->tableView->setModel(model);
    }
}
