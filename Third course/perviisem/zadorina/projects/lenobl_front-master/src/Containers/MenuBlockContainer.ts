import { RootAction, RootState } from "../state/myType";
import { connect } from "react-redux";
import MenuBlock from "../Components/MenuBlock";
import { CardTypes } from "../constants/cardTypes";
import {
    getImplementationDataByEventType,
    getAllEventType,
    getAllDecisionType,
    DeleteDkRow,
    updateDkRow,
    getDkDataByEventType,
    insertNewDkRow,
    saveByPartCostTable,
    getCostByPartTable,
    getTempByPartTable,
    getFileTableITOGO,
    getControlPoints,
    getFileTableAsIsEXPENSES,
    getLosTable2,
    saveLosTable,
    saveStepTable,
    getLosTable,
    getFileTableAutomation,
    getFileTableToBeOPERATING,
    saveCostTable,
    getTempTable,
    getCostTable,
    getFileTableAnalisEXTRA,
    getFileTableToBeEXTRA,
    getFileTableToBeMODEL,
    getFileTableToBeEXPENSES,
    getFileName,
    getFileTableREASON,
    getFileTableEXTRA,
    getFileTableSIPOC,
    getProjectPasport,
    getWorks,
    getWorkPlans,
    saveWorkPlan,
    getWorkFacts,
    saveWorkFact,
    getFileTableMODEL,
    getFileTablePrepare,
    getFileTablePasport,
    getAllDayType,
    getAllDeclarantType,
    getAllTaxType,
    getUnusedProcess,
    getAllInstitution,
    getAllDigitalType,
    gerAllNPATypes,
    saveFile,
    addDocument,
    getAllStages,
    getProject,
    savePrepareProject,
    getAllInitiativeType,
    savePasportFields,
    saveControlPoint,
    getProcessType
} from "../Actions/rest";

//ACTION
import {
    setSectionsFlag,
    setControlPoints,
    setExpenseTableFlag,
    setWorks,
    setASISflag,
    setPasportFlag,
    setAlertShow,
    setSelectedInitiativeType,
    setFilterName,
    setFilterProcessType,
    setFilterCurator,
    setFilterStage,
    SetProjectRegistryFlag,
    setGlobalAddingFlag,
    setOpenProjectFlag,
    setCardType,
    setFilterSupervisor,
    setFilterParticipiant,
    setControlPointsShow
} from "../Actions/actions";
import { loadProjectList, saveNewProj } from "../Actions/registry";

const mapStateToProps = (state: RootState) => {
    return state || {};
};

const MenuBlockContainer = connect(mapStateToProps, {
    SetProjectRegistryFlag: () => SetProjectRegistryFlag(),
    setGlobalAddingFlag: (flag: boolean) => setGlobalAddingFlag(flag),
    saveNewProj: (processId: number, newName: string, workerId: number) => saveNewProj(processId, newName, workerId),
    getProject: (id: number) => getProject(id),

    setWorks: (data: any) => setWorks(data),
    getWorks: (id: number) => getWorks(id),

    getWorkPlans: (id: number) => getWorkPlans(id),
    saveWorkPlan: (id: number, workId: number, start: any, end: any) => saveWorkPlan(id, workId, start, end),
    saveControlPoint: (id: number, workId: number, name: string, plan: any, fact: any) =>
        saveControlPoint(id, workId, name, plan, fact),

    getWorkFacts: () => getWorkFacts(),
    saveWorkFact: (id: number, workId: number, start: any, end: any) => saveWorkFact(id, workId, start, end),

    getControlPoints: (id: number, flag: boolean) => getControlPoints(id, flag),
    // cloneControlPoints: (id: number) => cloneControlPointsForWork(id),
    showControlPoints: (flag: boolean) => setControlPointsShow(flag),

    setOpenProjectFlag: (flag: boolean) => setOpenProjectFlag(flag),

    setCardtype: (type: CardTypes) => setCardType(type),
    savePrepareProject: (id: number, ...data: any) => savePrepareProject(id, ...data),
    getAllStages: () => getAllStages(),
    getProcessType: () => getProcessType(),
    getAllInitiativeType: () => getAllInitiativeType(),
    setSelectedInitiativeType: (data: any) => setSelectedInitiativeType(data),

    setFilterStage: (data: any) => setFilterStage(data),
    setFilterSupervisor: (data: any) => setFilterSupervisor(data),
    setFilterParticipiant: (data: any) => setFilterParticipiant(data),
    setFilterCurator: (data: any) => setFilterCurator(data),
    setFilterProcessType: (data: any) => setFilterProcessType(data),
    setFilterName: (data: any) => setFilterName(data),

    addDocument: (data: any, projectId: number, taskId: number) => addDocument(data, projectId, taskId),
    saveFile: (id: any, projId: any, fileName: any) => saveFile(id, projId, fileName),
    getFileTablePasport: (id: any) => getFileTablePasport(id),
    getFileTablePrepare: (id: any) => getFileTablePrepare(id),
    setAlertShow: (flag: boolean) => setAlertShow(flag),

    gerAllNPATypes: () => gerAllNPATypes(),

    getAllInstitution: () => getAllInstitution(),
    getAllDigitalType: () => getAllDigitalType(),
    getUnusedProcess: () => getUnusedProcess(),
    getAllTaxType: () => getAllTaxType(),
    getAllDayType: () => getAllDayType(),
    getAllDeclarantType: () => getAllDeclarantType(),

    setPasportFlag: (flag: boolean) => setPasportFlag(flag),
    setASISflag: (type: string) => setASISflag(type),

    savePasportFields: (id: number, ...data: any) => savePasportFields(id, ...data),

    getProjectPasport: (id: number) => getProjectPasport(id),

    getFileTableSIPOC: (id: number) => getFileTableSIPOC(id),

    getFileTableMODEL: (id: number) => getFileTableMODEL(id),

    getFileTableEXTRA: (id: number) => getFileTableEXTRA(id),

    getFileTableREASON: (id: number, ...data: any) => getFileTableREASON(id, ...data),

    getFileName: (fileId: number, projId: number) => getFileName(fileId, projId),

    getFileTableToBeMODEL: (id: number) => getFileTableToBeMODEL(id),

    getFileTableToBeEXPENSES: (id: number) => getFileTableToBeEXPENSES(id),

    setExpenseTableFlag: (type: string, t: number) => setExpenseTableFlag(type, t),

    getFileTableAnalisEXTRA: (id: number) => getFileTableAnalisEXTRA(id),

    getFileTableToBeEXTRA: (id: number) => getFileTableToBeEXTRA(id),

    getCostTable: (id: number, infoType: number, task: number) => getCostTable(id, infoType, task),

    getTempTable: (id: number, infoType: number, task: number) => getTempTable(id, infoType, task),

    saveCostTable: (id: number, data: any, infoType: number, task: number) => saveCostTable(id, data, infoType, task),

    getFileTableToBeOPERATING: (id: number) => getFileTableToBeOPERATING(id),

    getFileTableAutomation: (id: number) => getFileTableAutomation(id),
    getLosTable: (id: number, infoType: number, task: number) => getLosTable(id, infoType, task),

    getLosTable2: (id: number, infoType: number, task: number) => getLosTable2(id, infoType, task),

    saveStepTable: (id: number, data: any, infoType: number, task: number) => saveStepTable(id, data, infoType, task),

    saveLosTable: (id: number, data: any, infoType: number, task: number) => saveLosTable(id, data, infoType, task),

    getFileTableAsIsEXPENSES: (id: number) => getFileTableAsIsEXPENSES(id),

    getFileTableITOGO: (id: number) => getFileTableITOGO(id),

    getTempByPartTable: (ProjectId: number, infoType: number, task: number) =>
        getTempByPartTable(ProjectId, infoType, task),
    getCostByPartTable: (ProjectId: number, infoType: number, task: number) =>
        getCostByPartTable(ProjectId, infoType, task),
    saveByPartCostTable: (id: number, data: any, infoType: number, task: number) =>
        saveByPartCostTable(id, data, infoType, task),
    insertNewDkRow: (ProjectId: number, data: any, taskId: number) => insertNewDkRow(ProjectId, data, taskId),
    getDkDataByEventType: (eventType: number, projId: number) => getDkDataByEventType(eventType, projId),
    updateDkRow: (projEvId: number, data: any, projId: number) => updateDkRow(projEvId, data, projId),
    DeleteDkRow: (projEvId: number, projId: number) => DeleteDkRow(projEvId, projId),

    getAllDecisionType: () => getAllDecisionType(),
    getAllEventType: () => getAllEventType(),

    getImplementationDataByEventType: (eventType: number, projId: number) =>
        getImplementationDataByEventType(eventType, projId),
    setSectionsFlag: (data: any) => setSectionsFlag(data)
})(MenuBlock);

export default MenuBlockContainer;
