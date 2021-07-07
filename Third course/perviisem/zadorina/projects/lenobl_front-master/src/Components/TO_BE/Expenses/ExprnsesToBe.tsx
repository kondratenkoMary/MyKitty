import React from "react";
import { Tabs, Tab, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import FileExpenses from "./FileExp/ExprnsesToBe";
import TableExpenses from "./TableExp/TableExpenses";
import AnalisExpenses from "./AnalisExpenses";

function ExprnsesToBe(props) {
    const [page, setPage] = React.useState("Анализ данных");

    return (
        <>
            <Row>
                {/* <ExpensesToBeMenu></ExpensesToBeMenu> */}
                <b>Расчёт затрат</b>
            </Row>
            <Row>
                {" "}
                Рассчитать трудозатраты и иные расходы на реализацию процесса согласно каждому подготовленному варианту
                модели «как должно быть»{" "}
            </Row>
            <br />
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Анализ данных");
                }}
            >
                {" "}
                Анализ данных{" "}
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Изменить данные");
                }}
            >
                {" "}
                Изменить данные{" "}
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Прикрепить файлы");
                }}
            >
                {" "}
                Прикрепить файлы{" "}
            </Button>
            {page === "Прикрепить файлы" ? (
                <>
                    <br />
                    <br />
                    <FileExpenses
                        saveFile={props.saveFile}
                        addDocument={props.addDocument}
                        projId={props.projId}
                        ToBeExpensesfile={props.TOBEExpensesFile}
                    ></FileExpenses>
                </>
            ) : (
                ""
            )}
            {page === "Изменить данные" ? (
                <>
                    <br />
                    <br />
                    <TableExpenses
                        saveByPartCostTable={props.saveByPartCostTable}
                        costByPartTable={props.costByPartTable}
                        tempByPartTable={props.tempByPartTable}
                        saveStepTable={props.saveStepTable}
                        saveLosTable={props.saveLosTable}
                        saveCostTable={props.saveCostTable}
                        setExpenseTableFlag={props.setExpenseTableFlag}
                        expenseTableFlag1={props.expenseTableFlag1}
                        projId={props.projId}
                        AtAllExp1Table={props.AtAllExp1Table}
                        AtAllExp2Table={props.AtAllExp2Table}
                        AtAllLos2Table={props.AtAllLos2Table}
                        AtAllLos1Table={props.AtAllLos1Table}
                        setExpenseTableFlag={props.setExpenseTableFlag}
                        expenseTableFlag1={props.expenseTableFlag1}
                    ></TableExpenses>
                </>
            ) : (
                ""
            )}
            {page === "Анализ данных" ? (
                <>
                    <br />
                    <br />
                    <AnalisExpenses projId={props.projId}></AnalisExpenses>
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default ExprnsesToBe;
