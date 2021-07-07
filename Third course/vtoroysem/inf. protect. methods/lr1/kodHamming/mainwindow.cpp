#include "mainwindow.h"
#include "qbitarray.h"
#include "ui_mainwindow.h"

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


void MainWindow::CleanInf(){
    ui->lineEdit_2->clear();
    ui->lineEdit_3->clear();
    ui->lineEdit_4->clear();
    k=0;
    m=0;
    n=0;
    input = "";
}

void MainWindow::CleanCombA(){
    ui->lineEdit_5->clear();
    ui->lineEdit_6->clear();
    ui->comboBox->clear();
    controlNumber = "";
    control = "";
}


void MainWindow::CleanResult(){
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->comboBox_2->clear();
    output = "";
}


//ВВОД
void MainWindow::on_pushButton_clicked(){
    CleanInf();
    CleanCombA();
    CleanResult();
    input = ui->lineEdit->text();
    k = input.length();
    ui->lineEdit_2->setText(QString::number(k));
    for(m = 3; m < 6; m++){
        if(pow(2,m) > k + m)
            break;
    }
    ui->lineEdit_3->setText(QString::number(m));
    n = k + m;
    ui->lineEdit_4->setText(QString::number(n));
}


//контрольные биты
char MainWindow::summBit(int ai, QString line){
   char sum = '0';
   for (int i = ai;i <= n; i = i + ai){
       for (int j = 0; (j < ai) && (i <= n); j++,i++){
         if (line[i] == '1'){
             if (sum == '0')
                 sum = '1';
             else
                 sum = '0';
         }
       }
   }
   return sum;
}


//бит чётности
char MainWindow::evenBit(QString line){
    char bCh = '0';
    for (int i = 0; i <= n; i++){
         if (line[i]=='1'){
             if (bCh == '0')
                 bCh = '1';
             else bCh = '0';
         }
    }
    return bCh;
}

//кодировать
void MainWindow::on_pushButton_2_clicked(){
    CleanCombA();
    CleanResult();
    for (int i = 0, pos; i < m; i++){
       pos = pow(2,i);
       control[pos] = 'k';
    }
    control[0] = 'b';

    controlNumber[0] = 0;
    for (int i = 1, ib = 0; i <= n; i++)
        if (control[i] != 'k'){
            controlNumber[i] = input[ib];
            ib++;
        }
    for (int i = 1; i <= n; i++)
        if (control[i] == 'k')
             controlNumber[i] = summBit(i, controlNumber);
    controlNumber[0] = evenBit(controlNumber);

    QString str;
    for (int i = 0; i <= n; i++)
        if ((control[i] == 'k')||(control[i] == 'b')){
            str = "a";
            str.append(char (i+48));
            str.append(" = ");
            str.append(controlNumber[i]);
            ui->comboBox -> addItem(str);
        }
     ui->lineEdit_5->setText(controlNumber);
     ui->lineEdit_6->setText(controlNumber);

}

//номер ошибки
int MainWindow::findN(QString str)
{
    int N = 0;
     for (int i = 0; i < m; i++)
         if (str[i] == '1')
             N += pow(2,m-i-1);
    return N;
}

//декодировать
void MainWindow::on_pushButton_3_clicked()
{
    CleanResult();
    if (ui->lineEdit_6->text() == 0)
        ui->lineEdit_6->setText(controlNumber);
     output = ui->lineEdit_6->text();

     bool r = false, bCh = false;
     QString str = "", strE,result;

     char c = evenBit(output) ;
     str.append("E");
     str.append(48);
     str.append(" = ");
     str.append(c);
     ui->comboBox_2 -> addItem(str);

     if (c != '0')
         bCh = true;

     for (int i = 1, j = m - 1; i <= n; i++){
        if (control[i] == 'k'){
            str = "E";
            str.append(char(48 + i));
            str.append(" = ");
            c = summBit(i, output);
            str.append(c);
            ui->comboBox_2 -> addItem(str);

            strE[j] = c;
            j--;

            if (c == '1')
                r = true;
      }
     }
     ui->lineEdit_7->setText(strE);
     result = ui->lineEdit_6->text();
     int pos = (findN(strE));
     for(int l = 0; l < result.length();l++){
         if(l == pos){
             if(result[l] == '0')
                 result[l] = '1';
             else result[l] = '0';
         }
     }
    if (!r){
         if (!bCh){
            ui->lineEdit_8->setText("0");
            ui->lineEdit_10->setText(input);
         }else{
            ui->lineEdit_10->setText("Произошла трехкратная (или более высокой, но нечетной кратности) ошибка");
         }
    }else {
        if (bCh){
            ui->lineEdit_8->setText("1");
            ui->lineEdit_9->setText(QString::number(findN(strE)));
           ui->lineEdit_10->setText(input);
        }else{
            ui->lineEdit_8->setText("2");
            ui->lineEdit_10->setText("Повторная передача");
        }

    }
}


//выход
void MainWindow::on_pushButton_4_clicked()
{
    QApplication::exit();
}


void MainWindow::on_lineEdit_editingFinished()
{
    CleanInf();
    CleanCombA();
    CleanResult();
}

void MainWindow::on_lineEdit_3_editingFinished()
{
     CleanResult();
}

void MainWindow::on_lineEdit_textChanged(const QString &arg1)
{
    CleanInf();
    CleanCombA();
    CleanResult();
}

void MainWindow::on_lineEdit_3_textChanged(const QString &arg1)
{
     CleanResult();
}

void MainWindow::on_lineEdit_6_textChanged(const QString &arg1)
{
     CleanResult();
}
