import React from "react";
import Header from "../Containers/HeaderContainer/Header.tsx";
import Menu from "./Menu.tsx";
import ProjectRegistry from "../Containers/Registry/ProjectRegistry.tsx";
import ProjectCard from "./ProjectCard.tsx";
import CardMenu from "./CardMenu";

class MenuBlock extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            lgShow: false
        };
    }

    // TODO: change block after resolve logIn/logOut-task
    static defaultProps = {
        loggedIn: true,
        userData: {
            name: "Иванов Иван Иванович",
            unreadMessages: 5
        }
    };

    render() {
        return (
            <div>
                {!this.props.grapth.openProjectFlag ? (
                    <Menu
                        getAllStages={this.props.getAllStages}
                        SetProjectRegistryFlag={this.props.SetProjectRegistryFlag}
                        getProjList={this.props.getProjList}
                    />
                ) : (
                    <CardMenu
                        getImplementationDataByEventType={this.props.getImplementationDataByEventType}
                        getAllEventType={this.props.getAllEventType}
                        getAllDecisionType={this.props.getAllDecisionType}
                        getDkDataByEventType={this.props.getDkDataByEventType}
                        getTempByPartTable={this.props.getTempByPartTable}
                        getCostByPartTable={this.props.getCostByPartTable}
                        getFileTableITOGO={this.props.getFileTableITOGO}
                        getFileTableAsIsEXPENSES={this.props.getFileTableAsIsEXPENSES}
                        getLosTable2={this.props.getLosTable2}
                        getLosTable={this.props.getLosTable}
                        getFileTableAutomation={this.props.getFileTableAutomation}
                        getFileTableToBeOPERATING={this.props.getFileTableToBeOPERATING}
                        getTempTable={this.props.getTempTable}
                        getCostTable={this.props.getCostTable}
                        getFileTableAnalisEXTRA={this.props.getFileTableAnalisEXTRA}
                        getFileTableToBeEXTRA={this.props.getFileTableToBeEXTRA}
                        getFileTableToBeMODEL={this.props.getFileTableToBeMODEL}
                        getFileTableToBeEXPENSES={this.props.getFileTableToBeEXPENSES}
                        getFileTablePrepare={this.props.getFileTablePrepare}
                        getFileTableREASON={this.props.getFileTableREASON}
                        getFileTableEXTRA={this.props.getFileTableEXTRA}
                        getFileTableMODEL={this.props.getFileTableMODEL}
                        getFileTableSIPOC={this.props.getFileTableSIPOC}
                        getProjectPasport={this.props.getProjectPasport}
                        getFileTablePasport={this.props.getFileTablePasport}
                        getWorks={this.props.getWorks}
                        getWorkFacts={this.props.getWorkFacts}
                        getWorkPlans={this.props.getWorkPlans}
                        processType={
                            this.props.grapth.openProjectData != undefined &&
                            this.props.grapth.openProjectData != null &&
                            this.props.grapth.openProjectData.process != undefined
                                ? this.props.grapth.openProjectData.process.refProcessTypeId
                                : ""
                        }
                        gerAllNPATypes={this.props.gerAllNPATypes}
                        prepareData={this.props.grapth.openProjectData}
                        setOpenProjectFlag={this.props.setOpenProjectFlag}
                        setCardtype={this.props.setCardtype}
                    />
                )}
                {this.props.grapth.menuFlags.ProjectRegistryFlag ? (
                    !this.props.grapth.openProjectFlag ? (
                        <ProjectRegistry
                            unusedProcess={this.props.grapth.unusedProcess}
                            nameList={this.props.grapth.nameList}
                            processType={this.props.grapth.processType}
                            regFilter={this.props.grapth.regFilter}
                            stages={this.props.grapth.stages}
                            workerList={this.props.grapth.workerList}
                            processList={this.props.grapth.processList}
                            projList={this.props.grapth.projList}
                            globalAddingFlag={this.props.grapth.globalAdditingFlag}
                        />
                    ) : (
                        <ProjectCard
                            setSectionsFlag={this.props.setSectionsFlag}
                            sectionFlag={this.props.grapth.sectionFlag}
                            implementationData={this.props.grapth.implementationData}
                            workerList={this.props.grapth.workerList}
                            DecisionTypes={this.props.grapth.DecisionTypes}
                            EventTypes={this.props.grapth.EventTypes}
                            DeleteDkRow={this.props.DeleteDkRow}
                            updateDkRow={this.props.updateDkRow}
                            DkData={this.props.grapth.DkData}
                            insertNewDkRow={this.props.insertNewDkRow}
                            tempByPartTable2={this.props.grapth.tempByPartTable2}
                            costByPartTable2={this.props.grapth.costByPartTable2}
                            saveByPartCostTable={this.props.saveByPartCostTable}
                            costByPartTable={this.props.grapth.costByPartTable}
                            tempByPartTable={this.props.grapth.tempByPartTable}
                            ITOGOfile={this.props.grapth.ITOGOfile}
                            saveControlPoint={this.props.saveControlPoint}
                            getControlPoints={this.props.getControlPoints}
                            saveLosTable={this.props.saveLosTable}
                            saveStepTable={this.props.saveStepTable}
                            Los2Table={this.props.grapth.Los2Table}
                            Los2Table2={this.props.grapth.Los2Table2}
                            Los1Table={this.props.grapth.Los1Table}
                            Los1Table2={this.props.grapth.Los1Table2}
                            costTable={this.props.grapth.costTable}
                            costTable2={this.props.grapth.costTable2}
                            tempTable={this.props.grapth.tempTable}
                            tempTable2={this.props.grapth.tempTable2}
                            DeployExtraFile={this.props.grapth.DeployExtraFile}
                            AutomationFile={this.props.grapth.AutomationFile}
                            TOBEExpensesFile={this.props.grapth.TOBEExpensesFile}
                            OPERATINGtable={this.props.grapth.OPERATINGtable}
                            saveCostTable={this.props.saveCostTable}
                            ANALISEXTRAfile={this.props.grapth.ANALISEXTRAfile}
                            TOBEEXTRAfile={this.props.grapth.TOBEEXTRAfile}
                            setExpenseTableFlag={this.props.setExpenseTableFlag}
                            expenseTableFlag1={this.props.grapth.expenseTableFlag1}
                            expenseTableFlag2={this.props.grapth.expenseTableFlag2}
                            Expensesfile={this.props.grapth.Expensesfile}
                            ToBeModelfile={this.props.grapth.ToBeModelfile}
                            EXTRAfile={this.props.grapth.EXTRAfile}
                            REASONfile={this.props.grapth.REASONfile}
                            MODELfile={this.props.grapth.MODELfile}
                            SIPOCfile={this.props.grapth.SIPOCfile}
                            getFileTableSIPOC={this.props.getFileTableSIPOC}
                            fileNPATable={this.props.grapth.fileListPasport}
                            projPasport={this.props.grapth.projPasport}
                            getFileTablePasport={this.props.getFileTablePasport}
                            savePasportFields={this.props.savePasportFields}
                            ASISflag={this.props.grapth.ASISflag}
                            setASISflag={this.props.setASISflag}
                            setPasportFlag={this.props.setPasportFlag}
                            pasportFlag={this.props.grapth.pasportFlag}
                            works={this.props.grapth.works}
                            workFacts={this.props.grapth.workFacts}
                            workPlans={this.props.grapth.workPlans}
                            saveWorkFact={this.props.saveWorkFact}
                            saveWorkPlan={this.props.saveWorkPlan}
                            pasportParams={this.props.grapth.pasportParams}
                            NPATypeList={this.props.grapth.NPATypeList}
                            setAlertShow={this.props.setAlertShow}
                            alertShow={this.props.grapth.showAlert}
                            initiativeType={this.props.grapth.prepareExtraParams.initiativeType}
                            getFileTablePrepare={this.props.getFileTablePrepare}
                            fileList={this.props.grapth.fileListPrepare}
                            saveFile={this.props.getFileName}
                            processList={this.props.grapth.processList}
                            selectedInitiativeType={this.props.grapth.prepareExtraParams.initiativeType}
                            initiativeTypeList={this.props.grapth.allInitiativeType}
                            setSelectedInitiativeType={this.props.setSelectedInitiativeType}
                            addDocument={this.props.addDocument}
                            savePrepareProject={this.props.savePrepareProject}
                            workerList={this.props.grapth.workerList}
                            cardType={this.props.grapth.cardType}
                            setOpenProjectFlag={this.props.setOpenProjectFlag}
                            prepareData={this.props.grapth.openProjectData}
                        />
                    )
                ) : (
                    ""
                )}
                <div className="btn-top">
                    <a href="#top" title="Прокрутить наверх">
                        <i className="fas fa-sort-up fa-2x" />
                    </a>
                </div>
            </div>
        );
    }
}

export default MenuBlock;
