/**
 * Created by barhonina on 02.03.2018.
 */
import * as RequestType from "../actions/actions";
import { ActionType, getType } from "typesafe-actions";
import {
    CLEAR_STATE,
    SER_FILE_TABLE_TOBE_OPERATING,
    SET_ALERT_SHOW,
    SET_ALL_DAY_TYPE,
    SET_ALL_DECISION_TYPE,
    SET_ALL_DECLARANT_TYPE,
    SET_ALL_DIGITAL_TYPE,
    SET_ALL_EVENT_TYPE,
    SET_ALL_INFOSYSTEM,
    SET_ALL_INITIATIVE_TYPE,
    SET_ALL_INSTITUTION,
    SET_ALL_NPA_TYPES,
    SET_ALL_PROCFLAW,
    SET_ALL_STAGES,
    SET_ALL_TAX_TYPE,
    SET_ALLIN_DEV_STAGE,
    SET_AS_IS_FLAG,
    SET_CARD_TYPE,
    SET_CONTROL_POINTS,
    SET_CONTROLPOINTS_SHOW,
    SET_COST_BY_PART_TABLE,
    SET_COST_BY_PART_TABLE2,
    SET_COST_TABLE,
    SET_COST_TABLE2,
    SET_DK_DATE,
    SET_EDIT_FLAG,
    SET_EXPENSE_TABLE_FLAG1,
    SET_FILE_LIST_PREPARE,
    SET_FILE_TABLE_ANALIS_EXTRA,
    SET_FILE_TABLE_AUTOMATION,
    SET_FILE_TABLE_EXPENSES,
    SET_FILE_TABLE_EXTRA,
    SET_FILE_TABLE_ITOGO,
    SET_FILE_TABLE_MODEL,
    SET_FILE_TABLE_PASPORT,
    SET_FILE_TABLE_REASON,
    SET_FILE_TABLE_SIPOC,
    SET_FILE_TABLE_TOBE_EXTRA,
    SET_FILE_TABLE_TOBE_MODEL,
    SET_FILE_TOBE_EXPENSES,
    SET_FILTER_CURATOR,
    SET_FILTER_NAME,
    SET_FILTER_PARTICIPIANT,
    SET_FILTER_PROCESS_TYPE,
    SET_FILTER_STAGE,
    SET_FILTER_SUPERVISOR,
    SET_GANT_FLAG,
    SET_GLOBAL_ADDING_FLAG,
    SET_IMP_DATE,
    SET_IMP_FILE_ROW_ID,
    SET_LOS1_TABLE,
    SET_LOS1_TABLE2,
    SET_LOS2_TABLE,
    SET_LOS2_TABLE2,
    SET_LOS_BYPART_TABLE,
    SET_NAME_LIST,
    SET_OPEN_PROJECT_FLAG,
    SET_OUT_OF_RANGE_CONTROL_POINT,
    SET_PASPORT_FLAG,
    SET_PROCESS,
    SET_PROCESS_TYPE,
    SET_PROJ_LIST,
    SET_PROJECT_DATA,
    SET_PROJECT_FOR_UPDATE,
    SET_PROJECT_PASPORT,
    SET_PROJECT_REGISTRY_FLAG,
    SET_REST_STATE,
    SET_SECTION_PAYLOAD,
    SET_SECTIONS_FLAG_NAME,
    SET_SELECTED_INITIATIVE_TYPE,
    SET_STEP_BYPART_TABLE,
    SET_TEMP_BY_PART_TABLE,
    SET_TEMP_BY_PART_TABLE2,
    SET_TEMP_TABLE,
    SET_TEMP_TABLE2,
    SET_UNUSED_PROCESS,
    SET_WORK_FACTS,
    SET_WORK_PLANS,
    SET_WORKER,
    SET_WORKS,
    SETFILE_TABLE_DEPLOY_EXTRA
} from "../constants/actionTypes";
import { setProjectStageFacts } from "../Actions/actions";
import { IProjectStageFact } from "../Actions/rest";
import { IProjectItem } from "../models/registry";
import { TrelloLensItem } from "./trelloBoard";

export type RequestAction = ActionType<typeof RequestType>;

export interface IWorkerItem {
    id: number;
    name: string;
    orgName: string;
    post: string;
}
export interface IProcessType {
    id: number;
    name: string;
    orderNumber: number;
}

export interface IRequestFilter {
    curator: null;
    name: string;
    participiand: null;
    processTyepe: { id: number; name: string } | null;
    stage: { id: number; name: string } | null;
    supervisor: null;
}

export interface IProblemListItem {
    children: IProblemListItem[] | null;
    factorTypeCommand: IProcessType | null;
    id: number;
    name: string;
    parentId: number | null;
    projTaskCommand: IprojTaskCommand;
    project: IProject;
    refTask: number;
}

interface DecisionCommand {
    id: number;
    name: string;
    projProbCauseCommand: {
        children: null;
        factorTypeCommand: IProcessType;
        id: number;
        name: string;
        parentId: null;
        projTaskCommand: IprojTaskCommand;
    };
}

export interface TreeItem {
    decisionCommands: DecisionCommand[];
    factorTypeCommand: IProcessType;
    id: number;
    name: string;
    parentId: null;
    projTaskCommand: IprojTaskCommand;
}

export interface IRequestState {
    ImpFileRowId: any;
    allProcFlaw: any;
    projectFacts: IProjectStageFact[];
    allInDevStage: any;
    sectionFlagName: string;
    sectionFlag: number | null;
    projectForUpdate: any;
    menuFlags: any;
    SIPOCfile: any;
    MODELfile: IGeneralFileTable[];
    EXTRAfile: any;
    REASONfile: any;
    Expensesfile: any;
    ToBeModelfile: any;
    TOBEEXTRAfile: any;
    expenseTableFlag1: any;
    expenseTableFlag2: any;
    ANALISEXTRAfile: any;
    OPERATINGtable: any;
    TOBEExpensesFile: any;
    AutomationFile: any;
    DeployExtraFile: any;
    ITOGOfile: any;
    tempTable: any;
    tempTable2: any;
    costTable: any;
    costTable2: any;
    Los1Table: any;
    Los1Table2: any;
    Los2Table: any;
    Los2Table2: any;
    DkData: any;
    EventTypes: any;
    implementationData: any;
    tempByPartTable: any;
    tempByPartTable2: any;
    costByPartTable2: any;
    costByPartTable: any;
    globalAdditingFlag: boolean;
    globalEditingFlag: boolean;
    regFilter: IRequestFilter;
    projList: IProjectItem[];
    openProjectData: IFileListPrepare;
    openProjectFlag: boolean;
    cardType: string;
    allInitiativeType: IProcessType[];
    stages: IProcessType[];
    projPasport: any;
    fileListPasport: any;
    pasportFlag: boolean;
    prepareExtraParams: {
        name: string;
        initiativeType: IProcessType;
    };
    outOfRangeControlPoint: any;
    restState: any;
    works: any;
    workPlans: any;
    workFacts: any;
    pasportParams: any;
    ASISflag: string;
    showControlPoints: boolean;
    controlPoints: any;
    AtAllExp1Table: any;
    AtAllExp2Table: any;
    AtAlllos1Table: any;
    AtAlllos2Table: any;
    processType: IProcessType[];
    nameList: string[];
    workerList: IWorkerItem[];
    NPATypeList: IProcessType[];
    processList: IProcess[];
    fileListPrepare: IFileListPrepareItem[];
    IimplementationTable: IimplementationTable;
    DecisionTypes: any;
    gantFlag: boolean;
    losByPartTable: any;
    problemItems: IProblemItem[];
    problemList: IProblemListItem[];
}

export interface IFileListPrepareItem {
    dateNPA: string;
    id: number;
    nameNPA: string;
    numberNPA: string;
    projectFileCommand: {
        id: number;
        fileName: string;
        docName: string | null;
        contentType: string;
    };
    refNPAType: number;
}

export interface IProject {
    id: number;
    name: string;
}

export interface IimplementationTable {
    table: IimplementationTableItem[];
}

export interface IimplementationTableItem {
    factBegin: string;
    factEnd: string;
    factNote: string;
    id: number;
    projEventCommand: IprojEventCommand;
    projTaskCommand: IprojTaskCommand;
}

export interface IprojEventCommand {
    addLater: boolean;
    decisionTypeCommand: null;
    eventTypeCommand: IeventTypeCommand;
    id: number;
    name: string;
    planBegin: string;
    planEnd: string;
    projEventFactCommand: null;
    projTaskCommand: IprojTaskCommand;
    workerCommandList: IWorkerItem;
}

export interface IProblemItem {
    id: number;
    name: string;
    projTaskCommand: IprojTaskCommand;
}

export interface IprojTaskCommand {
    id: number;
    project: IProject;
    refTask: number;
}

export interface IeventTypeCommand {
    id: number;
    name: string;
    orderNumber: number;
}

export interface IProcess extends IProcessType {
    refProcessTypeId: number;
}

export interface IFileListPrepare {
    curators: IWorkerItem[];
    initiateType: IProcessType;
    process: IProcess;
    processTeam: IWorkerItem[];
    project: IProject;
    reengBegin: string;
    reengEnd: string;
    supervisor: ISupervisor | null;
}

export interface ISupervisor {
    id: number;
    name: string;
    orgName: string;
    post: string;
}
export interface IGeneralFileTable {
    refProjectFile?: {
        id: number;
    };
    commentChange: string;
    contentType: string;
    docName: string;
    fileName: string;
    id: number;
}

export interface MarksTableType {
    type: "temporary" | "cost";
    costMarksTableMainLevel: {
        mark: {
            id: 1;
            calculated: false;
            name: "Общие трудозатраты (заработная плата участников)";
            orderNumber: 1;
        };
        subLevelCommand: {
            institution: { functionBegin: string; functionEnd: string; id: number; name: string; orderNumber: number };
            value: number;
            recount?: string;
        }[];
        totalRecord: { name: "Всего"; value: number; recount?: string };
        value: number;
        recount?: string;
    }[];
}

export interface IsetRecountExpensesTableParams {
    table: MarksTableType;
    mainLvlId: number;
    subLvlId: number;
    value: number;
}

const initialState = ({
    statikAdministrationList: [
        {
            name: "Маковская Ирина Сергеевна",
            id: 6
        },
        {
            name: "Павский Артём Игоревич",
            id: 2
        },
        {
            name: "Петелина Мария Андреевна",
            id: 18
        }
    ],
    allProcFlaw: null,
    projList: null,
    openProjectData: null,
    menuFlags: {
        ProjectRegistryFlag: true
    },
    globalAdditingFlag: false,
    openProjectFlag: false,
    cardType: "",
    stages: null,
    regFilter: {
        stage: null,
        curator: null,
        supervisor: null,
        participiand: null,
        processTyepe: null,
        name: null
    },
    prepareExtraParams: {
        name: "",
        initiativeType: null
    },
    works: null,
    workPlans: null,
    workFacts: null,
    pasportParams: null,
    ASISflag: "",
    controlPoints: null,
    showControlPoints: false,
    AtAllExp1Table: [],
    AtAllExp2Table: [],
    AtAlllos1Table: [],
    AtAlllos2Table: [],
    workerList: null,
    pasportFlag: null,
    projectId: null,
    sectionFlag: null,
    implementationData: null,
    IimplementationTable: null,
    DecisionTypes: null,
    EventTypes: null,
    DkData: null,
    allInitiativeType: [],
    tempByPartTable2: null,
    costByPartTable2: null,
    costByPartTable: null,
    tempByPartTable: null,
    alertShow: null,
    ITOGOfile: null,
    Los2Table2: null,
    Los1Table2: null,
    costTable: null,
    costTable2: null,
    tempTable: null,
    tempTable2: null,
    DeployExtraFile: null,
    AutomationFile: null,
    TOBEExpensesFile: null,
    OPERATINGtable: null,
    ANALISEXTRAfile: null,
    TOBEEXTRAfileany: null,
    expenseTableFlag1: null,
    expenseTableFlag2: null,
    ToBeModelfile: null,
    Expensesfile: null,
    EXTRAfile: null,
    REASONfile: null,
    NPATypeList: null,
    MODELfile: [],
    SIPOCfile: null,
    fileNPATable: null,
    projPasport: null,
    gantFlag: true,
    problemItems: [],
    problemList: []
} as any) as IRequestState;

const getGrapthReducer = (state: IRequestState = initialState, action: RequestAction) => {
    switch (action.type) {
        case getType(setProjectStageFacts): {
            return {
                ...state,
                projectFacts: action.payload
            };
        }
        case SET_IMP_FILE_ROW_ID: {
            return { ...state, ImpFileRowId: action.payload };
        }
        case SET_ALL_INFOSYSTEM: {
            return { ...state, allInfosystem: action.payload };
        }
        case SET_PROJECT_REGISTRY_FLAG: {
            return {
                ...state,
                menuFlags: { ...state.menuFlags, ProjectRegistryFlag: !state.menuFlags.ProjectRegistryFlag }
            };
        }
        case SET_GLOBAL_ADDING_FLAG: {
            return { ...state, globalAdditingFlag: action.payload };
        }
        case SET_PROJ_LIST: {
            return {
                ...state,
                projList: (action.payload ?? []).sort((a, b) => {
                    return a.id - b.id;
                })
            };
        }
        case SET_PROCESS: {
            return { ...state, processList: action.payload };
        }
        case SET_WORKER: {
            return { ...state, workerList: action.payload };
        }
        case SET_PROJECT_DATA: {
            return { ...state, openProjectData: action.payload };
        }
        case SET_OPEN_PROJECT_FLAG: {
            return { ...state, openProjectFlag: action.payload };
        }
        case SET_CARD_TYPE: {
            return { ...state, cardType: action.payload };
        }
        case SET_ALL_STAGES: {
            return { ...state, stages: action.payload };
        }
        case SET_FILTER_STAGE: {
            return { ...state, regFilter: { ...state.regFilter, stage: action.payload } };
        }
        case SET_FILTER_CURATOR: {
            return { ...state, regFilter: { ...state.regFilter, curator: action.payload } };
        }
        case SET_FILTER_SUPERVISOR: {
            return { ...state, regFilter: { ...state.regFilter, supervisor: action.payload } };
        }
        case SET_FILTER_PARTICIPIANT: {
            return { ...state, regFilter: { ...state.regFilter, participiand: action.payload } };
        }
        case SET_FILTER_PROCESS_TYPE: {
            return { ...state, regFilter: { ...state.regFilter, processTyepe: action.payload } };
        }
        case SET_FILTER_NAME: {
            return { ...state, regFilter: { ...state.regFilter, name: action.payload } };
        }
        case SET_PROCESS_TYPE: {
            return { ...state, processType: action.payload };
        }
        case SET_NAME_LIST: {
            let nameList = [];
            for (let i = 0; i < action.payload.length; i++) {
                nameList.push(action.payload[i]);
            }
            return { ...state, nameList: nameList };
        }
        case SET_ALL_INITIATIVE_TYPE: {
            return { ...state, allInitiativeType: action.payload };
        }
        case SET_SELECTED_INITIATIVE_TYPE: {
            return { ...state, prepareExtraParams: { ...state.prepareExtraParams, initiativeType: action.payload } };
        }
        case CLEAR_STATE: {
            return {
                ...state,
                openProjectData: null,
                prepareExtraParams: { ...state.prepareExtraParams, initiativeType: null }
            };
        }
        case SET_WORK_FACTS: {
            return { ...state, workFacts: action.payload };
        }
        case SET_WORK_PLANS: {
            return { ...state, workPlans: action.payload };
        }
        case SET_WORKS: {
            return { ...state, works: action.payload };
        }
        case SET_FILE_LIST_PREPARE: {
            return { ...state, fileListPrepare: action.payload };
        }
        case SET_FILE_TABLE_PASPORT: {
            return { ...state, fileListPasport: action.payload };
        }
        case SET_ALERT_SHOW: {
            return { ...state, showAlert: action.payload };
        }
        case SET_ALL_NPA_TYPES: {
            return { ...state, NPATypeList: action.payload };
        }
        case SET_ALL_DECLARANT_TYPE: {
            return { ...state, pasportParams: { ...state.pasportParams, declarantType: action.payload } };
        }
        case SET_ALL_DAY_TYPE: {
            return { ...state, pasportParams: { ...state.pasportParams, alldayType: action.payload } };
        }
        case SET_ALL_TAX_TYPE: {
            return { ...state, pasportParams: { ...state.pasportParams, allTaxType: action.payload } };
        }
        case SET_UNUSED_PROCESS: {
            return { ...state, unusedProcess: action.payload };
        }
        case SET_ALL_DIGITAL_TYPE: {
            return { ...state, pasportParams: { ...state.pasportParams, allDigitalType: action.payload } };
        }
        case SET_ALL_INSTITUTION: {
            return { ...state, pasportParams: { ...state.pasportParams, allInstitution: action.payload } };
        }
        case SET_PASPORT_FLAG: {
            return { ...state, pasportFlag: action.payload };
        }
        case SET_AS_IS_FLAG: {
            return { ...state, ASISflag: action.payload };
        }
        case SET_PROJECT_PASPORT: {
            return { ...state, projPasport: action.payload };
        }
        case SET_FILE_TABLE_SIPOC: {
            return { ...state, SIPOCfile: action.payload };
        }
        case SET_FILE_TABLE_MODEL: {
            return { ...state, MODELfile: action.payload };
        }
        case SET_FILE_TABLE_REASON: {
            return { ...state, REASONfile: action.payload };
        }
        case SET_FILE_TABLE_EXTRA: {
            return { ...state, EXTRAfile: action.payload };
        }
        case SET_FILE_TABLE_TOBE_MODEL: {
            return { ...state, ToBeModelfile: action.payload };
        }
        case SET_FILE_TABLE_EXPENSES: {
            return { ...state, Expensesfile: action.payload };
        }
        case SET_CONTROL_POINTS: {
            return { ...state, controlPoints: action.payload };
        }
        case SET_CONTROLPOINTS_SHOW: {
            return { ...state, showControlPoints: action.payload };
        }
        case SET_EXPENSE_TABLE_FLAG1: {
            if (action.payload.t == 1) {
                return { ...state, expenseTableFlag1: action.payload.type };
            }
            if (action.payload.t == 2) {
                return { ...state, expenseTableFlag2: action.payload.type };
            }
        }
        case SET_FILE_TABLE_ANALIS_EXTRA: {
            return { ...state, ANALISEXTRAfile: action.payload };
        }
        case SET_FILE_TABLE_TOBE_EXTRA: {
            return { ...state, TOBEEXTRAfile: action.payload };
        }
        case SET_TEMP_TABLE: {
            return { ...state, tempTable: action.payload.data };
        }
        case SET_COST_TABLE: {
            return { ...state, costTable: action.payload.data };
        }
        case SER_FILE_TABLE_TOBE_OPERATING: {
            return { ...state, OPERATINGtable: action.payload };
        }
        case SET_FILE_TOBE_EXPENSES: {
            return { ...state, TOBEExpensesFile: action.payload };
        }
        case SET_FILE_TABLE_AUTOMATION: {
            return { ...state, AutomationFile: action.payload };
        }
        case SETFILE_TABLE_DEPLOY_EXTRA: {
            return { ...state, DeployExtraFile: action.payload };
        }
        case SET_LOS1_TABLE: {
            return { ...state, Los1Table: action.payload.data };
        }
        case SET_LOS2_TABLE: {
            return { ...state, Los2Table: action.payload.data };
        }
        case SET_FILE_TABLE_ITOGO: {
            return { ...state, ITOGOfile: action.payload };
        }
        case SET_LOS1_TABLE2: {
            return { ...state, Los1Table2: action.payload.data };
        }
        case SET_LOS2_TABLE2: {
            return { ...state, Los2Table2: action.payload.data };
        }
        case SET_COST_TABLE2: {
            return { ...state, costTable2: action.payload.data };
        }
        case SET_TEMP_TABLE2: {
            return { ...state, tempTable2: action.payload.data };
        }
        case SET_COST_BY_PART_TABLE: {
            return { ...state, costByPartTable: action.payload };
        }
        case SET_TEMP_BY_PART_TABLE: {
            return { ...state, tempByPartTable: action.payload };
        }
        case SET_TEMP_BY_PART_TABLE2: {
            return { ...state, tempByPartTable2: action.payload };
        }
        case SET_COST_BY_PART_TABLE2: {
            return { ...state, costByPartTable2: action.payload };
        }
        case SET_DK_DATE: {
            return { ...state, DkData: action.payload };
        }
        case SET_ALL_EVENT_TYPE: {
            return { ...state, EventTypes: action.payload };
        }
        case SET_ALL_DECISION_TYPE: {
            return { ...state, DecisionTypes: action.payload };
        }
        case SET_OUT_OF_RANGE_CONTROL_POINT: {
            return { ...state, outOfRangeControlPoint: action.payload };
        }
        case SET_REST_STATE: {
            return { ...state, restState: action.payload };
        }
        case SET_IMP_DATE: {
            return { ...state, IimplementationTable: action.payload };
        }
        case SET_SECTION_PAYLOAD: {
            return { ...state, sectionFlag: action.payload };
        }
        case SET_GANT_FLAG: {
            return { ...state, gantFlag: !state.gantFlag };
        }
        case SET_LOS_BYPART_TABLE: {
            return { ...state, losByPartTable: action.payload };
        }
        case SET_STEP_BYPART_TABLE: {
            return { ...state, stepByPartTable: action.payload };
        }
        case SET_EDIT_FLAG: {
            return { ...state, globalEditingFlag: action.payload };
        }
        case SET_PROJECT_FOR_UPDATE: {
            return { ...state, projectForUpdate: action.payload };
        }
        case SET_SECTIONS_FLAG_NAME: {
            return { ...state, sectionFlagName: action.payload };
        }
        case SET_ALLIN_DEV_STAGE: {
            return { ...state, allInDevStage: action.payload };
        }
        case SET_ALL_PROCFLAW: {
            return { ...state, allProcFlaw: action.payload };
        }
        case "SET_PROCESS_ITEMS": {
            return {
                ...state,
                problemItems: action.payload
            };
        }
        case "SET_PROBLEM_LIST": {
            return {
                ...state,
                problemList: action.payload
            };
        }
        default:
            return state;
    }
};

export default getGrapthReducer;
