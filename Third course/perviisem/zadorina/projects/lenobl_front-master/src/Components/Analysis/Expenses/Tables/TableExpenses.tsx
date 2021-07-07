import React from "react";
import { Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import ExpensesMenu from "./ExpensesMenu";
import ExpensesFields from "./ExpensesFields";

function TableExpenses(props) {
    return (
        <>
            {/* {console.log(">>ADADADADAD", props.saveByPartLosTable)} */}

            <Row>
                <ExpensesMenu projId={props.projId} setExpenseTableFlag={props.setExpenseTableFlag}></ExpensesMenu>
            </Row>
            <br />
            <Row>
                <ExpensesFields
                    projId={props.projId}
                    stepByPartTable={props.stepByPartTable}
                    losByPartTable={props.losByPartTable}
                    saveByPartCostTable={props.saveByPartCostTable}
                    costByPartTable={props.costByPartTable}
                    tempByPartTable={props.tempByPartTable}
                    saveLosTable={props.saveLosTable}
                    saveStepTable={props.saveStepTable}
                    saveCostTable={props.saveCostTable}
                    AtAllExp1Table={props.AtAllExp1Table}
                    AtAllExp2Table={props.AtAllExp2Table}
                    AtAllLos1Table={props.AtAllLos1Table}
                    AtAllLos2Table={props.AtAllLos2Table}
                    expenseTableFlag2={props.expenseTableFlag2}
                    expenseTableFlag1={props.expenseTableFlag1}
                    saveByPartLosTable={props.saveByPartLosTable}
                    saveByPartStepTable={props.saveByPartStepTable}
                >
                    {" "}
                </ExpensesFields>
            </Row>
        </>
    );
}

export default TableExpenses;
