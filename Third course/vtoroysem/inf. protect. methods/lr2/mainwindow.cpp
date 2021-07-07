#include "mainwindow.h"
#include "qbitarray.h"
#include "ui_mainwindow.h"
#include "qmath.h"
#include "algorithm"



MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::cleanInput()
{
    ui->lineEdit_2->clear();
    ui->lineEdit_3->clear();
    ui->lineEdit_4->clear();
    ui->lineEdit_5->clear();
    input = "";
    n = 0;
    m = 0;
    l = 0;
    R = 0;
}


void MainWindow::cleanCombination(){
    ui->lineEdit_6->clear();
    ui->lineEdit_7->clear();
    ui->comboBox ->clear();
    controlNumber = "";
}


void MainWindow::cleanOutput(){
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
    ui->comboBox_2 ->clear();
    output = "";
    r = 0;
}


int MainWindow::getM(QString line)
{
    int mF = 0;
    for (int i = 0; i < n; i++)
        if (line[i] == '1')
            mF++;
   return mF;
}


//ВВОД
void MainWindow::on_pushButton_clicked()
{
    QString str;

    cleanInput();
    cleanCombination();
    cleanOutput();

    //Информационная последовательность
    input = ui->lineEdit->text();

    //количество информационных символов n
    n = input.length();
    ui->lineEdit_3->setText(QString::number(n));

    //количество символов, значение которых равно 1, m (вес кода)
    m = getM(input);
    ui->lineEdit_2->setText(QString::number(m));

    //количество дополнительных двоичных разрядов l,
    //необходимых для записи проверочных символов (контрольного кода)
    double l1 =  log(n), l2 = log(2);
    l1 /= l2;
    l = int(l1);
    ui->lineEdit_4->setText(QString::number(l));
}


//КОНТРОРЛЬНЫЕ БИТЫ
QString MainWindow::controlBit(bool dekod, QString line)
{
    int copyR = 0;
    int k = 0;
    for (int i = 0; i < n; i++)
        if (line[i] == '1')
        {
            copyR += i ;  //суммируем номера позиций символов, равных 1
            QString str = "a";
            str.append(char(48 + k));
            str.append(" = ");
            str.append(char (i+48));
            //вывод номера позиции символа, равного 1
            if (!dekod)
                ui -> comboBox -> addItem(str);
            else ui -> comboBox_2 -> addItem(str);
            k++;
        }

    //находим значение контрольного кода в десятичном виде (copyR)
    copyR  %= n;
    if (!dekod)
        R = copyR;
    else R1 = copyR;

    //находим биты контрольного кода (strR2) (перевод R из 10-й в 2-ю СС)
    QString bitContr = "";
    for (int i = l, mod; i > 0; i--)
    {
        mod = copyR % 2;
        copyR /= 2;
        //добавляем контрольный бит (слева, т. к. в обратном порядке)
        bitContr = (QString::number(mod)) + bitContr;
    }
    return bitContr;
}



//КОДИРОВАТЬ
void MainWindow::on_pushButton_2_clicked()
{
    cleanCombination();
    cleanOutput();

    //Кодовая комбинация (controlNumber) состоит из n + l битов:
    //n бит - исходная информационная последовательность (input)
    for (int i = 0; i < n; i++)
       controlNumber[i] = input[i];
    //l бит - контрольный код (kontr)
    QString control = controlBit(0, controlNumber);
    ui->lineEdit_5->setText(control);
    for (int i = 0; i < l; i++)
        controlNumber.append(control[i]);
    ui->lineEdit_6->setText(controlNumber);
    ui->lineEdit_7->setText(controlNumber);
}



//НОМЕР J искаженного разряда
void MainWindow::findJ()
{
    bool flag = false;
    for (int i = n; i < n+l; i++)
       if (output[i] != controlNumber[i])
       {
           J = i;
           r++;
       }
    //Нет ошибок в иформационной части
    if (m - m1 == 0)
    {
        r += 0;
        return;
    }

    //Двукратная ошибка в информационной части
    if (abs(m - m1) > 1)
    {
        r += 2;
        return;
    }
    //Однократная ошибка в информационной части
    if(m - m1 != 0){
        int g = from2to10(output1);
        int sum = 0;
        for(int j = 0; j < n; j++){
            if(output[j] == '1'){
                sum += j;
            }
        }
        if(m - m1 == 1){
            J = (g - (sum%n))%n;
            flag = true;
        }else if(m - m1 == -1){
             J = ((sum%n) - g)%n;
             flag = true;
        }
    }
     if (J < 0)
            J += n;
        J %= n;
        r += 1;
        if (r == 2)
            r = -2;
        if(flag == true){
            if(output[J] == '0'){
                output[J] = '1';
            }else
               output[J] = '0';

        }

}

int MainWindow::from2to10(QString bin){
    QString dec_str;
    bool ok;

    int dec = bin.toInt(&ok,2);

    if (ok)
       dec_str.setNum(dec);
    return dec;
 }





//ДЕКОДИРОВАТЬ
void MainWindow::on_pushButton_3_clicked()
{
     cleanOutput();

     if (ui->lineEdit_7->text() == 0)
         ui->lineEdit_7->setText(controlNumber);
      output = ui->lineEdit_7->text();

     m1 = getM(output);
     QString control =  controlBit(1, output);
     output1 = output;
     output1.remove(0,8);
     ui->lineEdit_8->setText(QString::number(m1));
     ui->lineEdit_9->setText(control);
     findJ();
     int hp = from2to10(control);
     if((m - m1 == 0)&& ((R-hp >= 2) || (R-hp <= -2))){
         r = 2;
     }
     m1 = getM(output);
     if((r == -2) && (m - m1 == 0)){
         r = 1;
     }
     if (r == 1)
         ui->lineEdit_11->setText(QString::number(J));
     if ((r == 0)||(r == 1))
          ui->lineEdit_12->setText(output.remove(8,3));
     if (r == 2)
          ui->lineEdit_12->setText("Симметричная ошибка в информационной части");
     if (r == -2)
     {
         ui->lineEdit_12->setText("Один информационный и один проверочный символы");
         r = 2;
     }
     ui->lineEdit_10->setText(QString::number(r));

}

//ВЫХОД
void MainWindow::on_pushButton_4_clicked()
{
    QApplication::exit();
}



void MainWindow::on_lineEdit_editingFinished()
{
    cleanInput();
    cleanCombination();
    cleanOutput();
}

void MainWindow::on_lineEdit_7_editingFinished()
{
     cleanOutput();
}

void MainWindow::on_lineEdit_textChanged(const QString &arg1)
{
    cleanInput();
    cleanCombination();
    cleanOutput();
}

void MainWindow::on_lineEdit_7_textChanged(const QString &arg1)
{
    cleanOutput();
}
