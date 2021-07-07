import React from "react";
import { Button, Table, FormControl, Dropdown, Row, Col, Card } from "react-bootstrap";
import AtAllExp1Table from "./AtAllExp1";
import AtAllLos1Table from "./AtAllLos1";
import AtAllLos2Table from "./AtAllLos2";
import AtAllExp2Table from "./AtAllExp2";

import ByPatiExp1Table from "./ByPatiExp1";
import ByPatiExp2Table from "./ByPatiExp2";
import ByPatiLos1Table from "./ByPatiLos1";
import ByPatiLos2Table from "./ByPatiLos2";

function ExpensesFields(props) {
    return (
        <>
            {console.log(props)}

            {props.expenseTableFlag1 == "В целом" && props.expenseTableFlag2 == "Показатели затрат" ? (
                <Col xs={6}>
                    <AtAllExp1Table
                        projId={props.projId}
                        saveCostTable={props.saveCostTable}
                        AtAllExp1Table={props.AtAllExp1Table}
                    ></AtAllExp1Table>
                </Col>
            ) : (
                ""
            )}
            {props.expenseTableFlag1 == "В целом" && props.expenseTableFlag2 == "Показатели затрат" ? (
                <Col xs={6}>
                    <AtAllExp2Table
                        projId={props.projId}
                        saveCostTable={props.saveCostTable}
                        AtAllExp2Table={props.AtAllExp2Table}
                    ></AtAllExp2Table>
                </Col>
            ) : (
                ""
            )}
            {props.expenseTableFlag1 == "В целом" && props.expenseTableFlag2 == "Показатели потерь" ? (
                <Col xs={6}>
                    <AtAllLos1Table
                        saveStepTable={props.saveStepTable}
                        projId={props.projId}
                        saveCostTable={props.saveCostTable}
                        AtAllLos1Table={props.AtAllLos1Table}
                    ></AtAllLos1Table>
                </Col>
            ) : (
                ""
            )}
            {props.expenseTableFlag1 == "В целом" && props.expenseTableFlag2 == "Показатели потерь" ? (
                <Col xs={6}>
                    <AtAllLos2Table
                        saveLosTable={props.saveLosTable}
                        AtAllLos2Table={props.AtAllLos2Table}
                        projId={props.projId}
                    ></AtAllLos2Table>
                </Col>
            ) : (
                ""
            )}

            {props.expenseTableFlag1 == "По участникам" && props.expenseTableFlag2 == "Показатели затрат" ? (
                <Col xs={6}>
                    <ByPatiExp1Table
                        projId={props.projId}
                        saveByPartCostTable={props.saveByPartCostTable}
                        costByPartTable={props.costByPartTable}
                    ></ByPatiExp1Table>
                </Col>
            ) : (
                ""
            )}
            {props.expenseTableFlag1 == "По участникам" && props.expenseTableFlag2 == "Показатели затрат" ? (
                <Col xs={6}>
                    <ByPatiExp2Table
                        projId={props.projId}
                        saveByPartCostTable={props.saveByPartCostTable}
                        tempByPartTable={props.tempByPartTable}
                    ></ByPatiExp2Table>
                </Col>
            ) : (
                ""
            )}
            {props.expenseTableFlag1 == "По участникам" && props.expenseTableFlag2 == "Показатели потерь" ? (
                <Col xs={6}>
                    <ByPatiLos1Table
                        saveByPartStepTable={props.saveByPartStepTable}
                        stepByPartTable={props.stepByPartTable}
                        projId={props.projId}
                    ></ByPatiLos1Table>
                </Col>
            ) : (
                ""
            )}
            {props.expenseTableFlag1 == "По участникам" && props.expenseTableFlag2 == "Показатели потерь" ? (
                <Col xs={6}>
                    <ByPatiLos2Table
                        saveByPartLosTable={props.saveByPartLosTable}
                        losByPartTable={props.losByPartTable}
                        projId={props.projId}
                    ></ByPatiLos2Table>
                </Col>
            ) : (
                ""
            )}
        </>
    );
}

export default ExpensesFields;
