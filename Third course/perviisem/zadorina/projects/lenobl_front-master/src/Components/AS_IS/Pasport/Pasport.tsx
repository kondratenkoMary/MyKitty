import React, { useEffect } from "react";
import PasportMenu from "./PasportMenu";
import PasportFields from "./PasportFields";
import { Col, Row, Card, Alert, Button } from "react-bootstrap";

import SIPOC from "../SIPOC/SIPOC";
import Model from "../Model/Model";
import Reason from "../../Analysis/Reason/Reason";
import Extra from "../Extra/Extra";
import ModelTobe from "../../TO_BE/Model/Model";
import Expenses from "../../Analysis/Expenses/Expenses";
import Operating from "../../TO_BE/Operating/Operating";
import ExpensesToBe from "../../TO_BE/Expenses/ExprnsesToBe";
import Automation from "../../PlanDeploy/Automation/Automation";
import Itogo from "../../Itogo";
import Dk from "../../PlanDeploy/Dk/Dk";
import BadPlays from "../BadPlays/BadPlays";
import ProblemInfo from "./views/ProblemInfo";

function Pasport(props) {
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        setShow(props.alertShow);
    }, [props.alertShow]);

    return (
        <>
            <br />
            {show && (
                <Alert variant="success">
                    Сохранение прошло успешно
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => {
                                setShow(false);
                                props.setAlertShow(false);
                            }}
                            variant="outline-success"
                        >
                            Ок
                        </Button>
                    </div>
                </Alert>
            )}
            <div>
                <PasportMenu projId={props.projId} sectionFlag={props.sectionFlag} setASISflag={props.setASISflag} />
            </div>
            <div>
                <div>
                    {props.ASISflag == "Формулировка проблемы" && <ProblemInfo projId={props.projId} taskId={24} />}
                    {props.ASISflag == "Узкие места" && <BadPlays projId={props.projId} />}
                    {props.ASISflag == "Паспорт" && (
                        <PasportFields
                            saveFile={props.saveFile}
                            fileNPATable={props.fileNPATable}
                            projPasport={props.projPasport}
                            addDocument={props.addDocument}
                            projId={props.projId}
                            savePasportFields={props.savePasportFields}
                            processType={props.processType}
                            pasportParams={props.pasportParams}
                            NPATypeList={props.NPATypeList}
                            allInfosystem={props.allInfosystem}
                        />
                    )}
                    {props.ASISflag == "SIPOC" && <SIPOC projId={props.projId} />}
                    {props.ASISflag == "Модель" && <Model projId={props.projId} />}
                    {props.ASISflag == "Дополнительно" && <Extra type={1} projId={props.projId} />}
                    {props.ASISflag == "Дополнительно 2" && <Extra type={2} projId={props.projId} />}
                    {props.ASISflag == "Дополнительно 3" && <Extra type={3} projId={props.projId} />}
                    {props.ASISflag == "Причины/следствия" && (
                        <Reason
                            REASONfile={props.REASONfile}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}
                    {props.ASISflag == "Модель(TO_BE)" && (
                        <ModelTobe
                            ToBeModelfile={props.ToBeModelfile}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}

                    {props.ASISflag == "Затраты/потери" && (
                        <Expenses
                            projId={props.projId}
                            losByPartTable={props.losByPartTable}
                            saveByPartCostTable={props.saveByPartCostTable}
                            costByPartTable={props.costByPartTable}
                            tempByPartTable={props.tempByPartTable}
                            saveLosTable={props.saveLosTable}
                            Los2Table={props.Los2Table}
                            saveStepTable={props.saveStepTable}
                            saveCostTable={props.saveCostTable}
                            AtAllExp1Table={props.costTable}
                            AtAllExp2Table={props.tempTable}
                            AtAllLos1Table={props.Los1Table}
                            AtAllLos2Table={props.Los2Table}
                            setExpenseTableFlag={props.setExpenseTableFlag}
                            expenseTableFlag1={props.expenseTableFlag1}
                            expenseTableFlag2={props.expenseTableFlag2}
                            Expensesfile={props.Expensesfile}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                            saveByPartLosTable={props.saveByPartLosTable}
                            stepByPartTable={props.stepByPartTable}
                            saveByPartStepTable={props.saveByPartStepTable}
                        />
                    )}

                    {props.ASISflag == "Затраты/потери(TO_BE)" && (
                        <ExpensesToBe
                            projId={props.projId}
                            saveByPartCostTable={props.saveByPartCostTable}
                            costByPartTable={props.costByPartTable2}
                            tempByPartTable={props.tempByPartTable2}
                            saveCostTable={props.saveCostTable}
                            saveLosTable={props.saveLosTable}
                            saveStepTable={props.saveStepTable}
                            AtAllLos1Table={props.Los1Table2}
                            AtAllLos2Table={props.Los2Table2}
                            AtAllExp1Table={props.costTable2}
                            AtAllExp2Table={props.tempTable2}
                            setExpenseTableFlag={props.setExpenseTableFlag}
                            expenseTableFlag1={props.expenseTableFlag1}
                            TOBEExpensesFile={props.TOBEExpensesFile}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}

                    {props.ASISflag == "Наработки" && (
                        <Operating
                            OPERATINGtable={props.OPERATINGtable}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}
                    {props.ASISflag == "ДК" && (
                        <Dk
                            workerList={props.workerList}
                            DecisionTypes={props.DecisionTypes}
                            EventTypes={props.EventTypes}
                            DeleteDkRow={props.DeleteDkRow}
                            updateDkRow={props.updateDkRow}
                            DkData={props.DkData}
                            insertNewDkRow={props.insertNewDkRow}
                            projId={props.projId}
                            Expensesfile={props.Expensesfile}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}
                    {props.ASISflag == "Автоматизация" && (
                        <Automation
                            AutomationFile={props.AutomationFile}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}
                    {props.ASISflag == "Дополнительно 4" && (
                        <Extra
                            type={4}
                            EXTRAfile={props.DeployExtraFile}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}
                    {props.ASISflag == "Итоги" && (
                        <Itogo
                            type={4}
                            ITOGOfile={props.ITOGOfile}
                            projId={props.projId}
                            addDocument={props.addDocument}
                            saveFile={props.saveFile}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Pasport;
