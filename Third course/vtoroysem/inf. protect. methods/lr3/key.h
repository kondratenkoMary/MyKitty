#ifndef KEY_H
#define KEY_H

#include <QDialog>

namespace Ui {
class key;
}

class key : public QDialog
{
    Q_OBJECT

public:
    explicit key(QWidget *parent = 0);
    ~key();
    int value();//метод, возвращающий количество закрытых алфавитов


private slots:


private:
    Ui::key *ui;
};

#endif // KEY_H
