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

int key::value()
{
    //количество закрытых алфавитов
    int countCA = ui->lineEdit->text().toInt();

     if ((countCA) < 1 || (countCA) > 3 ){
          QMessageBox::critical(this,"Ошибка","Значение ключа неправильное");
      }

    return countCA;
}

