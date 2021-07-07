import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import ExpensesMenu from "./ExpensesMenu";
import ExpensesFields from "./ExpensesFields";

function AtAllLos2Table(props) {
    const [myTable, setMyTable] = React.useState(props.AtAllLos2Table?.lossTableRecord);
    const [tableShow, setTableShow] = React.useState();
    const [summ, setSumm] = React.useState(0);

    function setTableHelper(row, numOfStep, stepDurations, rowNumb) {
        let mas = [];
        for (let i = 0; i < myTable.length; i++) {
            if (i != rowNumb) {
                mas.push(myTable[i]);
            }
            if (i == rowNumb) {
                mas.push({
                    lossType: {
                        id: row.lossType.id,
                        name: row.lossType.name,
                        orderNumber: row.lossType.orderNumber
                    },
                    valueMark1: numOfStep != null ? Number(numOfStep) : myTable[i].valueMark1,
                    valueMark2: stepDurations != null ? Number(stepDurations) : myTable[i].valueMark2
                });
            }
        }
        setMyTable(mas);
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveLosTable(
                        props.projId,
                        {
                            lossTableRecord: myTable,
                            header1: "Число шагов (единицы)",
                            header2: "Продолжительность шагов (минуты)"
                        },
                        13,
                        9
                    );
                }}
            >
                Сохранить
            </Button>
            {props.AtAllLos2Table != undefined && props.AtAllLos2Table != null ? (
                <Table>
                    <thead>
                        <tr>
                            <th>Тип потерь</th>
                            <th>Число шагов (единицы) </th>
                            <th>Продолжительность шагов (минуты) </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.AtAllLos2Table?.lossTableRecord[0].lossType.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[0],
                                            e.target.value,
                                            myTable.length != 0 ? myTable[0].valueMark2 : null,
                                            0
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[0].valueMark1}
                                    type="number"
                                ></input>
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[0],
                                            myTable.length != 0 ? myTable[0].valueMark1 : null,
                                            e.target.value,
                                            0
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[0].valueMark2}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>{props.AtAllLos2Table?.lossTableRecord[1].lossType.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[1],
                                            e.target.value,
                                            myTable.length != 0 ? myTable[1].valueMark2 : null,
                                            1
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[1].valueMark1}
                                    type="number"
                                ></input>
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[1],
                                            myTable.length != 0 ? myTable[1].valueMark1 : null,
                                            e.target.value,
                                            1
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[1].valueMark2}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>{props.AtAllLos2Table?.lossTableRecord[2].lossType.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[2],
                                            e.target.value,
                                            myTable.length != 0 ? myTable[2].valueMark2 : null,
                                            2
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[2].valueMark1}
                                    type="number"
                                ></input>
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[2],
                                            myTable.length != 0 ? myTable[2].valueMark1 : null,
                                            e.target.value,
                                            2
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[2].valueMark2}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>{props.AtAllLos2Table?.lossTableRecord[3].lossType.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[3],
                                            e.target.value,
                                            myTable.length != 0 ? myTable[3].valueMark2 : null,
                                            3
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[3].valueMark1}
                                    type="number"
                                ></input>
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[3],
                                            myTable.length != 0 ? myTable[3].valueMark1 : null,
                                            e.target.value,
                                            3
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[3].valueMark2}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>{props.AtAllLos2Table?.lossTableRecord[4].lossType.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[4],
                                            e.target.value,
                                            myTable.length != 0 ? myTable[4].valueMark2 : null,
                                            4
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[4].valueMark1}
                                    type="number"
                                ></input>
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[4],
                                            myTable.length != 0 ? myTable[4].valueMark1 : null,
                                            e.target.value,
                                            4
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[4].valueMark2}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>{props.AtAllLos2Table?.lossTableRecord[5].lossType.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[5],
                                            e.target.value,
                                            myTable.length != 0 ? myTable[5].valueMark2 : null,
                                            5
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[5].valueMark1}
                                    type="number"
                                ></input>
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(
                                            props.AtAllLos2Table?.lossTableRecord[5],
                                            myTable.length != 0 ? myTable[5].valueMark1 : null,
                                            e.target.value,
                                            5
                                        );
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllLos2Table?.lossTableRecord[5].valueMark2}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Итого</td>
                            <td>
                                {myTable[5].valueMark1 +
                                    myTable[4].valueMark1 +
                                    myTable[3].valueMark1 +
                                    myTable[2].valueMark1 +
                                    myTable[1].valueMark1 +
                                    myTable[0].valueMark1}
                            </td>
                            <td>
                                {myTable[5].valueMark2 +
                                    myTable[4].valueMark2 +
                                    myTable[3].valueMark2 +
                                    myTable[2].valueMark2 +
                                    myTable[1].valueMark2 +
                                    myTable[0].valueMark2}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                ""
            )}
        </>
    );
}

export default AtAllLos2Table;
