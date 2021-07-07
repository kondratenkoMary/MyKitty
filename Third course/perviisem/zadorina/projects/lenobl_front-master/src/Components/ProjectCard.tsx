import React from "react";
import { Button, Card } from "react-bootstrap";
import { CardTypes, CARD_TYPES_NAME } from "../constants/cardTypes";
import PrepareCard from "./Prepare/PrepareCard";
import Implementation from "./Implementation/Implementation";
import CardDev from "./CardDevelopment/CardDev";
import Pasport from "./AS_IS/Pasport/Pasport";
import { useSelector } from "react-redux";
import { StoreType } from "../reducers";

function ProjectCardByName(props) {
    // console.log(props.workerList)

    switch (props.cardType) {
        case CardTypes.PREPARE: {
            // console.log(props,'ProjectCard')

            return (
                <PrepareCard
                    NPATypeList={props.NPATypeList}
                    setAlertShow={props.setAlertShow}
                    alertShow={props.alertShow}
                    initiativeType={props.initiativeType}
                    getFileTable={props.getFileTable}
                    fileList={props.fileList}
                    saveFile={props.saveFile}
                    processList={props.processList}
                    selectedInitiativeType={props.selectedInitiativeType}
                    initiativeTypeList={props.initiativeTypeList}
                    setSelectedInitiativeType={props.setSelectedInitiativeType}
                    addDocument={props.addDocument}
                    savePrepareProject={props.savePrepareProject}
                    workerList={props.workerList}
                    prepareData={props.prepareData}
                />
            );
        }
        case CardTypes.DEVELOPMENT: {
            return (
                <CardDev
                    workerList={props.workerList}
                    DecisionTypes={props.DecisionTypes}
                    EventTypes={props.EventTypes}
                    DeleteDkRow={props.DeleteDkRow}
                    updateDkRow={props.updateDkRow}
                    DkData={props.DkData}
                    insertNewDkRow={props.insertNewDkRow}
                    tempByPartTable2={props.tempByPartTable2}
                    costByPartTable2={props.costByPartTable2}
                    saveByPartCostTable={props.saveByPartCostTable}
                    costByPartTable={props.costByPartTable}
                    tempByPartTable={props.tempByPartTable}
                    setAlertShow={props.setAlertShow}
                    alertShow={props.alertShow}
                    ITOGOfile={props.ITOGOfile}
                    Los2Table={props.Los2Table}
                    Los2Table2={props.Los2Table2}
                    Los1Table={props.Los1Table}
                    Los1Table2={props.Los1Table2}
                    costTable={props.costTable}
                    costTable2={props.costTable2}
                    tempTable={props.tempTable}
                    tempTable2={props.tempTable2}
                    saveLosTable={props.saveLosTable}
                    saveStepTable={props.saveStepTable}
                    DeployExtraFile={props.DeployExtraFile}
                    AutomationFile={props.AutomationFile}
                    TOBEExpensesFile={props.TOBEExpensesFile}
                    OPERATINGtable={props.OPERATINGtable}
                    ANALISEXTRAfile={props.ANALISEXTRAfile}
                    TOBEEXTRAfile={props.TOBEEXTRAfile}
                    saveCostTable={props.saveCostTable}
                    setExpenseTableFlag={props.setExpenseTableFlag}
                    expenseTableFlag1={props.expenseTableFlag1}
                    expenseTableFlag2={props.expenseTableFlag2}
                    Expensesfile={props.Expensesfile}
                    ToBeModelfile={props.ToBeModelfile}
                    EXTRAfile={props.EXTRAfile}
                    REASONfile={props.REASONfile}
                    projId={props.prepareData.project.id}
                    setPasportFlag={props.setPasportFlag}
                    pasportFlag={props.pasportFlag}
                    devData={props.prepareData}
                    projectId={props.prepareData.project ? props.prepareData.project.id : 1}
                    works={props.works}
                    getControlPoints={props.getControlPoints}
                    cloneControlPoints={props.cloneControlPoints}
                    showControlPoints={props.showControlPoints}
                    workFacts={props.workFacts}
                    workPlans={props.workPlans}
                    saveWorkFact={props.saveWorkFact}
                    saveWorkPlan={props.saveWorkPlan}
                    saveControlPoint={props.saveControlPoint}
                    pasportParams={props.pasportParams}
                    NPATypeList={props.NPATypeList}
                    addDocument={props.addDocument}
                    MODELfile={props.MODELfile}
                    SIPOCfile={props.SIPOCfile}
                    getFileTableSIPOC={props.getFileTableSIPOC}
                    saveFile={props.saveFile}
                    fileNPATable={props.fileNPATable}
                    projPasport={props.projPasport}
                    getFileTablePasport={props.getFileTablePasport}
                    savePasportFields={props.savePasportFields}
                    processType={props.prepareData.process.refProcessTypeId}
                    ASISflag={props.ASISflag}
                    setASISflag={props.setASISflag}
                />
            );
        }
        case CardTypes.INTRODUCTION: {
            return (
                <Implementation
                    DkData={props.DkData}
                    projId={props.prepareData.project.id}
                    implementationData={props.implementationData}
                />
            );
        }
        default: {
            return (
                <>
                    <Card>
                        <Card.Header>{CARD_TYPES_NAME[props.cardType]}</Card.Header>
                        <Card.Body>Раздел в разработке</Card.Body>
                    </Card>
                </>
            );
        }
    }
}

function ProjectCard(props) {
    const data = useSelector<StoreType, StoreType["grapth"]>((state) => state.grapth);
    return (
        <>
            {!isNaN(parseInt(props.cardType)) ? (
                <ProjectCardByName
                    implementationData={props.implementationData}
                    workerList={props.workerList}
                    DecisionTypes={props.DecisionTypes}
                    EventTypes={props.EventTypes}
                    DeleteDkRow={props.DeleteDkRow}
                    updateDkRow={props.updateDkRow}
                    DkData={props.DkData}
                    insertNewDkRow={props.insertNewDkRow}
                    tempByPartTable2={props.tempByPartTable2}
                    costByPartTable2={props.costByPartTable2}
                    saveByPartCostTable={props.saveByPartCostTable}
                    costByPartTable={props.costByPartTable}
                    tempByPartTable={props.tempByPartTable}
                    ITOGOfile={props.ITOGOfile}
                    saveControlPoint={props.saveControlPoint}
                    getControlPoints={props.getControlPoints}
                    saveLosTable={props.saveLosTable}
                    saveStepTable={props.saveStepTable}
                    Los2Table={props.Los2Table}
                    Los2Table2={props.Los2Table2}
                    Los1Table={props.Los1Table}
                    Los1Table2={props.Los1Table2}
                    costTable={props.costTable}
                    costTable2={props.costTable2}
                    tempTable={props.tempTable}
                    tempTable2={props.tempTable2}
                    DeployExtraFile={props.DeployExtraFile}
                    AutomationFile={props.AutomationFile}
                    TOBEExpensesFile={props.TOBEExpensesFile}
                    OPERATINGtable={props.OPERATINGtable}
                    saveCostTable={props.saveCostTable}
                    ANALISEXTRAfile={props.ANALISEXTRAfile}
                    TOBEEXTRAfile={props.TOBEEXTRAfile}
                    setExpenseTableFlag={props.setExpenseTableFlag}
                    expenseTableFlag2={props.expenseTableFlag2}
                    expenseTableFlag1={props.expenseTableFlag1}
                    ToBeModelfile={props.ToBeModelfile}
                    Expensesfile={props.Expensesfile}
                    EXTRAfile={props.EXTRAfile}
                    REASONfile={props.REASONfile}
                    saveWorkFact={props.saveWorkFact}
                    saveWorkPlan={props.saveWorkPlan}
                    workFacts={props.workFacts}
                    works={props.works}
                    workPlans={props.workPlans}
                    MODELfile={props.MODELfile}
                    SIPOCfile={props.SIPOCfile}
                    getFileTableSIPOC={props.getFileTableSIPOC}
                    fileNPATable={props.fileNPATable}
                    projPasport={props.projPasport}
                    getFileTablePasport={props.getFileTablePasport}
                    savePasportFields={props.savePasportFields}
                    ASISflag={props.ASISflag}
                    setASISflag={props.setASISflag}
                    pasportFlag={props.pasportFlag}
                    setPasportFlag={props.setPasportFlag}
                    pasportParams={props.pasportParams}
                    NPATypeList={props.NPATypeList}
                    setAlertShow={props.setAlertShow}
                    alertShow={props.alertShow}
                    initiativeType={props.initiativeType}
                    getFileTable={props.getFileTable}
                    fileList={props.fileList}
                    saveFile={props.saveFile}
                    processList={props.processList}
                    selectedInitiativeType={props.selectedInitiativeType}
                    initiativeTypeList={props.initiativeTypeList}
                    setSelectedInitiativeType={props.setSelectedInitiativeType}
                    cardType={props.cardType}
                    addDocument={props.addDocument}
                    savePrepareProject={props.savePrepareProject}
                    prepareData={props.prepareData}
                />
            ) : (
                ""
            )}
        </>
    );
}

export default ProjectCard;
