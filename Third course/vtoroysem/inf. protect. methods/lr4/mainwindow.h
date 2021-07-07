#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    QString text;
    QString cipherText;
    int textLength;
    struct tableHR{
        QString OA;
        QString CA;
        unsigned long int code;
    };
    tableHR table[32];
    QString fileNameToSave;
    ~MainWindow();

private slots:
    void actionTriggered();

    void on_action_triggered();
    void on_action_2_triggered();
    void on_action_3_triggered();
    void on_action_4_triggered();
    void on_action_6_triggered();

    void on_action_7_triggered();
    void on_action_8_triggered();
    void on_action_9_triggered();
    void on_action_10_triggered();

    void on_action_11_triggered();
    void on_action_12_triggered();
    void on_action_13_triggered();
    void on_action_14_triggered();

    void on_action_15_triggered();
    void on_action_16_triggered();

    void fullTableHR();

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
