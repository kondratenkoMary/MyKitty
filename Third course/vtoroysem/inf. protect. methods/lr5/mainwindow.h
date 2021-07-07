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
    ~MainWindow();
    int p = 0;
    int g = 0;
    int x = 0;
    int y = 0;
    int k = 0;
    int m = 0;

private slots:
    void on_pushButton_4_clicked();
    void on_pushButton_clicked();
    void on_pushButton_2_clicked();
    void on_pushButton_3_clicked();

    void on_lineEdit_cursorPositionChanged();
    void on_lineEdit_2_cursorPositionChanged();
    void on_lineEdit_3_cursorPositionChanged();
    void on_lineEdit_4_cursorPositionChanged();
    void on_lineEdit_5_cursorPositionChanged();
    void on_lineEdit_6_cursorPositionChanged();
    void on_lineEdit_7_cursorPositionChanged();
    void on_lineEdit_8_cursorPositionChanged();
    void on_lineEdit_9_cursorPositionChanged();
    void on_lineEdit_10_cursorPositionChanged();
    void on_lineEdit_11_cursorPositionChanged();

    void on_lineEdit_textChanged(const QString &arg1);
    void on_lineEdit_2_textChanged(const QString &arg1);
    void on_lineEdit_3_textChanged(const QString &arg1);
    void on_lineEdit_4_textChanged(const QString &arg1);
    void on_lineEdit_5_textChanged(const QString &arg1);
    void on_lineEdit_6_textChanged(const QString &arg1);
    void on_lineEdit_7_textChanged(const QString &arg1);
    void on_lineEdit_8_textChanged(const QString &arg1);
    void on_lineEdit_9_textChanged(const QString &arg1);
    void on_lineEdit_10_textChanged(const QString &arg1);
    void on_lineEdit_11_textChanged(const QString &arg1);

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
