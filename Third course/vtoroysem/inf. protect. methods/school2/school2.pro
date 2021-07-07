#-------------------------------------------------
#
# Project created by QtCreator 2019-05-01T15:29:23
#
#-------------------------------------------------

QT       += core gui
QT       += sql
QT       += printsupport
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets printsupport

TARGET = school2
TEMPLATE = app

# The following define makes your compiler emit warnings if you use
# any feature of Qt which has been marked as deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0


SOURCES += \
        main.cpp \
        mainwindow.cpp \
    dialog.cpp \
    dialog2.cpp \
    dialog3.cpp \
    dialog4.cpp \
    prepodred.cpp \
    prepod.cpp \
    listenerred.cpp \
    schoolred.cpp \
    predmetred.cpp \
    consred.cpp \
    listener.cpp \
    school.cpp \
    predmet.cpp \
    consult.cpp \
    qcustomplot.cpp \
    graph.cpp

HEADERS += \
        mainwindow.h \
    dialog.h \
    dialog2.h \
    dialog3.h \
    dialog4.h \
    prepodred.h \
    prepod.h \
    listenerred.h \
    schoolred.h \
    predmetred.h \
    consred.h \
    listener.h \
    school.h \
    predmet.h \
    consult.h \
    qcustomplot.h \
    graph.h

FORMS += \
        mainwindow.ui \
    dialog.ui \
    dialog2.ui \
    dialog3.ui \
    dialog4.ui \
    prepodred.ui \
    listenerred.ui \
    schoolred.ui \
    predmetred.ui \
    consred.ui \
    prepod.ui \
    listener.ui \
    school.ui \
    predmet.ui \
    consult.ui \
    graph.ui

STATECHARTS +=

