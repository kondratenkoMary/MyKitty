#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->pushButton_2->setEnabled(false);
    ui->pushButton_3->setEnabled(false);
}

MainWindow::~MainWindow()
{
    delete ui;
}


// a^b mod n
int ApowerBmodN(int _a, int _b, int _n){

    int tmp = _a;
    int sum = tmp;

    for(int i = 1; i < _b; i++){
        for(int j = 1; j < _a; j++){
            sum += tmp;
            if(sum >= _n){
                sum -= _n;
            }
        }
        tmp = sum;
    }

    return tmp;
}

// a*b mod n
int AmulBmodN(int _a, int _b, int _n){

    int sum = 0;

    for(int i = 0; i < _b; i++){
        sum += _a;
        if(sum >= _n){
            sum -= _n;
        }
    }

    return sum;
}


//эти 2 функции нужны чтобы посчитать обратное мультипликативное для b
void extended_euclid(long _a, long _b, long *x, long *y, long *d) {

  long q, r, x1, x2, y1, y2;

  if (_b == 0) {
      *d = _a, *x = 1, *y = 0;
      return;
  }
  x2 = 1, x1 = 0, y2 = 0, y1 = 1;
  while (_b > 0) {
    q = _a / _b, r = _a - q * _b;
    *x = x2 - q * x1, *y = y2 - q * y1;
    _a = _b, _b = r;
    x2 = x1, x1 = *x, y2 = y1, y1 = *y;
  }
  *d = _a, *x = x2, *y = y2;
}

long inverse(long _a, long _n) {
  long d, x, y;
  extended_euclid(_a, _n, &x, &y, &d);
  if (d == 1)
      return x;

  return 0;
}


//это поверка на взаимную простоту чисел
bool isCoprime(int _a, int _b) {
    for (int gcd = _a; ; gcd = _b, _b = _a % _b, _a = gcd)
        if (!_b)
            return gcd == 1;
}

void MainWindow::on_pushButton_4_clicked()
{
    close();
}


void MainWindow::on_pushButton_clicked()
{
    if (ui->lineEdit->text() == "" || ui->lineEdit_2->text()=="" || ui->lineEdit_3->text()==""){

        QMessageBox::critical(this, "Ошибка", "Не все поля заполнены");
        return;
    }

    //вводим некоторое большое простое целое число P
    p = ui->lineEdit->text().toInt();
    for (int i = 2; i <= sqrt(p); i++){
        if (p % i == 0) {
             ui->lineEdit->setStyleSheet("QLineEdit {background-color : red; color : white}");
             QMessageBox::critical(this, "Ошибка", "P должно быть простым числом");
             ui->lineEdit->clear();
             return;
        }
    }

    //большое целое число G, такое что G < P
    g = ui->lineEdit_2->text().toInt();
    if (g >= p){
         ui->lineEdit_2->setStyleSheet("QLineEdit {background-color : red; color : white}");
         QMessageBox::critical(this, "Ошибка", " G должно быть меньше  P");
         ui->lineEdit_2->clear();
         return;
    }

    // вводим случайное целое число X, удовлетворяющее условию: X > 1 && X <= (P-1)
    x = ui->lineEdit_3->text().toInt();
    if ((x <= 1 )||(x > (p - 1))){
         ui->lineEdit_3->setStyleSheet("QLineEdit {background-color : red; color : white}");
         QMessageBox::critical(this, "Ошибка", "X = "+ui->lineEdit_3->text()+" не удовлетворяет условиям");
         ui->lineEdit_3->clear();
         return;
    }

   // Y – ОТКРЫТЫЙ КЛЮЧ, используемый для проверки электронной подписи отправителя
   y = ApowerBmodN(g, x, p);
   ui->lineEdit_4->setText(QString::number(y));

   ui->pushButton_2->setEnabled(true);

}

void MainWindow::on_pushButton_2_clicked()
{

   if (ui->lineEdit_4->text() == "" || ui->lineEdit_5->text()=="" || ui->lineEdit_6->text()==""){
       QMessageBox::critical(this, "Ошибка", "Не все поля заполнены");
       return;
   }

   //m - хеш-значение пересылаемого текста – целое число,
   //удовлетворяющее условию: m > 1 && m < (P-1)
   m = ui->lineEdit_6->text().toInt();

   if ((m <= 1 )||(m >= (p-1))){
        ui->lineEdit_6->setStyleSheet("QLineEdit {background-color : red; color : white}");
        QMessageBox::critical(this, "Ошибка", "m = "+ui->lineEdit_6->text()+" не удовлетворяет условиям");
        ui->lineEdit_6->clear();
        return;
   }

   //случайное целое число K, находящееся в диапазоне (1; p-1),
   //такое что K и P-1, являются взаимно-простыми (НОД = 1)
   k = ui->lineEdit_5->text().toInt();
   if ((k < 1 )||(k > (p-1))){
       ui->lineEdit_5->setStyleSheet("QLineEdit {background-color : red; color : white}");
       QMessageBox::critical(this, "Ошибка", "K = "+ui->lineEdit_5->text()+" не удовлетворяет условиям");
       ui->lineEdit_5->clear();
       return;
    }

    int a = k, b = p-1, nod = 1;
    for (int i = a; i > 0; i--){
         if ((a % i == 0) && (b % i == 0)){
             nod = i;
             break;
         }
    }
    if (nod != 1){
         ui->lineEdit_5->setStyleSheet("QLineEdit {background-color : red; color : white}");
         QMessageBox::critical(this, "Ошибка", "K и (P-1) делятся на "+QString::number(nod)+", т.е. не являются взаимно простыми");
         ui->lineEdit_5->clear();
         return;
    }


    p = ui->lineEdit->text().toInt();
    g = ui->lineEdit_2->text().toInt();
    x = ui->lineEdit_3->text().toInt();
    y=ApowerBmodN(g,x,p);
    m = ui->lineEdit_6->text().toInt();
    k = ui->lineEdit_5->text().toInt();
    ui->lineEdit_4->setText(QString::number(y));

    a = ApowerBmodN(g,k,p);

    int temp = inverse(k,p-1);
    int l = (m - x * a) * temp;
    if (l < 0){
        b = ((m - x * a) * temp) % (p-1) + (p-1);
    }else
        b =((m - x * a) * temp) % (p-1);

    ui->lineEdit_7->setText(QString::number(a));
    ui->lineEdit_8->setText(QString::number(b));
    ui->pushButton_3->setEnabled(true);

}


void MainWindow::on_pushButton_3_clicked()
{
    if (ui->lineEdit_9->text() == "" || ui->lineEdit_10->text() == "" || ui->lineEdit_11->text() == ""){
        QMessageBox::critical(this, "Ошибка", "Не все поля заполнены");
        return;
    }

   double m = ui->lineEdit_9->text().toDouble();
   double a = ui->lineEdit_10->text().toDouble();
   double b = ui->lineEdit_11->text().toDouble();
   double A1 = AmulBmodN(ApowerBmodN(y,a,p),ApowerBmodN(a,b,p),p);
   double A2 = ApowerBmodN(g,m,p);

   if (A1 == A2){
       ui->lineEdit_12->setText("Сообщение подлиное");
   }else
       ui->lineEdit_12->setText("Сообщение недостоверное");
}


void MainWindow::on_lineEdit_cursorPositionChanged()
{
    ui->lineEdit->setStyleSheet("QLineEdit {background-color : white; color : black}");
}


void MainWindow::on_lineEdit_2_cursorPositionChanged()
{
    ui->lineEdit_2->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_3_cursorPositionChanged()
{
    ui->lineEdit_3->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_5_cursorPositionChanged()
{
    ui->lineEdit_5->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_6_cursorPositionChanged()
{
    ui->lineEdit_6->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_7_cursorPositionChanged()
{
    ui->lineEdit_7->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_8_cursorPositionChanged()
{
    ui->lineEdit_8->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_9_cursorPositionChanged()
{
    ui->lineEdit_9->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_10_cursorPositionChanged()
{
    ui->lineEdit_10->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_11_cursorPositionChanged()
{
    ui->lineEdit_11->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_4_cursorPositionChanged()
{
    ui->lineEdit_4->setStyleSheet("QLineEdit {background-color : white; color : black}");
}

void MainWindow::on_lineEdit_textChanged(const QString &arg1)
{
    ui->lineEdit_4->clear();
    ui->lineEdit_5->clear();
    ui->lineEdit_6->clear();
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_2_textChanged(const QString &arg1)
{
    ui->lineEdit_4->clear();
    ui->lineEdit_5->clear();
    ui->lineEdit_6->clear();
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_3_textChanged(const QString &arg1)
{
    ui->lineEdit_4->clear();
    ui->lineEdit_5->clear();
    ui->lineEdit_6->clear();
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_4_textChanged(const QString &arg1)
{
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_5_textChanged(const QString &arg1)
{
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_6_textChanged(const QString &arg1)
{
    ui->lineEdit_7->clear();
    ui->lineEdit_8->clear();
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
}

void MainWindow::on_lineEdit_7_textChanged(const QString &arg1)
{
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_8_textChanged(const QString &arg1)
{
    ui->lineEdit_9->clear();
    ui->lineEdit_10->clear();
    ui->lineEdit_11->clear();
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_9_textChanged(const QString &arg1)
{
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_10_textChanged(const QString &arg1)
{
    ui->lineEdit_12->clear();
}

void MainWindow::on_lineEdit_11_textChanged(const QString &arg1)
{
    ui->lineEdit_12->clear();
}
