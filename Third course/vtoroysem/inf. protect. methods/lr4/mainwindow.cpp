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
    ui->action_16->setDisabled(true);
    ui->action_3->setDisabled(true);
    ui->action_4->setDisabled(true);
}

MainWindow::~MainWindow()
{
    delete ui;
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
    ui->action_16->setEnabled(true);
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
    ui->action_16->setEnabled(true);
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

void MainWindow::fullTableHR(){

    table[0].OA = " ";
    table[0].CA = "00";
    table[0].code = 000000;

    table[1].OA = "А";
    table[1].CA = "01";
    table[1].code = 000001;

    table[2].OA = "Б";
    table[2].CA = "02";
    table[2].code = 000010;

    table[3].OA = "В";
    table[3].CA = "03";
    table[3].code = 000011;

    table[4].OA = "Г";
    table[4].CA = "04";
    table[4].code = 000100;

    table[5].OA = "Д";
    table[5].CA = "05";
    table[5].code = 000101;

    table[6].OA = "Е";
    table[6].CA = "06";
    table[6].code = 000110;

    table[7].OA = "Ж";
    table[7].CA = "07";
    table[7].code = 000111;

    table[8].OA = "З";
    table[8].CA = "08";
    table[8].code = 001000;

    table[9].OA = "И";
    table[9].CA = "09";
    table[9].code = 001001;

    table[10].OA = "К";
    table[10].CA = "10";
    table[10].code = 001010;

    table[11].OA = "Л";
    table[11].CA = "11";
    table[11].code = 001011;

    table[12].OA = "М";
    table[12].CA = "12";
    table[12].code = 001100;

    table[13].OA = "Н";
    table[13].CA = "13";
    table[13].code = 001101;

    table[14].OA = "О";
    table[14].CA = "14";
    table[14].code = 001110;

    table[15].OA = "П";
    table[15].CA = "15";
    table[15].code = 001111;

    table[16].OA = "Р";
    table[16].CA = "16";
    table[16].code = 010000;

    table[17].OA = "С";
    table[17].CA = "17";
    table[17].code = 010001;

    table[18].OA = "Т";
    table[18].CA = "18";
    table[18].code = 010010;

    table[19].OA = "У";
    table[19].CA = "19";
    table[19].code = 010011;

    table[20].OA = "Ф";
    table[20].CA = "20";
    table[20].code = 010100;

    table[21].OA = "Х";
    table[21].CA = "21";
    table[21].code = 010101;

    table[22].OA = "Ц";
    table[22].CA = "22";
    table[22].code = 010110;

    table[23].OA = "Ч";
    table[23].CA = "23";
    table[23].code = 010111;

    table[24].OA = "Ш";
    table[24].CA = "24";
    table[24].code = 011000;

    table[25].OA = "Щ";
    table[25].CA = "25";
    table[25].code = 011001;

    table[26].OA = "Ъ";
    table[26].CA = "26";
    table[26].code = 011010;

    table[27].OA = "Ы";
    table[27].CA = "27";
    table[27].code = 011011;

    table[28].OA = "Ь";
    table[28].CA = "28";
    table[28].code = 011100;

    table[29].OA = "Э";
    table[29].CA = "29";
    table[29].code = 011101;

    table[30].OA = "Ю";
    table[30].CA = "30";
    table[30].code = 011110;

    table[31].OA = "Я";
    table[31].CA = "31";
    table[31].code = 011111;

}

unsigned long int dec2bin(int num)
{
    unsigned long int bin = 0;

    if(num == 0){
        bin = 000000;
    }
    if(num == 1){
        bin = 000001;
    }
    if(num == 2){
        bin = 000010;
    }
    if(num == 3){
        bin = 000011;
    }
    if(num == 4){
        bin = 000100;
    }
    if(num == 5){
        bin = 000101;
    }
    if(num == 6){
        bin = 000110;
    }
    if(num == 7){
        bin = 000111;
    }
    if(num == 8){
        bin = 001000;
    }
    if(num == 9){
        bin = 001001;
    }
    if(num == 10){
        bin = 001010;
    }
    if(num == 11){
        bin = 001011;
    }
    if(num == 12){
        bin = 001100;
    }
    if(num == 13){
        bin = 001101;
    }
    if(num == 14){
        bin = 001110;
    }
    if(num == 15){
        bin = 001111;
    }
    if(num == 16){
        bin = 010000;
    }
    if(num == 17){
        bin = 010001;
    }
    if(num == 18){
        bin = 010010;
    }
    if(num == 19){
        bin = 010011;
    }
    if(num == 20){
        bin = 010100;
    }
    if(num == 21){
        bin = 010101;
    }
    if(num == 22){
        bin = 010110;
    }
    if(num == 23){
        bin = 010111;
    }
    if(num == 24){
        bin = 011000;
    }
    if(num == 25){
        bin = 011001;
    }
    if(num == 26){
        bin = 011010;
    }
    if(num == 27){
        bin = 011011;
    }
    if(num == 28){
        bin = 011100;
    }
    if(num == 29){
        bin = 011101;
    }
    if(num == 30){
        bin = 011110;
    }
    if(num == 31){
        bin = 011111;
    }

    return bin;
}


//ЗАШИФРОВАТЬ

//Побитовая перестановка
void MainWindow::on_action_7_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

//Посимвольная перестановка
void MainWindow::on_action_8_triggered()
{
   QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}


//Гаммирование на основе псевдослучайных чисел
void MainWindow::on_action_9_triggered()
{
    //QTextStream QCout(stdout);
    bool wr = false;
    bool keyAction;
    fullTableHR();
    text = ui-> textEdit-> toPlainText();
    QStringList strList = text.split('\n');
    int countOfLines = ui-> textEdit -> document() -> lineCount();
    text  = strList.at(countOfLines-1);
    textLength = text.length();
    key *k = new key;
    k->show();
    metka: if (k->exec())
       keyAction = k->value();
    //Зашифровать
    cipherText = ""; //шифротекст
    if(keyAction == true){
        int T[textLength];
        unsigned long int Tin2[textLength];
        unsigned long int codeSymbIn2[textLength];
        unsigned long int resultIn2[textLength];
        T[0] = k->T0;
        for(int l = 1; l < textLength; l++){
            T[l] = ((k->A) * T[l-1] + (k->C)) % 32;
        }

        for(int l = 0; l < textLength; l++){
            Tin2[l] = dec2bin(T[l]);
         }

        for(int i = 0; i < textLength; i++){
            for(int j = 0; j < 32; j++){
                if(text[i].toUpper() == table[j].OA){
                    codeSymbIn2[i] = table[j].code;
                }
            }
        }

        for(int i = 0; i < textLength; i++){
            resultIn2[i] = codeSymbIn2[i] ^ Tin2[i];
        }

        for(int i = 0; i < textLength; i++){
            for(int j = 0; j < 32; j++){
                if(resultIn2[i] == table[j].code){
                    cipherText.append(table[j].OA);
                    wr = true;
                }
            }

            if(wr == false){
                cipherText.append(text[i]);
            }else{
                wr = false;
            }
        }

        ui->textEdit->append(cipherText);
    }else{
        if(k->exec())
            goto metka;
    }

}

//Гаммирование на основе ключа
void MainWindow::on_action_10_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}


//РАСШИФРОВАТЬ

//Побитовая перестановка
void MainWindow::on_action_11_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}


//Посимвольная перестановка
void MainWindow::on_action_12_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}

//Гаммирование на основе псевдослучайных чисел
void MainWindow::on_action_13_triggered()
{
    bool wr = false;
    bool keyAction;
    text.clear();
    fullTableHR();
    cipherText = ui-> textEdit-> toPlainText();
    QStringList strList = cipherText.split('\n');
    int countOfLines = ui-> textEdit -> document() -> lineCount();
    cipherText = strList.at(countOfLines-1);
    textLength = cipherText.length();
    key *k = new key;
    k->show();
    metka : if (k->exec())
        keyAction = k->value();
    //расшифровать
    text = "";
    if(keyAction == true){
        int T[textLength];
        unsigned long int Tin2[textLength];
        unsigned long int codeSymbIn2[textLength];
        unsigned long int resultIn2[textLength];
        T[0] = k->T0;
        for(int l = 1; l < textLength; l++){
            T[l] = ((k->A) * T[l-1] + (k->C)) % 32;
        }

        for(int l = 0; l < textLength; l++){
            Tin2[l] = dec2bin(T[l]);
        }

        for(int i = 0; i < textLength; i++){
            for(int j = 0; j < 32; j++){
                if(cipherText[i].toUpper() == table[j].OA){
                    codeSymbIn2[i] = table[j].code;
                }
            }
        }

        for(int i = 0; i < textLength; i++){
            resultIn2[i] = codeSymbIn2[i] ^ Tin2[i];
        }

        for(int i = 0; i < textLength; i++){
            for(int j = 0; j < 32; j++){
                if(resultIn2[i] == table[j].code){
                    text.append(table[j].OA);
                    wr = true;
                }
            }
            if(wr == false){
                text.append(cipherText[i]);
            }else{
                wr = false;
            }
        }

        ui->textEdit->append(text);
    }else{
        if(k->exec())
            goto metka;
    }
}

//Гаммирование на основе ключа
void MainWindow::on_action_14_triggered()
{
    QMessageBox::warning(this,"Предупреждение","Указанный метод не реализован");
}


//Справка

//О программе
void MainWindow::on_action_15_triggered()
{
    QMessageBox::information(this,"О программе","Программа реализует метод шифрования сообщения с помощью гаммирование на основе псевдослучайных чисел.\nПрограмму разработала Куликова Э.В. из группы ИПБ-17.\n");
}

//Помощь
void MainWindow::on_action_16_triggered()
{
    QMessageBox::information(this,"Помощь","Гаммирование на основе псевдослучайных чисел.\nГаммирование – метод криптографического преобразования, заключающийся в том, что символы шифруемого текста складываются с символами некоторой случайной последовательности,\nназываемой гаммой шифра или ключевой гаммой.\nПсевдослучайные последовательности, построенные на основе линейного конгруэнтного датчика псевдослучайных чисел (ПСЧ).\nОн вырабатывает последовательности псевдослучайных чисел T(i), описываемые соотношением T(i+1) = (A·T(i)+C) mod m,\nгде А и С – константы, Т(0) – исходная величина, выбранная в качестве порождающего числа.\nЭти три величины и образуют ключ.");
}


//Выход
void MainWindow::actionTriggered()
{
    close();
}
