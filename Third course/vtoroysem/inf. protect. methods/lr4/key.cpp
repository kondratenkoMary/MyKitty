#include "key.h"
#include "ui_key.h"
#include <QMessageBox>

key::key(QWidget *parent) : QDialog(parent), ui(new Ui::key)
{
    ui->setupUi(this);
}

key::~key()
{
    delete ui;
}

bool isDigit(QString str){
    bool f = false;
    for(int i = 0; i < str.size(); i++){
        if((str[i] == "0") || (str[i] == "1") || (str[i] == "2") || (str[i] == "3") || (str[i] == "4") || (str[i] == "5") || (str[i] == "6") || (str[i] == "7") || (str[i] == "8") || (str[i] == "9")){
            f = true;
        }else{
            f = false;
            break;
        }
    }

    if(f == true){
        return true;
    }else{
        return false;
    }

}


bool key::value()
{
     QString a = ui->lineEdit->text();
     QString c = ui->lineEdit_2->text();
     QString t0 = ui->lineEdit_3->text();

     if(isDigit(a) && isDigit(c) && isDigit(t0)){
         A = a.toInt();
         C = c.toInt();
         T0 = t0.toInt();
         return true;
     }else{
         A = 0;
         C = 0;
         T0 = 0;
         ui->lineEdit->clear();
         ui->lineEdit_2->clear();
         ui->lineEdit_3->clear();
         QMessageBox::critical(this,"Ошибка","Значение ключа неправильное");
     }
     return false;

}
