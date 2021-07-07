import React, { useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
// import Pasport from '../Pasport';
import Pasport from "../AS_IS/Pasport/Pasport";
import PageName from "../PageName";
import CardDevWorks from "./CardDevWorks";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { IRequestState } from "../../reducers/grapthReducer";
import {
    addDocument,
    DeleteDkRow,
    getFileTablePasport,
    getFileTableSIPOC,
    insertNewDkRow,
    saveByPartCostTable,
    saveCostTable,
    saveFile,
    saveLosTable,
    savePasportFields,
    saveStepTable,
    updateDkRow,
    saveByPartLosTable,
    getStepByPartTable,
    saveByPartStepTable,
    deleteFile
} from "../../Actions/rest";
import { setAlertShow, setASISflag, setExpenseTableFlag, setGantFlag } from "../../Actions/actions";
import { useRouteMatch } from "react-router";

export interface ICardDevConnected {
    workerList: IRequestState["workerList"];
    implementationData: IRequestState["implementationData"];
    DecisionTypes: IRequestState["DecisionTypes"];
    EventTypes: IRequestState["EventTypes"];
    DkData: IRequestState["DkData"];
    tempByPartTable2: IRequestState["tempByPartTable2"];
    costByPartTable2: IRequestState["costByPartTable2"];
    costByPartTable: IRequestState["costByPartTable"];
    tempByPartTable: IRequestState["tempByPartTable"];
    ITOGOfile: IRequestState["ITOGOfile"];
    Los2Table: IRequestState["Los2Table"];
    Los2Table2: IRequestState["Los2Table2"];
    Los1Table: IRequestState["Los1Table"];
    Los1Table2: IRequestState["Los1Table2"];
    costTable: IRequestState["costTable"];
    costTable2: IRequestState["costTable2"];
    tempTable: IRequestState["tempTable"];
    tempTable2: IRequestState["tempTable2"];
    DeployExtraFile: IRequestState["DeployExtraFile"];
    AutomationFile: IRequestState["AutomationFile"];
    TOBEExpensesFile: IRequestState["TOBEExpensesFile"];
    OPERATINGtable: IRequestState["OPERATINGtable"];
    ANALISEXTRAfile: IRequestState["ANALISEXTRAfile"];
    TOBEEXTRAfile: IRequestState["TOBEEXTRAfile"];
    ToBeModelfile: IRequestState["ToBeModelfile"];
    Expensesfile: IRequestState["Expensesfile"];
    EXTRAfile: IRequestState["EXTRAfile"];
    REASONfile: IRequestState["REASONfile"];
    pasportParams: IRequestState["pasportParams"];
    NPATypeList: IRequestState["NPATypeList"];
    MODELfile: IRequestState["MODELfile"];
    SIPOCfile: IRequestState["SIPOCfile"];
    fileNPATable: IRequestState["fileListPasport"];
    projPasport: IRequestState["projPasport"];
    processType: IRequestState["openProjectData"]["process"]["refProcessTypeId"];
    ASISflag: IRequestState["ASISflag"];
}

const CardDev = () => {
    const [showGant, setShowGant] = useState(true);
    const dispatch = useDispatch();
    const passportFlag = useSelector<StoreType, boolean>(({ grapth }) => grapth.pasportFlag);
    const projectId = useRouteMatch<{ id: string }>().params.id;

    // todo временно сделано так, чтобы не переписывать внутренние компоненты и ускорить разработку
    // все эти свойства надо напрямую монтировать через useSelector в самих компонентах!
    // методы вызывать в самих компонентах с помощью useDispatch(метод(свойства))
    const data = useSelector<StoreType, ICardDevConnected>(({ grapth }) => ({
        workerList: grapth.workerList,
        implementationData: grapth.implementationData,
        EventTypes: grapth.EventTypes,
        DecisionTypes: grapth.DecisionTypes,
        DkData: grapth.DkData,
        tempByPartTable2: grapth.tempByPartTable2,
        costByPartTable2: grapth.costByPartTable2,
        costByPartTable: grapth.costByPartTable,
        tempByPartTable: grapth.tempByPartTable,
        ITOGOfile: grapth.ITOGOfile,
        Los2Table: grapth.Los2Table,
        Los2Table2: grapth.Los2Table2,
        Los1Table: grapth.Los1Table,
        Los1Table2: grapth.Los1Table2,
        tempTable: grapth.tempTable,
        tempTable2: grapth.tempTable2,
        costTable: grapth.costTable,
        costTable2: grapth.costTable2,
        DeployExtraFile: grapth.DeployExtraFile,
        AutomationFile: grapth.AutomationFile,
        TOBEExpensesFile: grapth.TOBEExpensesFile,
        OPERATINGtable: grapth.OPERATINGtable,
        ANALISEXTRAfile: grapth.ANALISEXTRAfile,
        TOBEEXTRAfile: grapth.TOBEEXTRAfile,
        expenseTableFlag1: grapth.expenseTableFlag1,
        expenseTableFlag2: grapth.expenseTableFlag2,
        ToBeModelfile: grapth.ToBeModelfile,
        Expensesfile: grapth.Expensesfile,
        EXTRAfile: grapth.EXTRAfile,
        REASONfile: grapth.REASONfile,
        pasportParams: grapth.pasportParams,
        NPATypeList: grapth.NPATypeList,
        SIPOCfile: grapth.SIPOCfile,
        MODELfile: grapth.MODELfile,
        fileNPATable: grapth.fileListPasport,
        projPasport: grapth.projPasport,
        processType: grapth.openProjectData?.process?.refProcessTypeId,
        ASISflag: grapth.ASISflag,
        sectionFlag: grapth.sectionFlag,
        gantFlag: grapth.gantFlag,
        losByPartTable: grapth.losByPartTable,
        stepByPartTable: grapth.stepByPartTable,
        sectionFlagName: grapth.sectionFlagName,
        allInfosystem: grapth.allInfosystem
    }));

    const actions = {
        DeleteDkRow: (...params) => dispatch(DeleteDkRow(...params)),
        updateDkRow: (...params) => dispatch(updateDkRow(...params)),
        insertNewDkRow: (...params) => dispatch(insertNewDkRow(...params)),
        saveByPartCostTable: (...params) => dispatch(saveByPartCostTable(...params)),
        setAlertShow: (...params) => dispatch(setAlertShow(...params)),
        saveLosTable: (...params) => dispatch(saveLosTable(...params)),
        saveStepTable: (...params) => dispatch(saveStepTable(...params)),
        saveCostTable: (...params) => dispatch(saveCostTable(...params)),
        setExpenseTableFlag: (...params) => dispatch(setExpenseTableFlag(...params)),
        addDocument: (...params) => dispatch(addDocument(...params)),
        saveFile: (...params) => dispatch(saveFile(...params)),
        getFileTableSIPOC: (...params) => dispatch(getFileTableSIPOC(...params)),
        getFileTablePasport: (...params) => dispatch(getFileTablePasport(...params)),
        savePasportFields: (...params) => dispatch(savePasportFields(...params)),
        setASISflag: (...params) => dispatch(setASISflag(...params)),
        saveByPartLosTable: (...params) => dispatch(saveByPartLosTable(...params)),
        getStepByPartTable: (...params) => dispatch(getStepByPartTable(...params)),
        saveByPartStepTable: (...params) => dispatch(saveByPartStepTable(...params)),
        deleteFile: (...params) => dispatch(deleteFile(...params))
    };

    return (
        <>
            {/* <div className="px-4">
                <PageName>
                    Разработка{" "}
                    <Button
                        onClick={() => {
                            setShowGant((value) => !value);
                        }}
                    >
                        ⇅
                    </Button>
                </PageName>
            </div> */}
            <div className="px-4">
                <PageName>Разработка </PageName>
            </div>
            <div>
                <div className="m-4 p-4 bg-white core-radius">
                    <h3 className="mb-3">План разработки</h3>
                    <CardDevWorks />
                </div>

                {passportFlag && (
                    <div className="m-4 p-4 core-radius bg-white">
                        <h3>{data.sectionFlagName}</h3>
                        <div>
                            <Pasport projId={projectId} {...data} {...actions} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CardDev;
