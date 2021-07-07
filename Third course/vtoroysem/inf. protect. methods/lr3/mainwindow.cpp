#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QFileDialog>
#include <QTextStream>
#include <QFile>
#include <QMessageBox>
#include <QDialog>
#include <QTextCodec>
#include "key.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->textEdit->setDisabled(1);
    QAction *action = this->ui->menuBar->addAction("Выход");
    this->connect(action, &QAction::triggered, this, &MainWindow::actionTriggered);
    ui->menu_2->setDisabled(true);
    ui->menu_3->setDisabled(true);
    ui->action_8->setDisabled(true);
    ui->action_3->setDisabled(true);
    ui->action_4->setDisabled(true);

}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::fullTableHR(){

    table[0].OA = " ";
    table[0].CA1 = "00";
    table[0].CA2 = "32";
    table[0].CA3 = "64";
    table[0].amount = 0;

    table[1].OA = "А";
    table[1].CA1 = "01";
    table[1].CA2 = "33";
    table[1].CA3 = "65";
    table[1].amount = 0;

    table[2].OA = "Б";
    table[2].CA1 = "02";
    table[2].CA2 = "34";
    table[2].CA3 = "66";
    table[2].amount = 0;

    table[3].OA = "В";
    table[3].CA1 = "03";
    table[3].CA2 = "35";
    table[3].CA3 = "67";
    table[3].amount = 0;

    table[4].OA = "Г";
    table[4].CA1 = "04";
    table[4].CA2 = "36";
    table[4].CA3 = "68";
    table[4].amount = 0;

    table[5].OA = "Д";
    table[5].CA1 = "05";
    table[5].CA2 = "37";
    table[5].CA3 = "69";
    table[5].amount = 0;

    table[6].OA = "Е";
    table[6].CA1 = "06";
    table[6].CA2 = "38";
    table[6].CA3 = "70";
    table[6].amount = 0;

    table[7].OA = "Ж";
    table[7].CA1 = "07";
    table[7].CA2 = "39";
    table[7].CA3 = "71";
    table[7].amount = 0;

    table[8].OA = "З";
    table[8].CA1 = "08";
    table[8].CA2 = "40";
    table[8].CA3 = "72";
    table[8].amount = 0;

    table[9].OA = "И";
    table[9].CA1 = "09";
    table[9].CA2 = "41";
    table[9].CA3 = "73";
    table[9].amount = 0;

    table[10].OA = "К";
    table[10].CA1 = "10";
    table[10].CA2 = "42";
    table[10].CA3 = "74";
    table[10].amount = 0;

    table[11].OA = "Л";
    table[11].CA1 = "11";
    table[11].CA2 = "43";
    table[11].CA3 = "75";
    table[11].amount = 0;

    table[12].OA = "М";
    table[12].CA1 = "12";
    table[12].CA2 = "44";
    table[12].CA3 = "76";
    table[12].amount = 0;

    table[13].OA = "Н";
    table[13].CA1 = "13";
    table[13].CA2 = "45";
    table[13].CA3 = "77";
    table[13].amount = 0;

    table[14].OA = "О";
    table[14].CA1 = "14";
    table[14].CA2 = "46";
    table[14].CA3 = "78";
    table[14].amount = 0;

    table[15].OA = "П";
    table[15].CA1 = "15";
    table[15].CA2 = "47";
    table[15].CA3 = "79";
    table[15].amount = 0;

    table[16].OA = "Р";
    table[16].CA1 = "16";
    table[16].CA2 = "48";
    table[16].CA3 = "80";
    table[16].amount = 0;

    table[17].OA = "С";
    table[17].CA1 = "17";
    table[17].CA2 = "49";
    table[17].CA3 = "81";
    table[17].amount = 0;

    table[18].OA = "Т";
    table[18].CA1 = "18";
    table[18].CA2 = "50";
    table[18].CA3 = "82";
    table[18].amount = 0;

    table[19].OA = "У";
    table[19].CA1 = "19";
    table[19].CA2 = "51";
    table[19].CA3 = "83";
    table[19].amount = 0;

    table[20].OA = "Ф";
    table[20].CA1 = "20";
    table[20].CA2 = "52";
    table[20].CA3 = "84";
    table[20].amount = 0;

    table[21].OA = "Х";
    table[21].CA1 = "21";
    table[21].CA2 = "53";
    table[21].CA3 = "85";
    table[21].amount = 0;

    table[22].OA = "Ц";
    table[22].CA1 = "22";
    table[22].CA2 = "54";
    table[22].CA3 = "86";
    table[22].amount = 0;

    table[23].OA = "Ч";
    table[23].CA1 = "23";
    table[23].CA2 = "55";
    table[23].CA3 = "87";
    table[23].amount = 0;

    table[24].OA = "Ш";
    table[24].CA1 = "24";
    table[24].CA2 = "56";
    table[24].CA3 = "88";
    table[24].amount = 0;

    table[25].OA = "Щ";
    table[25].CA1 = "25";
    table[25].CA2 = "57";
    table[25].CA3 = "89";
    table[25].amount = 0;

    table[26].OA = "Ъ";
    table[26].CA1 = "26";
    table[26].CA2 = "58";
    table[26].CA3 = "90";
    table[26].amount = 0;

    table[27].OA = "Ы";
    table[27].CA1 = "27";
    table[27].CA2 = "59";
    table[27].CA3 = "91";
    table[27].amount = 0;

    table[28].OA = "Ь";
    table[28].CA1 = "28";
    table[28].CA2 = "60";
    table[28].CA3 = "92";
    table[28].amount = 0;

    table[29].OA = "Э";
    table[29].CA1 = "29";
    table[29].CA2 = "61";
    table[29].CA3 = "93";
    table[29].amount = 0;

    table[30].OA = "Ю";
    table[30].CA1 = "30";
    table[30].CA2 = "62";
    table[30].CA3 = "94";
    table[30].amount = 0;

    table[31].OA = "Я";
    table[31].CA1 = "31";
    table[31].CA2 = "63";
    table[31].CA3 = "95";
    table[31].amount = 0;
}

//ФАЙЛ
//Создать
void MainWindow::on_action_triggered()
{
    ui->textEdit->clear();
    text = "";
    cipherText = "";
    textLength = 0;
    ui->textEdit->setEnabled(true);
    ui->menu_2->setEnabled(true);
    ui->menu_3->setEnabled(true);
    ui->action_8->setEnabled(true);
    ui->action_4->setEnabled(true);
}


//Открыть
void MainWindow::on_action_2_triggered()
{
    fileNameToSave = QFileDialog::getOpenFileName (this,"Open Dialog", "", "*.txt");
    QFile file(fileNameToSave);
    QTextStream in(&file);
    file.open(QIODevice::ReadOnly);
    in.setCodec(QTextCodec::codecForName("Windows-1251"));
    ui->textEdit->setText(in.readAll());
    text = "";
    cipherText = "";
    textLength = 0;
    ui->textEdit->setEnabled(true);
    ui->menu_2->setEnabled(true);
    ui->menu_3->setEnabled(true);
    ui->action_8->setEnabled(true);
    ui->action_3->setEnabled(true);
    ui->action_4->setEnabled(true);
    file.close();
}

//Сохранить
void MainWindow::on_action_3_triggered()
{
        QFile file(fileNameToSave);
        QTextStream out(&file);
        file.open(QIODevice::WriteOnly);
        QString str = ui-> textEdit-> toPlainText();
        QStringList strList = str.split('\n');
        int k = ui-> textEdit -> document() -> lineCount();
        str = strList.at(k-1);
        out << str;
        out.flush();
        file.close();

}

//Сохранить как
void MainWindow::on_action_4_triggered()
{
    QString fileName = QFileDialog::getSaveFileName(this,"Save Dialog","","*.txt");
    if (fileName!="") {
        QFile file(fileName);
        QTextStream out(&file);
        file.open(QIODevice::WriteOnly);
        QString str = ui-> textEdit-> toPlainText();
        QStringList strList = str.split('\n');
        int k = ui-> textEdit -> document() -> lineCount();
        str = strList.at(k-1);
        out << str;
        out.flush();
        file.close();
    }

}

//Выход
void MainWindow::on_action_6_triggered()
{
    close();
}


//ЗАШИФРОВАТЬ

//МОНОАЛФАВИТНЫЙ
void MainWindow::on_action_9_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

//ГОМОФОНИЧЕСКАЯ
void MainWindow::on_action_10_triggered()
{
    bool wr = false;
    fullTableHR();
    text = ui-> textEdit-> toPlainText();
    QStringList strList = text.split('\n');
    int countOfLines = ui-> textEdit -> document() -> lineCount();
    text  = strList.at(countOfLines-1);
    key *k = new key;
    k->show();
    if (k->exec())
        countCA = k->value();
    //Зашифровать
    cipherText = ""; //шифротекст
    if(countCA == 1){
        for(int i = 0; i < text.length(); i++){
            for(int j = 0; j < 32; j++){
                if(text[i].toUpper() == table[j].OA){
                    cipherText.append(table[j].CA1 + " ");
                    wr = true;
                }

            }
            if(wr == false){
                if((text[i].isDigit()) && (text[i+1].isDigit())){
                     cipherText.append(text[i]);
                     cipherText.append(text[i + 1] + " ");
                     i++;
                }else{
                    cipherText.append(text[i] + " ");
                }
            }else{
                wr = false;
            }
        }
    }
    if(countCA == 2){
        for(int i = 0; i < text.length(); i++){
            for(int j = 0; j < 32; j++){
                if(text[i].toUpper() == table[j].OA){
                    table[j].amount++;
                    if(table[j].amount == 1){
                        cipherText.append(table[j].CA1 + " ");
                        wr = true;
                    }
                    else if(table[j].amount == 2){
                        cipherText.append(table[j].CA2 + " ");
                        wr = true;
                    }else{
                        table[j].amount = 1;
                        cipherText.append(table[j].CA1 + " ");
                        wr = true;
                    }
                }

            }
            if(wr == false){
                if((text[i].isDigit()) && (text[i+1].isDigit())){
                     cipherText.append(text[i]);
                     cipherText.append(text[i + 1] + " ");
                     i++;
                }else{
                    cipherText.append(text[i] + " ");
                }
            }else{
                wr = false;
            }

        }
    }
    if(countCA == 3){
        for(int i = 0; i < text.length(); i++){
            for(int j = 0; j < 32; j++){
                if(text[i].toUpper() == table[j].OA){
                    table[j].amount++;
                    if(table[j].amount == 1){
                        cipherText.append(table[j].CA1 + " ");
                        wr = true;
                    }else if(table[j].amount == 2){
                        cipherText.append(table[j].CA2 + " ");
                        wr = true;
                    }else if(table[j].amount == 3){
                        cipherText.append(table[j].CA3 + " ");
                        wr = true;
                    }else{
                        table[j].amount = 1;
                        cipherText.append(table[j].CA1 + " ");
                        wr = true;
                    }

                }

          }
            if(wr == false){
                if((text[i].isDigit()) && (text[i+1].isDigit())){
                     cipherText.append(text[i]);
                     cipherText.append(text[i + 1] + " ");
                     i++;
                }else{
                    cipherText.append(text[i] + " ");
                }
            }else{
                wr = false;
            }

       }
    }
    ui->textEdit->append(cipherText);

}

//ПОЛИАЛФАВИТНЫЙ
void MainWindow::on_action_11_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

//ПОЛИГРАММНАЯ
void MainWindow::on_action_12_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}


//РАСШИФРОВАТЬ

//МОНОАЛФАВИТНЫЙ
void MainWindow::on_action_13_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

bool isAlpha(QString str){
    for ( int i = 0; i < str.size(); i++ ) {
      if ( ( ( str[i] >= "А" ) && ( str[i] <= "Я"  ) )
            || ( ( str[i] >= "а"  ) && ( str[i] <= "я"  ) )
         ) {
          return true;
      }
      if ( ( ( str[i] >= "A" ) && ( str[i] <= "Z"  ) )
            || ( ( str[i] >= "a"  ) && ( str[i] <= "z"  ) )
         ) {
          return true;
      }
    }
    return false;
}



//ГОМОФОНИЧЕСКАЯ
void MainWindow::on_action_14_triggered()
{
    bool wr = false;
    text.clear();
    fullTableHR();
    cipherText = ui-> textEdit-> toPlainText();
    QStringList strList = cipherText.split('\n');
    int countOfLines = ui-> textEdit -> document() -> lineCount();
    cipherText = strList.at(countOfLines-1);
    key *k = new key;
    k->show();
    if (k->exec())
        countCA = k->value();
    QString cipherTextDop = cipherText;
    //расшифровать
    if(countCA == 1){
        for(int i = 0; i < cipherText.length(); i++){
            QString subStr = cipherTextDop.left(2);
            for(int j = 0; j < 32; j++){
                if(subStr == table[j].CA1){
                    text.append(table[j].OA);
                    wr = true;
                }
            }
            if(wr == false){
                text.append(subStr.trimmed());
            }else{
                wr = false;
            }
            if(isAlpha(subStr)){
                cipherTextDop.remove(0,2);
            }else{
                cipherTextDop.remove(0,3);
            }

        }
    }
    if(countCA == 2){
        for(int i = 0; i < cipherText.length(); i++){
            QString subStr = cipherTextDop.left(2);
            for(int j = 0; j < 32; j++){
                if(subStr == table[j].CA1){
                    text.append(table[j].OA);
                    wr = true;
                }else if(subStr == table[j].CA2){
                    text.append(table[j].OA);
                    wr = true;
                }
            }
            if(wr == false){
                text.append(subStr.trimmed());
            }else{
                wr = false;
            }
            if(isAlpha(subStr)){
                cipherTextDop.remove(0,2);
            }else{
                cipherTextDop.remove(0,3);
            }
        }
    }
    if(countCA == 3){
        for(int i = 0; i < cipherText.length(); i++){
            QString subStr = cipherTextDop.left(2);
            for(int j = 0; j < 32; j++){
                if(subStr == table[j].CA1){
                    text.append(table[j].OA);
                    wr = true;
                }else if(subStr == table[j].CA2){
                    text.append(table[j].OA);
                    wr = true;
                }else if(subStr == table[j].CA3){
                    text.append(table[j].OA);
                    wr = true;
                }
            }
            if(wr == false){
                text.append(subStr.trimmed());
            }else{
                wr = false;
            }
            if(isAlpha(subStr)){
                cipherTextDop.remove(0,2);
            }else{
                cipherTextDop.remove(0,3);
            }
        }
    }
     ui->textEdit->append(text);
}

//ПОЛИАЛФАВИТНЫЙ
void MainWindow::on_action_15_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

//ПОЛИГРАММНАЯ
void MainWindow::on_action_16_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

//Справка

//О программе
void MainWindow::on_action_7_triggered()
{
    QMessageBox::information(this,"О программе","Программа реализует метод шифрования сообщения с помощью гомофонической замены.\nПрограмму разработала Куликова Э.В. из группы ИПБ-17.\n");
}

//Помощь
void MainWindow::on_action_8_triggered()
{
    QMessageBox::information(this,"Помощь","Гомофоническая замена.\nВ гомофонической замене одному символу открытого текста ставит в соответствие несколько символов шифротекста, которые чередуются по мере повторения.\nСуществует таблица, устанавливающая соответствие символов открытого алфавита  и чисел закрытых алфавитов.\nВид таблицы гомофонической замены и количество закрытых алфавитов являются ключом шифра гомофонической замены.\n");
}


//Выход
void MainWindow::actionTriggered()
{
    close();
}
