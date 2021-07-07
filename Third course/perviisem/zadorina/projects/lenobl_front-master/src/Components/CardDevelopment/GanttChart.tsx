import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4lang_ru_RU from "@amcharts/amcharts4/lang/ru_RU";
import { isEqual } from "lodash";
import { DevEditMode } from "../../constants/devEditMode";

class GanttChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log('gantt chart mount');
        this.initChart();
    }

    componentDidUpdate(prevProps) {
        //Handle refreshing the chart when the dataset changes
        if (!isEqual(prevProps.data, this.props.data)) {
            if (this.chart._super) {
                // console.log('gantt chart dispose')
                this.chart.dispose();
            }
            // console.log('gantt chart update')
            this.initChart();
        } else {
            if (prevProps.editMode != this.props.editMode) {
                this.setWorksTemplateHtml(this.categoryAxis);
            }
            if (prevProps.activeStage != this.props.activeStage) {
                this.setActiveStage(this.chart, this.categoryAxis, this.props.activeStage);
            }
        }
        if (prevProps.showLegend != this.props.showLegend) {
            this.initLegendData(this.legend);
        }
    }

    componentWillUnmount() {
        // console.log('chart unmount');
        if (this.chart) {
            this.chart.dispose();
        }
    }

    initChart() {
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_frozen);

        var chart = am4core.create("ganttChartDiv", am4charts.XYChart);
        chart.language.locale = am4lang_ru_RU;
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.paddingRight = 30;
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
        chart.activeStageColor = "blue";
        chart.overStageColor = "blue";
        this.initChartData(chart);
        this.categoryAxis = this.initCategoryAxis(chart);
        var dateAxis = this.initDateAxis(chart);

        this.initSeries(chart);
        this.addCursor(chart, dateAxis, this.categoryAxis);
        this.addLegend(chart);
        chart.scrollbarX = new am4core.Scrollbar();
        chart.logo.disabled = true;
        chart.onWorkClick = this.props.onWorkClick;
        this.setWorksTemplateHtml(this.categoryAxis);
        this.chart = chart;
    }

    initSeries = (chart) => {
        // this.initPlanSeries(chart);
        // this.initFactSeries(chart);
        this.initIntervalsSeries(chart);
    };

    private initLegendData(legend) {
        if (!this.props.showLegend) {
            legend.data = [];
            return;
        }
        legend.data = [
            {
                name: "Плановый отрезок (его часть), не совпадающий с фактическим отрезком",
                fill: "lightblue"
            },
            {
                name: "Фактический отрезок (его часть), совпадающий с плановым отрезком (его частью)",
                fill: "#3E67AF"
            },
            {
                name:
                    "Фактический отрезок (его часть), не совпадающий с плановым отрезком и выходящий за пределы плановой даты окончания",
                fill: "red"
            },
            {
                name:
                    "Фактический отрезок (его часть), не совпадающий с плановым отрезком и выходящий за пределы плановой даты начала",
                fill: "green"
            },
            {
                name:
                    "Нет сведений о фактических датах работ, но нарушений нет - плановая дата начала позже текущей календарной даты",
                fill: "blue"
            },
            {
                name: "Нет сведений о фактических датах работ, но они уже должны были начаться",
                fill: "orange"
            }
        ];
    }

    private addLegend(chart: any) {
        let legend = new am4charts.Legend();
        legend.parent = chart.chartContainer;
        legend.background.fill = am4core.color("#000");
        legend.background.fillOpacity = 0.05;
        legend.width = am4core.percent(100);
        legend.align = "left";
        this.initLegendData(legend);
        this.legend = legend;
    }

    private initIntervalsSeries(chart: any) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.tooltipText = "{intervalInfo}";
        series.dataFields.openDateX = "start";
        series.dataFields.dateX = "end";
        series.dataFields.categoryY = "name";
        series.name = "Интервалы";
        series.columns.template.propertyFields.fill = "color"; // get color from data
        series.columns.template.propertyFields.stroke = "color";
        series.columns.template.strokeOpacity = 1;
        series.columns.template.height = am4core.percent(60);
    }

    private initPlanSeries(chart: any) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.tooltipText = "{planInfo}";
        series.dataFields.openDateX = "fromDate";
        series.dataFields.dateX = "toDate";
        series.dataFields.categoryY = "name";
        series.name = "Плановые значения";
        series.columns.template.propertyFields.fill = am4core.color("lightBlue"); // get color from data
        series.columns.template.propertyFields.stroke = am4core.color("lightBlue");
        series.columns.template.strokeOpacity = 1;
        series.columns.template.height = am4core.percent(100);
        // TODO добавить изменение интервала
        series.columns.template.events.on("hit", function (ev) {});
    }

    private initFactSeries(chart: any) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.tooltipText = "{factInfo}";
        series.dataFields.openDateX = "factFromDate";
        series.dataFields.dateX = "factToDate";
        series.dataFields.categoryY = "name";
        series.name = "Фактические значения";
        series.columns.template.propertyFields.fill = am4core.color("purple");
        series.columns.template.propertyFields.stroke = am4core.color("purple");
        series.columns.template.strokeOpacity = 1;
        series.columns.template.height = am4core.percent(100);
    }

    initDateAxis(chart) {
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
        dateAxis.dateFormats.setKey("day", "d MMM");
        // dateAxis.periodChangeDateFormats.setKey("day", "d MMM");
        dateAxis.renderer.minGridDistance = 70;
        dateAxis.baseInterval = { count: 1, timeUnit: "day" };
        // Факты могут быть выходить за пределы, учитываем их по данным
        dateAxis.max = chart.max.getTime();
        dateAxis.min = chart.min.getTime();
        dateAxis.strictMinMax = true;
        dateAxis.renderer.tooltipLocation = 0;
        return dateAxis;
    }

    setWorksTemplateHtml(categoryAxis) {
        if (categoryAxis) {
            // console.log(">>GANT PROPS", this.props);
            categoryAxis.renderer.labels.template.html =
                this.props.editMode == DevEditMode.PLANS
                    ? "{htmlPlans}"
                    : this.props.editMode == DevEditMode.FACTS
                    ? "{htmlFacts}"
                    : "{htmlSections}";
        }
    }

    getHtmlSections(id, name, activeStage, color) {
        return id > 0
            ? id == activeStage
                ? "<font color='" +
                  color +
                  "'>" +
                  "<img src='/assets/images/chevron-down-solid.svg' height=24 width=24 padding-right=10/>" +
                  name +
                  "</font>"
                : "<img src='/assets/images/chevron_right_solid.svg' height=24 width=24 padding-right=10/>" + name
            : "</>" + name;
    }

    setActiveStage(chart, categoryAxis, activeStage) {
        chart.data.forEach((element) => {
            element.htmlSections = this.getHtmlSections(element.id, element.name, activeStage, chart.activeStageColor);
        });

        //Сброс шаблона html для его обновления
        categoryAxis.renderer.labels.template.html = "";

        if (categoryAxis) {
            categoryAxis.renderer.labels.template.html =
                this.props.editMode == DevEditMode.PLANS
                    ? "{htmlPlans}"
                    : this.props.editMode == DevEditMode.FACTS
                    ? "{htmlFacts}"
                    : "{htmlSections}";
        }
    }

    initCategoryAxis(chart) {
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.minGridDistance = 20;
        let labelTemplate = categoryAxis.renderer.labels.template;
        // labelTemplate.wrap = true;
        labelTemplate.maxWidth = 400;
        labelTemplate.dy = 5;
        labelTemplate.align = "left";
        labelTemplate.dx = 0;
        labelTemplate.paddingRight = 60;
        labelTemplate.location = 0.5;

        this.setWorksTemplateHtml(categoryAxis);
        this.addKTButton(categoryAxis);
        labelTemplate.events.on("hit", (ev) => {
            if (this.props.editMode == DevEditMode.PLANS)
                this.props.onWorkClick(
                    ev.target.dataItem.dataContext.fromDate,
                    ev.target.dataItem.dataContext.toDate,
                    ev.target.dataItem.dataContext.name,
                    ev.target.dataItem.dataContext.id,
                    ev.target.dataItem.dataContext.planId
                );
            else if (this.props.editMode == DevEditMode.FACTS)
                this.props.onWorkClick(
                    ev.target.dataItem.dataContext.factFromDate,
                    ev.target.dataItem.dataContext.factToDate,
                    ev.target.dataItem.dataContext.name,
                    ev.target.dataItem.dataContext.id,
                    ev.target.dataItem.dataContext.factId
                );
            else if (this.props.editMode == DevEditMode.PASSPORT)
                this.props.onWorkClick(ev.target.dataItem.dataContext.name, ev.target.dataItem.dataContext.id);
        });
        labelTemplate.events.on("over", (ev) => {
            let workId = ev.target.dataItem.dataContext.id;
            if (workId > 0) {
                let html = categoryAxis.renderer.labels.template.html;
                let color = workId == this.props.activeStage ? chart.activeStageColor : chart.overStageColor;
                ev.target.html = "<font color='" + color + "'>" + html + "</font>";
            }
        });
        labelTemplate.events.on("out", (ev) => {
            let workId = ev.target.dataItem.dataContext.id;
            if (workId > 0) {
                let html = categoryAxis.renderer.labels.template.html;
                let color = workId == this.props.activeStage ? chart.activeStageColor : "black";
                ev.target.html = "<font color='" + color + "'>" + html + "</font>";
            }
        });

        labelTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        return categoryAxis;
    }

    initChartData(chart) {
        var colorSet = new am4core.ColorSet();
        colorSet.saturation = 0.4;
        chart.data = [];
        let max = new Date(this.props.maxDate);
        let min = new Date(this.props.minDate);
        if (this.props.data)
            for (let i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].start && this.props.data[i].start < min) min = this.props.data[i].start;
                if (this.props.data[i].end && this.props.data[i].end > max) max = this.props.data[i].end;
                chart.data.push({
                    name: this.props.data[i].name,
                    id: this.props.data[i].id,
                    planId: this.props.data[i].planId,
                    fromDate: this.props.data[i].fromDate,
                    toDate: this.props.data[i].toDate,
                    factId: this.props.data[i].factId,
                    factFromDate: this.props.data[i].factFromDate,
                    factToDate: this.props.data[i].factToDate,
                    intervalInfo: this.props.data[i].intervalInfo,
                    planInfo: this.props.data[i].planInfo,
                    factInfo: this.props.data[i].factInfo,
                    start: this.props.data[i].start,
                    end: this.props.data[i].end,
                    color: am4core.color(this.props.data[i].color),
                    colorFact: am4core.color(this.props.data[i].color),
                    htmlPlans:
                        this.props.data[i].id > 0
                            ? "<img src='/assets/images/edit_solid.svg ' height=24 width=24 padding-right=10/>" +
                              this.props.data[i].name
                            : "</>" + this.props.data[i].name,
                    htmlFacts:
                        this.props.data[i].id > 0
                            ? "<img src='/assets/images/edit_regular.svg ' height=24 width=24 padding-right=10/>" +
                              this.props.data[i].name
                            : "</>" + this.props.data[i].name,
                    htmlSections: this.getHtmlSections(
                        this.props.data[i].id,
                        this.props.data[i].name,
                        this.props.activeStage,
                        chart.activeStageColor
                    )
                });
            }
        chart.min = min;
        chart.max = max;
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

    addKTButton(categoryAxis) {
        let button = new am4core.Button();
        // // TODO отмечать, как нажатую или отпущенную
        button.horizontalCenter = "right";
        button.verticalCenter = "middle";

        button.adapter.add("visible", function (visible, target) {
            return target.dataItem.dataContext && target.dataItem.dataContext.id > 0;
        });

        // TODO скрывать для раздела Разработка или отображать по ней все КТ!
        button.events.on("hit", (ev) => {
            if (ev.target.dataItem.dataContext) {
                this.props.showControlPointsDialog(
                    ev.target.dataItem.dataContext.name,
                    ev.target.dataItem.dataContext.id,
                    ev.target.dataItem.dataContext.fromDate,
                    ev.target.dataItem.dataContext.toDate
                );
            }
        });

        button.label.adapter.add("text", function (text, target) {
            // let category = target.dataItem.category;
            return "КТ";
        });
        categoryAxis.dataItems.template.bullet = button;
    }

    render() {
        let height = this.props.showLegend ? 500 : 250;
        return <div id="ganttChartDiv" style={{ width: "100%", height: "" + height + "px" }}></div>;
    }
}

export default GanttChart;
