#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>
#include <QSqlError>
#include <QDebug>
#include "dialog.h"
#include "dialog2.h"
#include "dialog3.h"
#include "dialog4.h"
#include <QtPrintSupport/QPrinter>
#include <QPrintDialog>
#include <QTextStream>
#include <QTextDocument>
#include <prepodred.h>
#include <prepod.h>
#include <listener.h>
#include <school.h>
#include <predmet.h>
#include <consult.h>
#include <graph.h>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    model = new QSqlQueryModel;
    connecttosql();




}

MainWindow::~MainWindow()
{

    delete ui;

}

void MainWindow::connecttosql()
{
    db = QSqlDatabase::addDatabase("QSQLITE");

    db.setDatabaseName("D:/Owl/learning/inf.protect.methods/school2/schoolbd.db");


}


void MainWindow::on_action_triggered()
{

    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT city.nameCity FROM city;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Город"));
    model->setHeaderData(1,Qt::Horizontal,tr("Отделение"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }

}

void MainWindow::on_action_8_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("select city.nameCity , department.nameDepartment from city,department where department.F_idCity = city.idCity;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Город"));
    model->setHeaderData(1,Qt::Horizontal,tr("Отделение"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_9_triggered()
{

db.open();
    Dialog dial(db,"");

    dial.exec();

qry1 = new QSqlQuery(db);
    qry1->prepare("SELECT nameListener, ageListener FROM Listener, City WHERE Listener.F_idCity=City.idCity and City.nameCity=:gorod;");
    qry1->bindValue(":gorod",dial.value());
    qry1->exec();
    model->setQuery(*qry1);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Возраст"));
}

void MainWindow::on_action_10_triggered()
{db.open();
    Dialog dial(db,"");

    dial.exec();

qry2 = new QSqlQuery(db);
    qry2->prepare("SELECT nameTeacher,ageTeacher FROM Teacher, City WHERE Teacher.F_idCity=City.idCity and City.nameCity=:gorod;");
    qry2->bindValue(":gorod",dial.value());
    qry2->exec();
    model->setQuery(*qry2);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Стаж"));
}

void MainWindow::on_action_11_triggered()
{db.open();
     Dialog2 dial(db,"");

    dial.exec();

qry3 = new QSqlQuery(db);
    qry3->prepare("SELECT nameTeacher,ageTeacher FROM Teacher, Disciplin WHERE Teacher.F_idDisciplin=Disciplin.idDisciplin and Disciplin.nameDisciplin=:predmet;");
    qry3->bindValue(":predmet",dial.value());
    qry3->exec();
    model->setQuery(*qry3);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Стаж"));
}

void MainWindow::on_action_15_triggered()
{db.open();
    Dialog2 dial(db,"");

   dial.exec();

qry3 = new QSqlQuery(db);
   qry3->prepare("SELECT nameListener,ageListener FROM Listener, Study, Disciplin WHERE Study.Listener_idListener = Listener.idListener AND Study.Disciplin_idDisciplin = Disciplin.idDisciplin and disciplin.nameDisciplin = :predmet;");
   qry3->bindValue(":predmet",dial.value());
   qry3->exec();
   model->setQuery(*qry3);
   ui->tableView->setModel(model);
   ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

   model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
   model->setHeaderData(1,Qt::Horizontal,tr("Возраст"));
}

void MainWindow::on_action_12_triggered()
{
    db.open();
        Dialog3 dial(db,"");

       dial.exec();

    qry3 = new QSqlQuery(db);
       qry3->prepare("SELECT nameDisciplin,timeDisciplin FROM Disciplin, DiscInSchool,Department WHERE Disciplin.idDisciplin = DiscInSchool.Disciplin_idDisciplin AND Department.idDepartment = DiscInSchool.Department_idDepartment AND department.nameDepartment = :school;");
       qry3->bindValue(":school",dial.value());
       qry3->exec();
       model->setQuery(*qry3);
       ui->tableView->setModel(model);
       ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

       model->setHeaderData(0,Qt::Horizontal,tr("Название предмета"));
       model->setHeaderData(1,Qt::Horizontal,tr("Часы"));
}

void MainWindow::on_action_16_triggered()
{
    db.open();
        Dialog4 dial(db,"");

       dial.exec();

    qry3 = new QSqlQuery(db);
       qry3->prepare("SELECT nameListener, ageListener FROM Listener, Consult,Teacher WHERE listener.idListener = consult.Listener_idListener AND consult.teacher_idTeacher = teacher.idTeacher AND Teacher.nameTeacher = :prepod;");
       qry3->bindValue(":prepod",dial.value());
       qry3->exec();
       model->setQuery(*qry3);
       ui->tableView->setModel(model);
       ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

       model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
       model->setHeaderData(1,Qt::Horizontal,tr("Возраст"));
}

void MainWindow::on_action_14_triggered()
{
    db.open();
        Dialog3 dial(db,"");

       dial.exec();

    qry3 = new QSqlQuery(db);
       qry3->prepare("SELECT nameListener, ageListener FROM Listener,Department WHERE F_idDepartment = department.idDepartment AND department.nameDepartment  = :school;");
       qry3->bindValue(":school",dial.value());
       qry3->exec();
       model->setQuery(*qry3);
       ui->tableView->setModel(model);
       ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

       model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
       model->setHeaderData(1,Qt::Horizontal,tr("Возраст"));
}

void MainWindow::on_pushButton_clicked()
{
    QString strStream;
    QTextStream out (&strStream);
    const int rowCount=ui->tableView->model()->rowCount();
    const int columnCount =ui->tableView->model()->columnCount();
    out<<"<html>\n"<<"<head>\n"<<"meta Content=\"Text/html;charset=Windows-1251\">\n"<<
         QString("<title>%1</title>\n").arg("Report")<<
         "</head>\n"
         "<body bgcolor = #ffffff link=#5000A0>\n"
         "<table border = 1 cellspacing=0 cellpadding=2>\n";
    out<<"<thead><tr bgcolor=#f0f0f0>";
    for (int column = 0; column <columnCount;column++)
        if (!ui->tableView->isColumnHidden(column))
            out <<QString("<th>%1</th>").arg(ui->tableView->model()->headerData(column,Qt::Horizontal).toString());
    out<<"</tr></thead>\n";
    for (int row =0;row<rowCount;row++){
        out<<"<tr>";
        for (int column = 0; column<columnCount;column++){
            if (!ui->tableView->isColumnHidden(column)){
                QString data=ui->tableView->model()->data(ui->tableView->model()->index(row,column)).toString().simplified();
                out<<QString("<td bkcolor=0>%1</td>").arg((!data.isEmpty())?data:QString("&nbsp;"));
            }
        }
        out<<"</tr>\n";

    }
    out<<"</table>\n""</body>\n""</html>\n";
    QTextDocument *document = new QTextDocument();
    document->setHtml(strStream);
    QPrinter printer;
    QPrintDialog *Dialog = new QPrintDialog(&printer,0);
    if (Dialog->exec()==QDialog::Accepted){
        document->print(&printer);
    }
    delete document;
}

void MainWindow::on_action_2_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT nameListener, ageListener, nameDepartment,nameCity FROM Listener,Department,City WHERE listener.F_idCity=city.idCity AND listener.F_idDepartment=department.idDepartment;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Имя"));
    model->setHeaderData(1,Qt::Horizontal,tr("Возраст"));
    model->setHeaderData(2,Qt::Horizontal,tr("Отделение"));
    model->setHeaderData(3,Qt::Horizontal,tr("Город"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_3_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
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
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_4_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT nameDisciplin,timeDisciplin FROM disciplin;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Название"));
    model->setHeaderData(1,Qt::Horizontal,tr("Часы"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_5_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT department.nameDepartment,department.adressDepartment, city.nameCity FROM department, city where department.F_idCity = city.idCity;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Название"));
    model->setHeaderData(1,Qt::Horizontal,tr("Адрес"));
    model->setHeaderData(2,Qt::Horizontal,tr("Город"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_6_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT teacher.nameTeacher, listener.nameListener, disciplin.nameDisciplin from consult,teacher,listener,disciplin where consult.Listener_idListener=listener.idListener and consult.teacher_idTeacher=teacher.idTeacher and disciplin.idDisciplin=teacher.F_idDisciplin;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Преподаватель"));
    model->setHeaderData(1,Qt::Horizontal,tr("Слушатель"));
    model->setHeaderData(2,Qt::Horizontal,tr("Предмет"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_7_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT Disciplin.nameDisciplin,Listener.nameListener FROM Study,Listener,Disciplin WHERE Study.Disciplin_idDisciplin=Disciplin.idDisciplin AND study.Listener_idListener=listener.idListener;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Предмет"));
    model->setHeaderData(1,Qt::Horizontal,tr("Слушатель"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_26_triggered()
{
    if (db.open()){
    qry = new QSqlQuery(db);
    qry->prepare("SELECT Department.nameDepartment, Disciplin.nameDisciplin FROM DiscInSchool,Department,Disciplin WHERE DiscInSchool.Department_idDepartment=department.idDepartment AND DiscInSchool.Disciplin_idDisciplin=Disciplin.idDisciplin;");
    qry->exec();
    model->setQuery(*qry);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setSectionResizeMode(QHeaderView::ResizeToContents);

    model->setHeaderData(0,Qt::Horizontal,tr("Школа"));
    model->setHeaderData(1,Qt::Horizontal,tr("Предмет"));

    }
    else {
        QMessageBox::critical(this,"Error",model->lastError().text());
    }
}

void MainWindow::on_action_17_triggered()
{
   prepod dial(db);
    dial.exec();
}

void MainWindow::on_action_19_triggered()
{
   listener dial(db);
     dial.exec();
}

void MainWindow::on_action_20_triggered()
{
    school dial(db);
      dial.exec();
}

void MainWindow::on_action_21_triggered()
{
    predmet dial(db);
      dial.exec();
}

void MainWindow::on_action_22_triggered()
{
    consult dial(db);
      dial.exec();
}

void MainWindow::on_action_27_triggered()
{
    pg = new graph(db);
    pg->show();

}

void MainWindow::on_lineEdit_textEdited(const QString &arg1)
{
    //QSortFilterProxyModel proxy;
  //  proxy.setSourceModel(ui->tableView->model());
  //  proxy.setFilterRegExp(arg1);
  //  QModelIndex index=proxy.mapToSource(proxy.index(0,0));
  //  if(index.isValid())
   // {
    //    ui->tableView->selectionModel()->select(index,QItemSelectionModel::Select | QItemSelectionModel::Rows);
      //  ui->tableView->scrollTo(index,QAbstractItemView::EnsureVisible);
   // }

        proxy = new QSortFilterProxyModel;
        proxy->setSourceModel(ui->tableView->model());
        proxy->setFilterCaseSensitivity(Qt::CaseInsensitive);
proxy->setFilterKeyColumn(-1);
    proxy->setFilterFixedString(arg1);
    //QModelIndex index=proxy->mapToSource(proxy->index(0,0));
   // if(index.isValid())
    //   {
       //    ui->tableView->selectionModel()->select(index,QItemSelectionModel::Select | QItemSelectionModel::Rows);
        //  ui->tableView->scrollTo(index,QAbstractItemView::EnsureVisible);
     //  }

ui->tableView->setModel(proxy);

}
