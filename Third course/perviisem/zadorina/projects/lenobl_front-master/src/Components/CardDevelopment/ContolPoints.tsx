import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import { _ } from 'core-js';
import am4lang_ru_RU from '@amcharts/amcharts4/lang/ru_RU';

class ControlPoints extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('cp chart mount');
        this.initChart();
    }

    componentDidUpdate(prevProps) {
        //Handle refreshing the chart when the dataset changes
        if (!_.isEqual(prevProps.controlPoints, this.props.controlPoints) ||
        (!_.isEqual(prevProps.minDate, this.props.minDate) && this.props.minDate) ||
        !_.isEqual(prevProps.maxDate, this.props.maxDate) && this.props.maxDate) {
            if (this.chart._super) {
                console.log('cp chart dispose')
                this.chart.dispose();
            }
            console.log('cp chart update')
            this.initChart();
        }
    }

    componentWillUnmount() {
        console.log('cp chart unmount');
        if (this.chart) {
            this.chart.dispose();
        }
    }

    initChart() {
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_frozen);

        var newChart = am4core.create("CPChartDiv", am4charts.XYChart);
        newChart.maskBullets = false;
        newChart.language.locale = am4lang_ru_RU;
        newChart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        newChart.paddingRight = 30;
        newChart.dateFormatter.inputDateFormat = "yyyy-MM-dd";


        var categoryAxis = this.initXAxis(newChart);

        var dateAxis = this.initYAxis(newChart);

        var series = newChart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "name";
        series.dataFields.dateX = "date_plan";
        series.dataFields.value = "work";
        series.columns.template.disabled = true;
        series.sequencedInterpolation = true;

        var bullet = series.bullets.push(new am4core.Circle());

        bullet.tooltipHTML = `<center><strong>{name}</strong></center>
        <hr />
          Плановая дата: {date_plan}</th>
        <hr />
          Фактическая дата: {date_fact}
        `;
        series.tooltip.label.wrap = true;
        series.tooltip.label.width = 100;

        // bullet.propertyFields.showTooltipOn = "always";
        bullet.strokeWidth = 3;
        bullet.stroke = am4core.color("#ffffff");
        bullet.strokeOpacity = 0;

        bullet.adapter.add("tooltipY", function (tooltipY, target) {
            return -target.radius + 1;
        });

        let fn = this.props.showChangeCPDialog;
        bullet.events.on("hit", function (ev) {
            fn(ev.target.dataItem.dataContext.id, ev.target.dataItem.dataContext.name, ev.target.dataItem.dataContext.date_plan, ev.target.dataItem.dataContext.date_fact);
        });

        series.heatRules.push({
            property: "radius",
            target: bullet,
            min: 20,
            max: 20
        });

        bullet.hiddenState.properties.scale = 0.01;
        bullet.hiddenState.properties.opacity = 1;

        var hoverState = bullet.states.create("hover");
        hoverState.properties.strokeOpacity = 1;

        this.initChartData(newChart);

        this.addCursor(newChart, categoryAxis, dateAxis);

        newChart.scrollbarX = new am4core.Scrollbar();
        newChart.logo.disabled = true;

        this.chart = newChart;
    }

    initYAxis(newChart) {
        var categoryAxis = newChart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        let label = categoryAxis.renderer.labels.template;
        label.wrap = true;
        label.maxWidth = 350;
        label.dy = 5;
        label.align = 'left';
        return categoryAxis;
    }

    initXAxis(newChart) {
        var dateAxis = newChart.xAxes.push(new am4charts.DateAxis());
        dateAxis.min = this.props.minDate.getTime();
        // Увеличение интервала на диаграмме на 1 день, чтобы отображался bullet
        let maxDate = this.props.maxDate.getTime();
        let maxDateOnChart = new Date(maxDate + 86400000);
        dateAxis.max = maxDateOnChart.getTime(); // + 1 day in ms
        dateAxis.renderer.minGridDistance = 70;

        dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
        dateAxis.dateFormats.setKey("day", "MMM d");
        dateAxis.periodChangeDateFormats.setKey("day", "MMM d, yyyy");
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.baseInterval = { count: 1, timeUnit: "day" };
        dateAxis.strictMinMax = true;
        dateAxis.renderer.tooltipLocation = 0;

        return dateAxis;
    }

    initChartData(newChart) {
        let data = [];
        let workId = this.props.workId;
        if (this.props.controlPoints) {
            this.props.controlPoints.forEach(controlPoint => {
                data.push(
                    {
                        "id": controlPoint.id,
                        "date_plan": controlPoint.datePlan  ? new Date(controlPoint.datePlan) : null,
                        "date_fact": controlPoint.dateFact ? new Date(controlPoint.dateFact) : null,
                        "work": workId,
                        "name": controlPoint.name
                    }
                )
            });
        };

        newChart.data = data;
    }


    addCursor(chart, dateAxis, categoryAxis) {
        chart.cursor = new am4charts.XYCursor();
        var cursorPosition = {
            x: null,
            y: null
        };
        chart.cursor.events.on("cursorpositionchanged", function (ev) {
            var xAxis = ev.target.chart.xAxes.getIndex(0);
            var yAxis = ev.target.chart.yAxes.getIndex(0);
            cursorPosition.x = dateAxis.positionToDate(dateAxis.toAxisPosition(ev.target.xPosition));
            cursorPosition.y = categoryAxis.positionToCategory(categoryAxis.toAxisPosition(ev.target.yPosition));
        });

        // chart.plotContainer.events.on("hit", function (ev) {
        //     console.log(cursorPosition);
        // });
    }

    render() {
        return (
            <>
                <Button onClick={() => { this.props.showAddCPDialog(true) }}>Добавить контрольную точку</Button>
                <div id="CPChartDiv" style={{ width: "100%", height: "300px" }}></div>
            </>
        );
    }
}

export default ControlPoints