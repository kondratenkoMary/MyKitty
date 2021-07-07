import React from "react";
import {
    Popover,
    Overlay,
    Button,
    Row,
    Col,
    Dropdown,
    FormControl,
    Form,
    DropdownButton,
    Tab,
    Tabs
} from "react-bootstrap";
import TableExpenses from "./Tables/TableExpenses";
import FileExpenses from "./Files/FileExpenses";
import AnalisExpenses from "./AnalisExpenses";

function Expenses(props) {
    const [page, setPage] = React.useState("Анализ данных");
    return (
        <>
            <Row>
                <b>Расчёт затрат и потерь</b>
            </Row>
            <Row>
                {" "}
                Рассчитать трудозатраты и иные расходы на реализацию процесса и определить потери на каждом шаге
                процесса по методологии SWIIMTOO{" "}
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
                    props.setExpenseTableFlag("В целом", 1);
                    props.setExpenseTableFlag("Показатели затрат", 2);
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
                        Expensesfile={props.Expensesfile}
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
                        setExpenseTableFlag={props.setExpenseTableFlag}
                        expenseTableFlag2={props.expenseTableFlag2}
                        expenseTableFlag1={props.expenseTableFlag1}
                        saveByPartLosTable={props.saveByPartLosTable}
                        saveByPartStepTable={props.saveByPartStepTable}
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

export default Expenses;
