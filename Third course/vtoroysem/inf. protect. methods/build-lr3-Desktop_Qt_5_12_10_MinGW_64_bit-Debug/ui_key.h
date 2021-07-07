/********************************************************************************
** Form generated from reading UI file 'key.ui'
**
** Created by: Qt User Interface Compiler version 5.12.10
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_KEY_H
#define UI_KEY_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>

QT_BEGIN_NAMESPACE

class Ui_key
{
public:
    QDialogButtonBox *buttonBox;
    QLineEdit *lineEdit;
    QLabel *label;

    void setupUi(QDialog *key)
    {
        if (key->objectName().isEmpty())
            key->setObjectName(QString::fromUtf8("key"));
        key->resize(306, 215);
        buttonBox = new QDialogButtonBox(key);
        buttonBox->setObjectName(QString::fromUtf8("buttonBox"));
        buttonBox->setGeometry(QRect(-100, 110, 351, 51));
        QFont font;
        font.setFamily(QString::fromUtf8("Times New Roman"));
        font.setPointSize(12);
        buttonBox->setFont(font);
        buttonBox->setOrientation(Qt::Horizontal);
        buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok);
        lineEdit = new QLineEdit(key);
        lineEdit->setObjectName(QString::fromUtf8("lineEdit"));
        lineEdit->setGeometry(QRect(50, 70, 221, 31));
        lineEdit->setFont(font);
        label = new QLabel(key);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(10, 30, 291, 41));
        label->setFont(font);

        retranslateUi(key);
        QObject::connect(buttonBox, SIGNAL(accepted()), key, SLOT(accept()));
        QObject::connect(buttonBox, SIGNAL(rejected()), key, SLOT(reject()));

        QMetaObject::connectSlotsByName(key);
    } // setupUi

    void retranslateUi(QDialog *key)
    {
        key->setWindowTitle(QApplication::translate("key", "\320\232\320\273\321\216\321\207", nullptr));
        label->setText(QApplication::translate("key", "\320\232\320\276\320\273\320\270\321\207\320\265\321\201\321\202\320\262\320\276 \320\267\320\260\320\272\321\200\321\213\321\202\321\213\321\205 \320\260\320\273\321\204\320\260\320\262\320\270\321\202\320\276\320\262:", nullptr));
    } // retranslateUi

};

namespace Ui {
    class key: public Ui_key {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_KEY_H
