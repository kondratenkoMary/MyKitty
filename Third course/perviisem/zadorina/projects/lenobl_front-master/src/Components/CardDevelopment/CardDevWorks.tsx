import React, { memo } from "react";
import DevContainer from "./Dev";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import LoaderIndicator from "../LoaderIndicator";

function diffDates(day_one, day_two) {
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
}

function getIntervalInfo(daysCount) {
    return { weeks: ~~(daysCount / 7), days: daysCount % 7, workDays: 0 };
}

function getIntervalText(start, end) {
    if (start && end) {
        var options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            timezone: "UTC"
        };
        let startDate = new Date(start);
        let endDate = new Date(end);
        let days = diffDates(endDate, startDate);
        let info = getIntervalInfo(days);
        return `с ${startDate.toLocaleString("ru", options)} по ${endDate.toLocaleString(
            "ru",
            options
        )}: ${days} дн. (${info.weeks} нед. ${info.days} дн.)`;
    }

    return "";
}

function getDivisionIntoIntervals(planStart, planEnd, factStart, factEnd) {
    let intervals = [];
    let today = new Date();
    if (planStart != null && planEnd != null) {
        if (factStart == null || factEnd == null) {
            intervals.push({ start: planStart, end: planEnd, color: planStart <= today ? "orange" : "blue" });
        }
        else if (factEnd <= planStart) {
            intervals.push({ start: factStart, end: factEnd, color: "green" });
            intervals.push({ start: planStart, end: planEnd, color: "lightblue" });
        }
        else if (factStart >= planEnd) {
            intervals.push({ start: planStart, end: planEnd, color: "lightblue" });
            intervals.push({ start: factStart, end: factEnd, color: "red" });
        }
        else if (factStart <= planStart && factEnd > planStart && factEnd <= planEnd) {
            intervals.push({ start: factStart, end: planStart, color: "green" });
            intervals.push({ start: planStart, end: factEnd, color: "#3E67AF" });
            intervals.push({ start: factEnd, end: planEnd, color: "lightblue" });
        }
        else if (factStart <= planStart && factEnd >= planEnd) {
            intervals.push({ start: factStart, end: planStart, color: "green" });
            intervals.push({ start: planStart, end: planEnd, color: "#3E67AF" });
            intervals.push({ start: planEnd, end: factEnd, color: "red" });
        }
        else if (factStart > planStart && factEnd < planEnd) {
            intervals.push({ start: planStart, end: factStart, color: "lightblue" });
            intervals.push({ start: factStart, end: factEnd, color: "#3E67AF" });
            intervals.push({ start: factEnd, end: planEnd, color: "lightblue" });
        }
        else if (factStart > planStart && factEnd > planEnd && factStart < planEnd) {
            intervals.push({ start: planStart, end: factStart, color: "lightblue" });
            intervals.push({ start: factStart, end: planEnd, color: "#3E67AF" });
            intervals.push({ start: planEnd, end: factEnd, color: "red" });
        }
        else {
            intervals.push({ start: planStart, end: planEnd, color: "black" });
            intervals.push({ start: factStart, end: factEnd, color: "black" });
        }

    }
    else {
        intervals.push({ start: planStart, end: planEnd, color: "grey" });
    }
    return intervals;
}

const CardDevWorks = () => {
    let chartData = [];

    const data = useSelector<StoreType, StoreType["grapth"]>(({ grapth }) => grapth);

    if (!data.openProjectData) {
        return (
            <div>
                <LoaderIndicator />
            </div>
        );
    }
    var reengEnd = data.openProjectData.reengEnd;
    var reengBegin = data.openProjectData.reengBegin;
    const reengBeginDate = new Date(reengBegin);
    const reengEndDate = new Date(reengEnd);

    let minFactStart = null;
    let maxFactEnd = null;

    if (data.works) {
        for (let index = 0; index < data.works.length; index++) {
            const work = data.works[index];

            // Плановые значения
            let plan = null;
            if (data.workPlans) {
                let plansCount = data.workPlans.length;
                for (var i = 0; i < plansCount && !plan; i++) {
                    if (data.workPlans[i].projWorkCommand.workCommand.id == work.id) {
                        plan = data.workPlans[i];
                    }
                }
            }
            let planFromDate = plan ? new Date(plan.planBegin) : null;
            let planToDate = plan ? new Date(plan.planEnd) : null;

            // Фактические значения
            let fact = null;
            if (data.workFacts) {
                let factsCount = data.workFacts.length;
                for (var i = 0; i < factsCount && !fact; i++) {
                    if (data.workFacts[i].projWorkCommand.workCommand.id == work.id) {
                        fact = data.workFacts[i];
                    }
                }
            }
            
            let factFromDate = fact ? new Date(fact.factBegin) : null;

            // если фактическая дата окончания не установлена, берем текущую дату
            let factToDate = fact 
            ? (fact.factEnd ? new Date(fact.factEnd) : new Date()) 
            : null;

            if (factFromDate && (!minFactStart || (minFactStart > factFromDate)))
                minFactStart = factFromDate;
            if (factToDate && (!maxFactEnd || (maxFactEnd < factToDate)))
                maxFactEnd = factToDate;

            let intervals = getDivisionIntoIntervals(planFromDate, planToDate, factFromDate, factToDate);
            for (let i = 0; i < intervals.length; i++) {
                const interval = intervals[i];
                // Интервалы из плановых и фактических значений
                chartData.push({
                    name: `${work.name}`,
                    id: work.id,
                    planId: plan ? plan.id : null,
                    fromDate: planFromDate,
                    toDate: planToDate,
                    factId: fact ? fact.id : null,
                    factFromDate: factFromDate,
                    factToDate: factToDate,
                    // Параметры отображаемого интервала
                    start: interval.start,
                    end: interval.end,
                    color: interval.color,
                    // TODO? Общий для всей работы с учетом планов и фактов
                    intervalInfo: getIntervalText(interval.start, interval.end),
                    planInfo: getIntervalText(planFromDate, planToDate),
                    factInfo: getIntervalText(factFromDate, factToDate)
                });

            }
        }
    }

    let minFactStartDate = minFactStart ? new Date(minFactStart) : null;
    let maxFactEndDate = maxFactEnd ? new Date(maxFactEnd) : null;

    let min = (minFactStartDate && minFactStartDate  < reengBeginDate) ? minFactStartDate : reengBeginDate;
    let max = (maxFactEndDate && maxFactEndDate > reengEndDate) ? maxFactEndDate : reengEndDate;

    let yearBegin = min.getFullYear();
    let yearEnd = max.getFullYear();
    let allDevName = "Вся разработка (" + yearBegin + (yearBegin == yearEnd ? '' : " - " + yearEnd) + ")";

    let allDevIntervals = getDivisionIntoIntervals(reengBeginDate, reengEndDate, minFactStartDate, maxFactEndDate);
    for (let i = 0; i < allDevIntervals.length; i++) {
        const interval = allDevIntervals[i];
        // Интервалы из плановых и фактических значений
        chartData.push({
            name: allDevName,
            id: -1,
            planId: null,
            fromDate: reengBeginDate,
            toDate: reengEndDate,
            factFromDate: minFactStart,
            factToDate: maxFactEnd,
            planInfo: getIntervalText(reengBeginDate, reengEndDate),
            factInfo: getIntervalText(minFactStart, maxFactEnd),
            // Параметры отображаемого интервала
            start: interval.start,
            end: interval.end,
            color: interval.color,
            // TODO Общий для всей работы с учетом планов и фактов
            intervalInfo: getIntervalText(interval.start, interval.end),
        });

    }

    return <DevContainer chartData={chartData} />;
};

export default memo(CardDevWorks);
