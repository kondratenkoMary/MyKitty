import React from "react";
import { useDispatch } from "react-redux";
import { Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import {
    getCostTable,
    getTempTable,
    getTempByPartTable,
    getCostByPartTable,
    getLosTable,
    getLosTable2,
    getLosByPartTable,
    getStepByPartTable
} from "../../../../Actions/rest";

function ExpensesMenu(props) {
    const dispatch = useDispatch();

    return (
        <>
            <Col>
                Показатели затрат :{" "}
                <Button
                    onClick={() => {
                        dispatch(getCostTable(props.projId, 13, 9));
                        dispatch(getTempTable(props.projId, 13, 9));
                        props.setExpenseTableFlag("В целом", 1);
                        props.setExpenseTableFlag("Показатели затрат", 2);
                    }}
                >
                    В целом
                </Button>{" "}
                <Button
                    onClick={() => {
                        dispatch(getTempByPartTable(props.projId, 13, 9));
                        dispatch(getCostByPartTable(props.projId, 13, 9));
                        props.setExpenseTableFlag("По участникам", 1);
                        props.setExpenseTableFlag("Показатели затрат", 2);
                    }}
                >
                    По участникам
                </Button>
            </Col>
            <Col xs={1}></Col>
            <Col>
                Показатели потерь :{" "}
                <Button
                    onClick={() => {
                        dispatch(getLosTable(props.projId, 13, 9));
                        dispatch(getLosTable2(props.projId, 13, 9));
                        props.setExpenseTableFlag("В целом", 1);
                        props.setExpenseTableFlag("Показатели потерь", 2);
                    }}
                >
                    В целом
                </Button>{" "}
                <Button
                    onClick={() => {
                        dispatch(getLosByPartTable(props.projId, 13, 9));
                        dispatch(getStepByPartTable(props.projId, 13, 9));
                        props.setExpenseTableFlag("По участникам", 1);
                        props.setExpenseTableFlag("Показатели потерь", 2);
                    }}
                >
                    По участникам
                </Button>
            </Col>
        </>
    );
}

export default ExpensesMenu;
