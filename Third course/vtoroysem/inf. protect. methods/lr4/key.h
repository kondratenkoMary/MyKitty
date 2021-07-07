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
    bool value();
    int A;
    int C;
    int T0;

private slots:

private:
    Ui::key *ui;
};

#endif // KEY_H
