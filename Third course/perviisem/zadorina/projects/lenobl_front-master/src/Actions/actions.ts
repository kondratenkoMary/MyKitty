import { action, createStandardAction, getType } from "typesafe-actions";
import { CardTypes } from "../constants/cardTypes";

import {
    SET_ALL_DECISION_TYPE,
    SET_ALL_EVENT_TYPE,
    SET_DK_DATE,
    SET_TEMP_BY_PART_TABLE2,
    SET_COST_BY_PART_TABLE2,
    SET_COST_TABLE2,
    SET_TEMP_TABLE2,
    SET_LOS1_TABLE2,
    SET_LOS2_TABLE2,
    SET_FILE_TABLE_ITOGO,
    SET_LOS1_TABLE,
    SET_FILE_TOBE_EXPENSES,
    SER_FILE_TABLE_TOBE_OPERATING,
    SET_TEMP_TABLE,
    SET_COST_TABLE,
    SET_FILE_TABLE_ANALIS_EXTRA,
    SET_FILE_TABLE_TOBE_EXTRA,
    SET_FILE_TABLE_TOBE_MODEL,
    SET_FILE_TABLE_EXPENSES,
    SET_FILE_TABLE_EXTRA,
    SET_FILE_TABLE_REASON,
    SET_FILE_TABLE_MODEL,
    SET_FILE_TABLE_SIPOC,
    SET_WORKS,
    SET_WORK_FACTS,
    SET_WORK_PLANS,
    SET_SECTIONS_FLAG_NAME,
    SET_ALL_INFOSYSTEM
} from "../constants/actionTypes";
import {
    SET_CONTROL_POINTS,
    SET_REST_STATE,
    SET_OUT_OF_RANGE_CONTROL_POINT,
    SET_CONTROLPOINTS_SHOW,
    SET_IMP_DATE,
    SET_TEMP_BY_PART_TABLE,
    SET_LOS2_TABLE,
    SETFILE_TABLE_DEPLOY_EXTRA,
    SET_FILE_TABLE_AUTOMATION,
    SET_EXPENSE_TABLE_FLAG1,
    SET_PROJECT_PASPORT,
    SET_FILE_TABLE_PASPORT,
    SET_FILE_LIST_PREPARE,
    SET_AS_IS_FLAG,
    SET_PASPORT_FLAG,
    SET_ALL_INSTITUTION,
    SET_ALL_DIGITAL_TYPE,
    SET_SELECTED_INITIATIVE_TYPE,
    SET_ALL_STAGES,
    SET_FILTER_NAME,
    SET_NAME_LIST,
    SET_FILTER_PROCESS_TYPE,
    SET_PROCESS_TYPE,
    SET_FILTER_PARTICIPIANT,
    SET_FILTER_SUPERVISOR,
    SET_FILTER_CURATOR,
    SET_FILTER_STAGE
} from "../constants/actionTypes";
import {
    SET_COST_BY_PART_TABLE,
    SET_UNUSED_PROCESS,
    SET_ALL_TAX_TYPE,
    SET_ALL_DAY_TYPE,
    SET_ALL_DECLARANT_TYPE,
    SET_ALL_NPA_TYPES,
    SET_ALERT_SHOW,
    SET_FILE_LIST,
    CLEAR_STATE,
    SET_ALL_INITIATIVE_TYPE,
    SET_PROJECT_REGISTRY_FLAG,
    SET_GLOBAL_ADDING_FLAG,
    SET_PROJ_LIST,
    SET_PROCESS,
    SET_WORKER,
    SET_OPEN_PROJECT_FLAG,
    SET_PROJECT_DATA,
    SET_CARD_TYPE,
    SET_SECTION_PAYLOAD,
    SET_STEP_BYPART_TABLE,
    SET_EDIT_FLAG,
    SET_PROJECT_FOR_UPDATE,
    SET_ALLIN_DEV_STAGE,
    SET_ALL_PROCFLAW,
    SET_IMP_FILE_ROW_ID
} from "../constants/actionTypes";
import { SET_GANT_FLAG, SET_LOS_BYPART_TABLE } from "../constants/actionTypes";
import { REST_STATE } from "../constants/restStates";
import { IProjectStageFact } from "./rest";

export const SetProjectRegistryFlag = () => action(SET_PROJECT_REGISTRY_FLAG);
export const setGlobalAddingFlag = (flag: boolean) => action(SET_GLOBAL_ADDING_FLAG, flag);
export const setProjList = (data: any) => action(SET_PROJ_LIST, data);
export const setProcess = (data: any) => action(SET_PROCESS, data);
export const setWorker = (data: any) => action(SET_WORKER, data);
export const setOpenProjectFlag = (flag: boolean) => action(SET_OPEN_PROJECT_FLAG, flag);
export const setProjectData = (data: any) => action(SET_PROJECT_DATA, data);

export const setProjectStageFacts = createStandardAction("SET_PROJECT_FACTS")<IProjectStageFact[]>();

export const setAllStages = (data: any) => action(SET_ALL_STAGES, data);
export const setProcessType = (data: any) => action(SET_PROCESS_TYPE, data);
export const setAllInitiativeType = (data: any) => action(SET_ALL_INITIATIVE_TYPE, data);
export const setSelectedInitiativeType = (data: any) => action(SET_SELECTED_INITIATIVE_TYPE, data);

export const setFilterStage = (data: any) => action(SET_FILTER_STAGE, data);
export const setFilterCurator = (data: any) => action(SET_FILTER_CURATOR, data);
export const setFilterSupervisor = (data: any) => action(SET_FILTER_SUPERVISOR, data);
export const setFilterParticipiant = (data: any) => action(SET_FILTER_PARTICIPIANT, data);
export const setFilterProcessType = (data: any) => action(SET_FILTER_PROCESS_TYPE, data);
export const setFilterName = (data: any) => action(SET_FILTER_NAME, data);

export const setNameList = (data: any) => action(SET_NAME_LIST, data);

export const setCardType = (type: CardTypes) => action(SET_CARD_TYPE, type);

export const clearState = () => action(CLEAR_STATE);

export const setFileListPrepare = (data: any) => action(SET_FILE_LIST_PREPARE, data);
export const setFileTablePasport = (data: any) => action(SET_FILE_TABLE_PASPORT, data);
export const setFileTableSIPOC = (data: any) => action(SET_FILE_TABLE_SIPOC, data);
export const setFileTableREASON = (data: any) => action(SET_FILE_TABLE_REASON, data);
export const setFileTableEXTRA = (data: any) => action(SET_FILE_TABLE_EXTRA, data);

export const setWorks = (data: any) => action(SET_WORKS, data);
export const setWorkFacts = (data: any) => action(SET_WORK_FACTS, data);
export const setWorkPlans = (data: any) => action(SET_WORK_PLANS, data);

export const setAlertShow = (flag: boolean) => action(SET_ALERT_SHOW, flag);

export const setAllNPATypes = (data: any) => action(SET_ALL_NPA_TYPES, data);

export const setAllDeclarantType = (data: any) => action(SET_ALL_DECLARANT_TYPE, data);

export const setAllDayType = (data: any) => action(SET_ALL_DAY_TYPE, data);

export const setAllTaxType = (data: any) => action(SET_ALL_TAX_TYPE, data);

export const setUnusedProcess = (data: any) => action(SET_UNUSED_PROCESS, data);

export const setAllDigitalType = (data: any) => action(SET_ALL_DIGITAL_TYPE, data);

export const setAllInstitution = (data: any) => action(SET_ALL_INSTITUTION, data);

export const setPasportFlag = (flag: boolean) => action(SET_PASPORT_FLAG, flag);

export const setASISflag = (type: string) => action(SET_AS_IS_FLAG, type);

export const setProjectPasport = (data: any) => action(SET_PROJECT_PASPORT, data);

export const setFileTableMODEL = (data: any) => action(SET_FILE_TABLE_MODEL, data);

export const setFileTableAsIsEXPENSES = (data: any) => action(SET_FILE_TABLE_EXPENSES, data);

export const setFileTableToBeMODEL = (data: any) => action(SET_FILE_TABLE_TOBE_MODEL, data);

export const setControlPoints = (data: any) => action(SET_CONTROL_POINTS, data);

export const setExpenseTableFlag = (type: string, t: number) => action(SET_EXPENSE_TABLE_FLAG1, { type: type, t: t });

export const setFileTableToBeEXTRA = (data: any) => action(SET_FILE_TABLE_TOBE_EXTRA, data);

export const setFileTableAnalisEXTRA = (data: any) => action(SET_FILE_TABLE_ANALIS_EXTRA, data);

export const setCostTable = (data: any, infoType: number) => action(SET_COST_TABLE, { data: data, infoType: infoType });

export const setTempTable = (data: any, infoType: number) => action(SET_TEMP_TABLE, { data: data, infoType: infoType });

export const setCostTable2 = (data: any, infoType: number) =>
    action(SET_COST_TABLE2, { data: data, infoType: infoType });

export const setTempTable2 = (data: any, infoType: number) =>
    action(SET_TEMP_TABLE2, { data: data, infoType: infoType });

export const setFileTableToBeOPERATING = (data: any) => action(SER_FILE_TABLE_TOBE_OPERATING, data);

export const setFileTableToBeEXPENSES = (data: any) => action(SET_FILE_TOBE_EXPENSES, data);

export const setFileTableAutomation = (data: any) => action(SET_FILE_TABLE_AUTOMATION, data);

export const setFileTableDeployEXTRA = (data: any) => action(SETFILE_TABLE_DEPLOY_EXTRA, data);

export const setLos1Table = (data: any, infoType: number) => action(SET_LOS1_TABLE, { data: data, infoType: infoType });
export const setLos2Table = (data: any, infoType: number) => action(SET_LOS2_TABLE, { data: data, infoType: infoType });

export const setLos1Table2 = (data: any, infoType: number) =>
    action(SET_LOS1_TABLE2, { data: data, infoType: infoType });
export const setLos2Table2 = (data: any, infoType: number) =>
    action(SET_LOS2_TABLE2, { data: data, infoType: infoType });

export const setFileTableITOGO = (data: any) => action(SET_FILE_TABLE_ITOGO, data);

export const setCostByPartTable = (data: any) => action(SET_COST_BY_PART_TABLE, data);
export const setTempByPartTable = (data: any) => action(SET_TEMP_BY_PART_TABLE, data);

export const setCostByPartTable2 = (data: any) => action(SET_COST_BY_PART_TABLE2, data);
export const setTempByPartTable2 = (data: any) => action(SET_TEMP_BY_PART_TABLE2, data);

export const setDkDate = (data: any) => action(SET_DK_DATE, data);

export const setAllEventType = (data: any) => action(SET_ALL_EVENT_TYPE, data);
export const setAllDecisionType = (data: any) => action(SET_ALL_DECISION_TYPE, data);

export const setControlPointsShow = (flag: boolean) => action(SET_CONTROLPOINTS_SHOW, flag);

export const setOutofRangeControlPoint = (data: any) => action(SET_OUT_OF_RANGE_CONTROL_POINT, data);

export const setRestState = (response: any) => action(SET_REST_STATE, response);

export const setSectionsFlag = (data: any) => action(SET_SECTION_PAYLOAD, data);

export const setlementationDate = (data: any) => action(SET_IMP_DATE, data);

export const setGantFlag = () => action(SET_GANT_FLAG);

export const setLosByPartTable = (data: any) => action(SET_LOS_BYPART_TABLE, data);

export const setStepByPartTable = (data: any) => action(SET_STEP_BYPART_TABLE, data);

export const setEditFlag = (flag: boolean) => action(SET_EDIT_FLAG, flag);

export const setProjectForUpdateCard = (data: any) => action(SET_PROJECT_FOR_UPDATE, data);

export const setSectionsFlagName = (name: string) => action(SET_SECTIONS_FLAG_NAME, name);

export const setAllInDevStage = (data: any) => action(SET_ALLIN_DEV_STAGE, data);

export const setAllProcflaw = (projId: number) => action(SET_ALL_PROCFLAW, projId);

export const setAllInfosystem = (data: any) => action(SET_ALL_INFOSYSTEM, data);

export const setImpFileRowId = (data: any) => action(SET_IMP_FILE_ROW_ID, data);
