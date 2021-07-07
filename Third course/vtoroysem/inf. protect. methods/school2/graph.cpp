#include "graph.h"
#include "ui_graph.h"

graph::graph(QSqlDatabase db, QWidget *parent) :
    QWidget(parent),
    ui(new Ui::graph)
{
    ui->setupUi(this);
    ui->widget->plotLayout()->insertRow(0);
    ui->widget->plotLayout()->addElement(0,0,new QCPPlotTitle(ui->widget,"Количество предметов, изучаемое слушателями "));

    QVector<double>dx,dy;
    double minX,minY,maxX,maxY;
    minX=0;
    minY=0;
    maxX=0;
    maxY=0;
    db.open();
    QSqlQuery *query = new QSqlQuery();
    if (query->exec("Select Listener_idListener,count(Disciplin_idDisciplin) from study group by Listener_idListener;"))
    {
        while(query->next())
        {
            if (minX>=query->value(0).toDouble()) minX=query->value(0).toDouble();
            if (minY>=query->value(1).toDouble()) minY=query->value(0).toDouble();
            if (maxX<=query->value(0).toDouble()) maxX=query->value(0).toDouble();
            if (maxY<=query->value(1).toDouble()) maxY=query->value(0).toDouble();

            dx << query->value(0).toDouble();
            dy << query->value(1).toDouble();

            QCPBars *bar = new QCPBars(ui->widget->xAxis,ui->widget->yAxis);
            bar->setName("Значение");
            bar->setBrush(QColor(0,160,0,250));
            bar->setData(dx,dy);
            bar->setWidth(0.20);

            ui->widget->xAxis->setLabel("Слушатели");
            ui->widget->yAxis->setLabel("Количество предметов");
            ui->widget->xAxis->setRange(minX,maxX+0.20);
            ui->widget->yAxis->setRange(minY,maxY+1);

            ui->widget->xAxis->setAutoTickStep(false);
            ui->widget->yAxis->setAutoTickStep(false);
          ui->widget->xAxis->setTickStep(1);
            ui->widget->yAxis->setTickStep(1);
            ui->widget->replot();

        }
    }
}

graph::~graph()
{
    delete ui;
}
