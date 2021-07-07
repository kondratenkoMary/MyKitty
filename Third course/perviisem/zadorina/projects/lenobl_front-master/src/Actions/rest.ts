import {
    clearState,
    setAllDayType,
    setAllDecisionType,
    setAllDeclarantType,
    setAllDigitalType,
    setAllEventType,
    setAllInDevStage,
    setAllInfosystem,
    setAllInitiativeType,
    setAllInstitution,
    setAllNPATypes,
    setAllProcflaw,
    setAllStages,
    setAllTaxType,
    setControlPoints,
    setControlPointsShow,
    setCostByPartTable,
    setCostByPartTable2,
    setCostTable,
    setCostTable2,
    setDkDate,
    setFileListPrepare,
    setFileTableAnalisEXTRA,
    setFileTableAsIsEXPENSES,
    setFileTableAutomation,
    setFileTableDeployEXTRA,
    setFileTableEXTRA,
    setFileTableITOGO,
    setFileTableMODEL,
    setFileTablePasport,
    setFileTableREASON,
    setFileTableSIPOC,
    setFileTableToBeEXPENSES,
    setFileTableToBeEXTRA,
    setFileTableToBeMODEL,
    setFileTableToBeOPERATING,
    setImpFileRowId,
    setlementationDate,
    setLos1Table,
    setLos1Table2,
    setLos2Table,
    setLos2Table2,
    setLosByPartTable,
    setNameList,
    setOutofRangeControlPoint,
    setPasportFlag,
    setProcess,
    setProcessType,
    setProjectData,
    setProjectForUpdateCard,
    setProjectPasport,
    setProjectStageFacts,
    setRestState,
    setSectionsFlag,
    setSectionsFlagName,
    setSelectedInitiativeType,
    setStepByPartTable,
    setTempByPartTable,
    setTempByPartTable2,
    setTempTable,
    setTempTable2,
    setUnusedProcess,
    setWorker,
    setWorkFacts,
    setWorkPlans,
    setWorks
} from "./actions";

import { REST_STATE } from "../constants/restStates";
import { Dispatch } from "react";
import { GetState } from "../reducers";
import { IProblemItem, IProblemListItem, IProcess, IProject, IWorkerItem } from "../reducers/grapthReducer";
import { processFetch, referenceFetch, RestApi } from "../utils/fetchers";
import notify from "../utils/notify";
import { ApplyStateArgs } from "../Components/Analysis/Reason/RootReasonModal";
import recountFunction from "../utils/recountFunction";

// Решает проблему приведения даты (из-за часового пояса)
Date.prototype.toJSON = function () {
    const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
    this.setHours(hoursDiff);
    return this.toISOString();
};

export const inRange = (element: any, start: any, end: any) => {
    if (element.datePlan) {
        let datePlan = new Date(element.datePlan);
        if (datePlan < start || datePlan > end) {
            return false;
        }
    }

    return true;
};

export const setRecountExpensesTable = (
    table: MarksTableType,
    mainLvlId?: number,
    subLvlId?: number,
    value?: number
) => (dispatch: Dispatch<any>) => {
    if (!(!value && !mainLvlId && !subLvlId)) {
        table.costMarksTableMainLevel[mainLvlId].subLevelCommand[subLvlId].value = Number(value);
        // table.costMarksTableMainLevel[mainLvlId].totalRecord.value = table.costMarksTableMainLevel[
        //     mainLvlId
        // ].subLevelCommand.reduce((acc, el) => {
        //     return acc + el.value;
        // }, 0);
    }
    let mas = [];
    mas = table.costMarksTableMainLevel.map((el, id) => {
        return {
            mark: el.mark,
            recount: recountFunction(el.value),
            totalRecord: {
                name: "Всего",
                value: el.subLevelCommand.reduce((acc, el) => {
                    return acc + el.value;
                }, 0),
                recount: recountFunction(
                    el.subLevelCommand.reduce((acc, el) => {
                        return acc + el.value;
                    }, 0)
                )
            },
            subLevelCommand: el.subLevelCommand.map((el, subId) => {
                return {
                    institution: el.institution,
                    recount: recountFunction(el.value),
                    value: el.value
                };
            }),
            value: el.value
        };
    });

    for (let i = 0; i < mas[0].subLevelCommand.length; i++) {
        mas[2].subLevelCommand[i].value = mas[0].subLevelCommand[i].value - mas[1].subLevelCommand[i].value;
        mas[2].subLevelCommand[i].recount = recountFunction(mas[2].subLevelCommand[i].value);
    }

    dispatch(setTempByPartTable(mas));
};

const parseInfoType = (types: number[]): string => {
    return types.map((cat) => `infoType=${cat}`).join("&");
};

export const getWorker = () => async (dispatch: any) => {
    const result = await processFetch<IWorkerItem[]>("worker/getAllWorker");
    dispatch(setWorker(result));
};

export const getProcess = () => async (dispatch: Dispatch<any>) => {
    const result = await processFetch("process/getAllProcess/");
    dispatch(setProcess(result));
};

export const getProjectForUpdateCard = (id: number) => async (dispatch: Dispatch<any>) => {
    const result = await processFetch(`project/getProjectForUpdateCard/${id}`);
    dispatch(setProjectForUpdateCard(result));
};

export const getAllInDevStage = () => async (dispatch: Dispatch<any>) => {
    const result = await processFetch("work/getAllInDevStage/");
    dispatch(setAllInDevStage(result));
};

export const insertProcflaw = (projectId: number, data: any) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`procflaw/${projectId}/insert/25`, {
            method: "POST",
            body: JSON.stringify({ name: data })
        });

        dispatch(getAllProcflaw(projectId));
    } catch (e) {
        console.error(e);
    }
};

export const updateProcflaw = (projectId: number, procFlawId: number, data: any) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`procflaw/update/${procFlawId}`, {
            method: "PUT",
            body: JSON.stringify({ name: data })
        });

        dispatch(getAllProcflaw(projectId));
    } catch (e) {
        console.error(e);
    }
};

export const deleteProcflaw = (procFlawId: number) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`procflaw/delete/${procFlawId}`, {
            method: "DELETE"
        });
    } catch (e) {
        console.error(e);
    }
};

export const deleteProject = (projectId: number) => async () => {
    try {
        await processFetch(`project/deleteProject/${projectId}`, {
            method: "DELETE"
        });
    } catch (e) {
        console.error(e);
    }
};

export interface InstitutionType {
    functionBegin: string;
    functionEnd: string;
    id: number;
    name: string;
    orderNumber: number;
}

export interface PrepareProjectItem {
    curators: IWorkerItem[];
    initiateType: null;
    institution: InstitutionType;
    process: IProcess;
    processTeam: IWorkerItem[];
    project: IProject;
    reengBegin: string;
    reengEnd: string;
    supervisor: null;
}

export const getProject = (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch(clearState());
    dispatch(setPasportFlag(false));
    dispatch(setSectionsFlag(null));
    dispatch(setSectionsFlagName(""));

    try {
        const result = await processFetch<PrepareProjectItem>(`project/getPrepareProject/${id}`);
        dispatch(setProjectData(result));
        dispatch(setSelectedInitiativeType(result.initiateType));
    } catch (e) {
        console.error(e);
    }
};

export const getProjectPasport = (id: any) => async (dispatch: any) => {
    try {
        const result = await processFetch(`passport/${id}/getPassportData/`);
        dispatch(setProjectPasport(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllInitiativeType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch("initiativeType/getAll");
        dispatch(setAllInitiativeType(result));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Gets all works in development stage form server and inits works param of the State
 */
export const getWorks = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch("work/getAllInDevStage");
        dispatch(setWorks(result));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Gets all work (for development stage) plans for project
 */
export const getWorkPlans = (projectId: number) => async (dispatch: Dispatch<any>) => {
    const stageId = 2;
    try {
        const result = await processFetch(`projworktime/${projectId}/getForStage/${stageId}`);
        dispatch(setWorkPlans(result));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Saves start and end in fact for current project (project is determed by the State)
 * @param {number} id - id of the fact to update or null
 * @param {number} workId - id of work
 * @param {Date} start - start date for fact
 * @param {Date} end - end date for fact
 */
export function saveWorkPlan(id: number, workId: number, start: any, end: any) {
    return id ? updateWorkPlan(id, workId, start, end) : saveNewWorkPlan(workId, start, end);
}

/**
 * Creates new plan (project_work_time) for work and current project (project is determed by the State)
 * @param {number} workId
 * @param {Date} start
 * @param {Date} end
 */
export const saveNewWorkPlan = (workId: number, start: any, end: any) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        await processFetch(`projworktime/${projectId}/addNew/${workId}`, {
            method: "POST",
            body: JSON.stringify({
                planBegin: start,
                planEnd: end
            })
        });
        dispatch(getWorkPlans(projectId));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Updates existing work plan
 * @param {number} planId
 * @param {Date} start
 * @param {Date} end
 */
export const updateWorkPlanSimple = (planId: number, start: any, end: any) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        await processFetch(`projworktime/update/${planId}`, {
            method: "PUT",
            body: JSON.stringify({
                planBegin: start,
                planEnd: end
            })
        });

        dispatch(getWorkPlans(projectId));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Updates existing work plan if no control points out of range (start - end)
 * @param {number} planId
 * @param {number} workId
 * @param {Date} start
 * @param {Date} end
 */
export const updateWorkPlan = (planId: number, workId: number, start: any, end: any) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    let projectId = getState().grapth.openProjectData.project.id;

    try {
        const result = await processFetch<any>(`projpoint/${projectId}/getAllForPlan/${workId}`);
        const resp = result.find((element: any) => !inRange(element, start, end));
        dispatch(setOutofRangeControlPoint(resp));
        if (resp) {
            dispatch(setRestState(REST_STATE.ERROR));
            return;
        }
        dispatch(updateWorkPlanSimple(planId, start, end));
        dispatch(setRestState(REST_STATE.OK));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Gets all work (for development stage) facts for project
 */
export const getWorkFacts = (projectId: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projworkfact/${projectId}/getAll`);
        dispatch(setWorkFacts(result));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Saves start and end in fact for current project (project is determed by the State)
 * @param {number} id - id of the fact to update or null
 * @param {number} workId - id of work
 * @param {Date} start - start date for fact
 * @param {Date} end - end date for fact
 */
export function saveWorkFact(id: number, workId: number, start: any, end: any) {
    return id ? updateWorkFact(id, workId, start, end) : saveNewWorkFact(workId, start, end);
}

/**
 * Creates new fact for work and current project (project is determed by the State)
 * @param {number} workId
 * @param {Date} start
 * @param {Date} end
 */
export const saveNewWorkFact = (workId: number, start: string, end: string) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        await processFetch(`projworkfact/${projectId}/addNew/${workId}`, {
            method: "POST",
            body: JSON.stringify({
                factBegin: start,
                factEnd: end,
                workCommand: { id: workId }
            })
        });
        dispatch(getWorkFacts(projectId));
    } catch (e) {
        console.error(e);
    }
};

// TODO Если факт уже создан, не должно требоваться передавать id для work
/**
 * Updates existing work fact
 * @param {number} factId
 * @param {number} workId
 * @param {Date} start
 * @param {Date} end
 */
export const updateWorkFact = (factId: number, workId: number, start: any, end: any) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        await processFetch(`projworkfact/update/${factId}`, {
            method: "PUT",
            body: JSON.stringify({
                factBegin: start,
                factEnd: end
            })
        });

        dispatch(getWorkFacts(projectId));
    } catch (e) {
        console.error(e);
    }
};

export const getFileName = (fileId: number, projId: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch<string>(`projectfile/getFileName/${fileId}`);
        dispatch(saveFile(fileId, projId, result));
    } catch (e) {
        console.error(e);
    }
};

export const deleteFile = (fileId: number | string, projectId: string, taskId: number, ...infoType: number[]) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`projectfile/deleteFile/${fileId}`, {
            method: "DELETE"
        });
        if (taskId === 1) {
            dispatch(getFileTablePrepare(projectId));
        }
        if (taskId === 4) {
            dispatch(getFileTablePasport(projectId));
        } else if (taskId === 18) {
            dispatch(getFileTableITOGO(projectId));
        } else if (taskId === 7) {
            dispatch(getFileTableEXTRA(projectId));
        } else if (taskId === 17) {
            dispatch(getFileTableDeployEXTRA(projectId));
        } else if (taskId === 16) {
            dispatch(getFileTableAutomation(projectId));
        } else if (taskId === 13) {
            dispatch(getFileTableToBeEXPENSES(projectId, ...infoType));
        } else if (taskId === 11) {
            dispatch(getFileTableToBeOPERATING(projectId));
        } else if (taskId === 14) {
            dispatch(getFileTableToBeEXTRA(projectId));
        } else if (taskId === 10) {
            dispatch(getFileTableAnalisEXTRA(projectId));
        } else if (taskId === 9) {
            dispatch(getFileTableAsIsEXPENSES(projectId));
        } else if (taskId === 12) {
            dispatch(getFileTableToBeMODEL(projectId, ...infoType));
        } else if (taskId === 8) {
            dispatch(getFileTableREASON(projectId, ...infoType));
        } else if (taskId === 5) {
            dispatch(getFileTableSIPOC(projectId));
        } else if (taskId === 6) {
            dispatch(getFileTableMODEL(projectId));
        }
    } catch (e) {
        console.error(e);
    }
};

/**
 * Gets all control points (for development stage) plans for project
 */
export const getControlPointsSimple = (workId: number) => async (dispatch: Dispatch<any>, getState: GetState) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        const result = await processFetch(`projpoint/${projectId}/getAllForPlan/${workId}`);
        dispatch(setControlPoints(result));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Gets all control points (for development stage) plans for project
 */
export const getControlPoints = (workId: number, showCP: any) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const projectId = getState().grapth.openProjectData.project.id;
    let noError = true;

    try {
        const result = await processFetch<any>(`projpoint/${projectId}/getAllForPlan/${workId}`);
        if (result && !result.error) {
            if (result.some((x: any) => x.checkPointFix)) {
                dispatch(setControlPoints(result));
            } else {
                dispatch(cloneControlPointsForWork(workId));
            }
        } else {
            noError = false;
        }
        dispatch(setControlPointsShow(showCP && noError));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Clones fix control points and gets all control points for work and current project (project is determed by the State)
 * @param {number} workId - id of work
 */
export const cloneControlPointsForWork = (workId: number) => async (dispatch: Dispatch<any>, getState: GetState) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        await processFetch(`projpoint/${projectId}/cloneForWork/${workId}`);
        dispatch(getControlPointsSimple(workId));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Deletes conrtol point by id
 * @param {number} pointId - id of the control point to delete
 * @param {number} workId - id of work controlPoint belongs to
 */
export const deleteControlPoint = (pointId: number, workId: number) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`projpoint/delete/${pointId}`, {
            method: "DELETE"
        });

        dispatch(getControlPointsSimple(workId));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Saves start and end in conrtol point for current project (project is determed by the State)
 * @param {number} id - id of the control point to update or null
 * @param {number} workId - id of work
 * @param {string} name - name of control point
 * @param {Date} datePlan - plan date for control point
 * @param {Date} dateFact - fact date for control point
 */
export function saveControlPoint(id: number, workId: number, name: string, datePlan: any, dateFact: any) {
    if (id) {
        return updateControlPoint(id, workId, name, datePlan, dateFact);
    }

    return saveNewControlPoint(workId, name, datePlan, dateFact);
}

/**
 * Creates new control point (proj_point) for work and current project (project is determed by the State)
 * @param {number} workId
 * @param {string} name
 * @param {Date} datePlan
 * @param {Date} dateFact
 */
export const saveNewControlPoint = (workId: number, name: string, datePlan: any, dateFact: any) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const projectId = getState().grapth.openProjectData.project.id;

    try {
        await processFetch(`projpoint/${projectId}/addNew/${workId}`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                datePlan: datePlan,
                dateFact: dateFact
            })
        });

        dispatch(getControlPointsSimple(workId));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Updates existing work plan
 * @param {number} controlPointId
 * @param {number} workId
 * @param {string} name
 * @param {Date} datePlan
 * @param {Date} dateFact
 */
export const updateControlPoint = (
    controlPointId: number,
    workId: number,
    name: string,
    datePlan: any,
    dateFact: any
) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`projpoint/update/${controlPointId}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                datePlan: datePlan,
                dateFact: dateFact
            })
        });
        dispatch(getControlPointsSimple(workId));
    } catch (e) {
        console.error(e);
    }
};

export const getFileUrl = (id: number, projectId: number) => {
    let url = "/processoffice/rest/projectfile/" + projectId + "/downloadFile/" + id;
    let proxyTarget = "lk.process.ifinmon.ru";
    let rezurl = `http://2406e553-791e-42ee-acb6-acfc4ab70ac6:be909266-b3ce-4067-9950-1940bd297407@${proxyTarget}${url}`;

    return url;
};

export const saveFile = (id: number, projId: string, fileName: string) => () => {
    const url = `${RestApi.process}/projectfile/${projId}/downloadFile/${id}`;
    const proxyTarget = "lk.process.ifinmon.ru";
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    let authString = `${accessToken}:${refreshToken}`;
    const a = document.createElement("a");
    a.style.display = "none";
    // a.style.target = "_blank";
    a.href = `http://${authString}@${proxyTarget}${url}`;
    a.download = fileName;
    //a.download = "222.pdf";
    //console.log(a);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};

export interface SavePrepareProjectParams {
    id: number;
    process: IProcess;
    project: IProject;
    supervisor: IWorkerItem | null;
    processTeam: IWorkerItem[];
    reengBegin: string;
    reengEnd: string;
    projectName: string;
    curators: IWorkerItem[];
}

export const savePrepareProject = (params: SavePrepareProjectParams) => async (
    dispatch: Dispatch<any>,
    getState: GetState
) => {
    const { initiativeType } = getState().grapth.prepareExtraParams;

    try {
        await processFetch(`project/savePrepare/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({
                // curators: data[0],
                project: {
                    name: params.projectName,
                    id: params.process.id
                },
                supervisor: params.supervisor,
                processTeam: params.processTeam,
                reengBegin: params.reengBegin,
                reengEnd: params.reengEnd,
                initiateType: initiativeType,
                // name: data[8],
                process: params.process,
                curators: params.curators
            })
        });
        dispatch(clearState());
        dispatch(getProject(params.project.id.toString()));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const getAllProcflaw = (projId: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch<number>(`procflaw/${projId}/getAll/25`);
        dispatch(setAllProcflaw(result));
    } catch (e) {
        console.error(e);
    }
};

export const getNameList = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch("project/getProjectsForFilter");
        dispatch(setNameList(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllStages = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch("stage/getAll");
        dispatch(setAllStages(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTablePrepare = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getFilesTable`);
        dispatch(setFileListPrepare(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTablePasport = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getFilesTableProcNpa`);
        dispatch(setFileTablePasport(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableSIPOC = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=3&task=5`);
        dispatch(setFileTableSIPOC(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableEXTRA = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=11&task=7`);
        dispatch(setFileTableEXTRA(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableITOGO = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=16&task=18`);
        dispatch(setFileTableITOGO(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableREASON = (id: string, ...category: number[]) => async (dispatch: Dispatch<any>) => {
    try {
        const data = await processFetch(`projectfile/${id}/getProjectFilesTable/?${parseInfoType(category)}&task=8`);
        dispatch(setFileTableREASON(data));
    } catch (e) {
        // todo обработка ошибок
    }
};

export const getFileTableMODEL = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=4&task=6`);
        dispatch(setFileTableMODEL(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableToBeMODEL = (id: string, ...category: number[]) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?${parseInfoType(category)}&task=12`);
        dispatch(setFileTableToBeMODEL(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableAsIsEXPENSES = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=13&task=9`);
        dispatch(setFileTableAsIsEXPENSES(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableAnalisEXTRA = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=11&task=10`);
        dispatch(setFileTableAnalisEXTRA(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableToBeEXTRA = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=11&task=14`);
        dispatch(setFileTableToBeEXTRA(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableToBeOPERATING = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=10&task=11`);
        dispatch(setFileTableToBeOPERATING(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableToBeEXPENSES = (id: string, ...category: number[]) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?${parseInfoType(category)}&task=13`);
        dispatch(setFileTableToBeEXPENSES(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableAutomation = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=12&task=16`);
        dispatch(setFileTableAutomation(result));
    } catch (e) {
        console.error(e);
    }
};

export const getFileTableDeployEXTRA = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projectfile/${id}/getProjectFilesTable/?infoType=11&task=17`);
        dispatch(setFileTableDeployEXTRA(result));
    } catch (e) {
        console.error(e);
    }
};

export const gerAllNPATypes = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`npaType/getAll`);
        dispatch(setAllNPATypes(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllDeclarantType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`declarantType/getAll`);
        dispatch(setAllDeclarantType(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllDayType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`dayType/getAll`);
        dispatch(setAllDayType(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllTaxType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`taxType/getAll`);
        dispatch(setAllTaxType(result));
    } catch (e) {
        console.error(e);
    }
};

export const getUnusedProcess = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`process/getUnusedProcess`);
        dispatch(setUnusedProcess(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllDigitalType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`digitalType/getAll`);
        dispatch(setAllDigitalType(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllInstitution = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`project/getAllInstitution`);
        dispatch(setAllInstitution(result));
    } catch (e) {
        console.error(e);
    }
};

export const getCostTable = (ProjectId: number, infoType: any, task: any) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(
            `costtable/${ProjectId}/getCostTable/cost/?taskId=${task}&infoTypeId=${infoType}`
        );
        if (infoType === 13) {
            dispatch(setCostTable(result, infoType));
        }
        if (infoType === 14) {
            dispatch(setCostTable2(result, infoType));
        }
    } catch (e) {
        console.error(e);
    }
};

export const getTempTable = (projectId: number, infoType: number, task: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(
            `costtable/${projectId}/getCostTable/temporary/?taskId=${task}&infoTypeId=${infoType}`
        );
        if (infoType === 13) {
            dispatch(setTempTable(result, infoType));
        }
        if (infoType === 14) {
            dispatch(setTempTable2(result, infoType));
        }
    } catch (e) {
        console.error(e);
    }
};

export const getLosTable = (projectId: number, infoType: any, task: any) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(
            `stepvaluetable/${projectId}/getStepValueTable/?taskId=${task}&infoTypeId=${infoType}`
        );
        if (infoType == 13) {
            dispatch(setLos1Table(result, infoType));
        }
        if (infoType == 14) {
            dispatch(setLos1Table2(result, infoType));
        }
    } catch (e) {
        console.error(e);
    }
};

export const getLosTable2 = (projectId: number, infoType: number, task: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`losstable/${projectId}/getLossTable/?taskId=${task}&infoTypeId=${infoType}`);
        if (infoType == 13) {
            dispatch(setLos2Table(result, infoType));
        }
        if (infoType == 14) {
            dispatch(setLos2Table2(result, infoType));
        }
    } catch (e) {
        console.error(e);
    }
};

export const getCostByPartTable = (projectId: number, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        const result = await processFetch(
            `costmarkstable/${projectId}/getCostMarksTable/cost/?taskId=${task}&infoTypeId=${infoType}`
        );
        if (infoType == 13) {
            dispatch(setCostByPartTable(result));
        }
        if (infoType == 14) {
            dispatch(setCostByPartTable2(result));
        }
    } catch (e) {
        console.error(e);
    }
};

export const getLosByPartTable = (projectId: number, infoType: any, task: any) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(
            `lossmarkstable/${projectId}/getLossTypeMarksTable/?taskId=${task}&infoTypeId=${infoType}`
        );
        dispatch(setLosByPartTable(result));
    } catch (e) {
        console.error(e);
    }
};

export const getStepByPartTable = (projectId: number, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        const result = await processFetch(
            `stepvaluemarkstable/${projectId}/getStepValueMarksTable/?taskId=${task}&infoTypeId=${infoType}`
        );
        dispatch(setStepByPartTable(result));
    } catch (e) {
        console.error(e);
    }
};

export const insertNewDkRow = (projectId: number, data: any, taskId: number) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`projevent/${projectId}/insertByTask/${taskId}`, {
            method: "POST",
            body: JSON.stringify(data)
        });
        dispatch(getDkDataByEventType(1, projectId));
    } catch (e) {
        console.error(e);
    }
};

// todo переименовать camelCase
export const DeleteDkRow = (projEvId: number, projId: number) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`projevent/delete/${projEvId}`, {
            method: "DELETE"
        });
        dispatch(getDkDataByEventType(1, projId));
    } catch (e) {
        console.error(e);
    }
};

export const getAllEventType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`eventType/getAll`);
        dispatch(setAllEventType(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllInfosystem = () => async (dispatch: any) => {
    try {
        const result = await processFetch(`infosystem/getAll`);
        dispatch(setAllInfosystem(result));
    } catch (e) {
        console.error(e);
    }
};

export const getAllDecisionType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch(`decisionType/getAll`);
        dispatch(setAllDecisionType(result));
    } catch (e) {
        console.error(e);
    }
};

export const updateDkRow = (projEvId: number, data: Record<string, any>, projectId: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`projevent/update/${projEvId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        dispatch(getDkDataByEventType(1, projectId));
    } catch (e) {
        console.error(e);
    }
};

export const updateIMPRow = (
    projEventFactId: number,
    data: Record<string, any>,
    projId: number,
    newFileId: number
) => async (dispatch: Dispatch<any>) => {
    try {
        data["fileId"] = newFileId;
        await processFetch(`projeventfact/update/${projEventFactId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        dispatch(getImplementationDataByEventType(1, projId));
    } catch (e) {
        console.error(e);
    }
};
export const mergeProjEventFactVsFile = (projEventFactId: number, newFileId: number) => async () => {
    try {
        await processFetch(`projeventfact/${projEventFactId}/addFile/${newFileId}`, {
            method: "PUT"
        });
    } catch (e) {
        console.error(e);
    }
};

export const insertIMPRow = (projEventFactId: number, data: any, projId: number, newFileId: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`projeventfact/${projId}/insertByTask/19`, {
            method: "POST",
            body: JSON.stringify(data)
        });
        dispatch(mergeProjEventFactVsFile(projEventFactId, newFileId));
        dispatch(getImplementationDataByEventType(1, projId));
    } catch (e) {
        console.error(e);
    }
};

export const getDkDataByEventType = (eventType: any, projId: number | string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projevent/${projId}/getAllByTask/15`);
        dispatch(setDkDate(result));
    } catch (e) {
        console.error(e);
    }
};

export const getImplementationDataByEventType = (eventType: any, projId: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch(`projevent/${projId}/getAllByTask/15`);
        dispatch(setlementationDate(result));
    } catch (e) {
        console.error(e);
    }
};
export interface IProjectStageFact {
    factBegin: string;
    factEnd: string;
    id: number;
    refProject: { id: number; name: string };
    refStage: { id: number; orderNumber: number; name: string };
}

export const getProjectStageFact = (projectId: string) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch<IProjectStageFact[]>(`projstagefact/${projectId}/getAllStage`);
        dispatch(setProjectStageFacts(result));
    } catch (e) {
        console.error(e);
    }
};

export const getTempByPartTable = (projectId: number, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        const result = await processFetch(
            `costmarkstable/${projectId}/getCostMarksTable/temporary/?taskId=${task}&infoTypeId=${infoType}`
        );
        // dispatch(setRecountExpensesTable(result));
        if (infoType == 13) {
            dispatch(setRecountExpensesTable(result));
        }
        if (infoType == 14) {
            dispatch(setTempByPartTable2(result));
        }
    } catch (e) {
        console.error(e);
    }
};

export const saveCostTable = (projectId: number, data: any, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`costtable/${projectId}/saveCostTable/?taskId=${task}&infoTypeId=${infoType}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        if (data.type === "cost") {
            dispatch(getCostTable(projectId, infoType, task));
        }
        if (data.type === "temporary") {
            dispatch(getTempTable(projectId, infoType, task));
        }
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const saveByPartCostTable = (projectId: number, data: any, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`costmarkstable/${projectId}/saveCostMarksTable/?taskId=${task}&infoTypeId=${infoType}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        if (data.type === "cost") {
            dispatch(getCostByPartTable(projectId, infoType, task));
        }
        if (data.type === "temporary") {
            dispatch(getTempByPartTable(projectId, infoType, task));
        }
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const saveByPartLosTable = (projectId: number, data: any, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        const result = await processFetch(
            `lossmarkstable/${projectId}/saveLossTypeMarksTable/?taskId=${task}&infoTypeId=${infoType}`,
            {
                method: "PUT",
                body: JSON.stringify(data)
            }
        );
        dispatch(setLosByPartTable(result));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const saveByPartStepTable = (projectId: number, data: any, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        const result = await processFetch(
            `stepvaluemarkstable/${projectId}/saveStepValueMarksTable/?taskId=${task}&infoTypeId=${infoType}`,
            {
                method: "PUT",
                body: JSON.stringify(data)
            }
        );
        dispatch(setStepByPartTable(result));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const saveStepTable = (projectId: number, data: any, infoType: number, task: number) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(
            `stepvaluemarkstable/${projectId}/saveStepValueMarksTable/?taskId=${task}&infoTypeId=${infoType}`,
            {
                method: "PUT",
                body: JSON.stringify(data)
            }
        );
        dispatch(getLosTable(projectId, infoType, task));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const saveLosTable = (projectId: number, data: any, infoType: any, task: any) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`losstable/${projectId}/saveLossTable/?taskId=${task}&infoTypeId=${infoType}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        dispatch(getLosTable2(projectId, infoType, task));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const addDocument = (data: any, projectId: string, taskId: number) => async (dispatch: Dispatch<any>) => {
    if (taskId === 4) {
        try {
            await processFetch(`projectfile/${projectId}/uploadNewFileProcNpa`, {
                method: "POST",
                body: data
            });
            dispatch(getFileTablePasport(projectId));
        } catch (e) {
            dispatch(notify.error("Ошибка"));
        }
        return;
    }

    if ([8, 18, 5, 6, 7, 9, 12, 14, 10, 11, 13, 16, 17, 19].includes(taskId)) {
        try {
            const result = await processFetch<any>(`projectfile/${projectId}/uploadNewProjectFile`, {
                method: "POST",
                body: data
            });
            if (taskId == 19) {
                dispatch(setImpFileRowId(result.id));
            }
            if (taskId == 18) {
                dispatch(getFileTableITOGO(projectId));
            }
            if (taskId == 7) {
                dispatch(getFileTableEXTRA(projectId));
            }
            if (taskId == 17) {
                dispatch(getFileTableDeployEXTRA(projectId));
            }
            if (taskId == 16) {
                dispatch(getFileTableAutomation(projectId));
            }
            if (taskId == 13) {
                dispatch(getFileTableToBeEXPENSES(projectId));
            }
            if (taskId == 11) {
                dispatch(getFileTableToBeOPERATING(projectId));
            }
            if (taskId == 14) {
                dispatch(getFileTableToBeEXTRA(projectId));
            }
            if (taskId == 10) {
                dispatch(getFileTableAnalisEXTRA(projectId));
            }
            if (taskId == 9) {
                dispatch(getFileTableAsIsEXPENSES(projectId));
            }
            if (taskId == 12) {
                dispatch(getFileTableToBeMODEL(projectId));
            }
            if (taskId == 8) {
                dispatch(getFileTableREASON(projectId, data.get("kategory")));
            }
            if (taskId == 5) {
                dispatch(getFileTableSIPOC(projectId));
            }
            if (taskId == 6) {
                dispatch(getFileTableMODEL(projectId));
            }
        } catch (e) {
            console.error(e);
        }
        return;
    }

    try {
        await processFetch(`projectfile/${projectId}/uploadNewFile`, {
            method: "POST",
            body: data
        });
        dispatch(getFileTablePrepare(projectId));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

// todo лучше переписать биндинг данных, неконтролируемые позиции данных
export const savePasportFields = (id: number, ...data: any) => async (dispatch: Dispatch<any>, getState: GetState) => {
    let initiateType = getState();

    try {
        const bodyData = {
            procDocCommand: data[26],
            declarant: data[0],
            tax: data[1],
            institution: data[2],
            infSist: data[3] || "",
            optimisationReason: data[4],
            optimisationResult: data[5],
            other: data[6],
            badPlaces: data[7],
            factDay: {
                dayType: data[9],
                value: data[8]
            },
            normativeDay: {
                dayType: data[11],
                value: data[10]
            },
            refEPGU: data[12],
            refRPGU: data[13],
            digitalTrans: [
                {
                    type: initiateType?.grapth?.pasportParams?.allDigitalType[0],
                    disc: data[14],
                    flag: data[20]
                },
                {
                    type: initiateType.grapth.pasportParams.allDigitalType[1],
                    disc: data[15],
                    flag: data[21]
                },
                {
                    type: initiateType.grapth.pasportParams.allDigitalType[2],
                    disc: data[16],
                    flag: data[22]
                },
                {
                    type: initiateType.grapth.pasportParams.allDigitalType[3],
                    disc: data[17],
                    flag: data[23]
                },
                {
                    type: initiateType.grapth.pasportParams.allDigitalType[4],
                    disc: data[18],
                    flag: data[24]
                }
            ],
            electronicDocumentFlowMFC: {
                disc: data[19],
                flag: data[25]
            },
            procInfoSysCommand: data[27]
        };

        await processFetch(`passport/${id}/savePassport`, {
            method: "PUT",
            body: JSON.stringify(bodyData)
        });
        dispatch(getProjectPasport(id));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const getProcessType = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await referenceFetch("processType/getAll");
        dispatch(setProcessType(result));
    } catch (e) {
        console.error(e);
    }
};

export const setProcessItems = (items: IProblemItem[]) => ({
    type: "SET_PROCESS_ITEMS",
    payload: items
});

export const loadProcessInfo = (projectId: number, taskId: number) => async (dispatch: Dispatch<any>) => {
    const result = await processFetch<IProblemItem[]>(`projproblem/${projectId}/getAll/${taskId}`);

    dispatch(setProcessItems(result));
};

export const saveProcessInfo = (projectId: number, taskId: number, name: string, processId?: number) => async (
    dispatch: Dispatch<any>
) => {
    const jsonData: RequestInit = {
        body: JSON.stringify({
            name
        }),
        method: processId ? "PUT" : "POST"
    };
    const url = processId ? `projproblem/update/${processId}` : `projproblem/${projectId}/insert/${taskId}`;

    try {
        await processFetch(url, jsonData);
        dispatch(loadProcessInfo(projectId, taskId));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка сохранения"));
    }
};

export const createProblemItem = (
    projectId: number,
    taskId: number,
    { factor, reason }: ApplyStateArgs,
    parentId: number | null = null
) => async (dispatch: Dispatch<any>) => {
    try {
        const factor: Record<string, any> = {};
        if (factor?.id) {
            factor.factorTypeCommand = {
                id: factor?.id
            };
        }

        await processFetch(`projprobcause/${projectId}/addItem/${taskId}`, {
            body: JSON.stringify({
                name: reason,
                parentId,
                projTaskCommand: {
                    id: taskId
                },
                ...factor
            }),
            method: "POST"
        });
        dispatch(notify.success("Успешно создано"));
        dispatch(loadProblems(projectId, taskId));
    } catch (e) {
        dispatch(notify.error("Ошибка создания"));
    }
};

export const deleteProblemItem = (projectId: number, taskId: number, id: number) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`projprobcause/deleteItem/${id}`, {
            method: "DELETE"
        });
        dispatch(loadProblems(projectId, taskId));
        dispatch(notify.success("Успешно удалено"));
    } catch (e) {
        dispatch(notify.error("Ошибка удаления"));
    }
};

export const updateProblemItem = (projectId: number, taskId: number, data: IProblemListItem) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch(`projprobcause/updateItem/${data.id}`, {
            body: JSON.stringify(data),
            method: "PUT"
        });
        dispatch(loadProblems(projectId, taskId));
        dispatch(notify.success("Успешно обновлено"));
    } catch (e) {
        dispatch(notify.error("Ошибка обновления"));
    }
};

export const setProblemList = (list: IProblemListItem[]) => ({
    type: "SET_PROBLEM_LIST",
    payload: list
});

export const loadProblems = (projectId: number, taskId: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await processFetch<IProblemListItem[]>(`projprobcause/${projectId}/getTree/${taskId}`);
        dispatch(setProblemList(result));
    } catch (e) {}
};

// STAGES
export const addStageToStage = (projectId: string, stageId: number) => async (dispatch: Dispatch<any>) => {
    try {
        await processFetch(`projstagefact/${projectId}/addStageToStage/${stageId}`, {
            method: "PUT"
        });
        dispatch(getProjectStageFact(projectId));
        dispatch(notify.success("Успешно"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};

export const updateStageDate = (
    projectId: string,
    stageId: number,
    values: { factBegin: string; factEnd: string }
) => async (dispatch: Dispatch<any>) => {
    try {
        console.log(">>SAVE STAGE", values);
        await processFetch(`projstagefact/${projectId}/saveStage/${stageId}/`, {
            method: "PUT",
            body: JSON.stringify({
                factBegin: values.factBegin,
                factEnd: values.factEnd
            })
        });
        dispatch(getProjectStageFact(projectId));
        dispatch(notify.success("Успешно"));
    } catch (e) {
        dispatch(notify.error("Ошибка"));
    }
};
