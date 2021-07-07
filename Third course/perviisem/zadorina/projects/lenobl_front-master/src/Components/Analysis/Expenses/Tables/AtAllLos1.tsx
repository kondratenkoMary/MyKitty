import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import ExpensesMenu from "./ExpensesMenu";
import ExpensesFields from "./ExpensesFields";

function AtAllLos1Table(props) {
    const [myTable, setMyTable] = React.useState(props.AtAllLos1Table?.stepValueTableRecord || []);
    const [mdwla, setmdwla] = React.useState("");
    const [summ, setSumm] = React.useState(0);

    React.useMemo(() => {
        setMyTable(props.AtAllLos1Table?.stepValueTableRecord);
    }, [props.AtAllLos1Table]);

    function setTableHelper(row, numOfStep, stepDurations, rowNumb) {
        let mas = [];
        let sum = 0;
        for (let i = 0; i < myTable.length; i++) {
            if (i != rowNumb) {
                mas.push(myTable[i]);
            }
            if (i == rowNumb) {
                mas.push({
                    stepValueType: {
                        id: row.stepValueType.id,
                        name: row.stepValueType.name,
                        orderNumber: row.stepValueType.orderNumber
                    },
                    valueMark1: numOfStep != null ? Number(numOfStep) : myTable[i]?.valueMark1,
                    valueMark2: stepDurations != null ? Number(stepDurations) : myTable[i]?.valueMark2
                });
            }
        }
        setMyTable(mas);
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveStepTable(
                        props.projId,
                        {
                            stepValueTableRecord: myTable,
                            header1: "Число шагов (единицы)",
                            header2: "Продолжительность шагов (минуты)",
                            total: props.AtAllLos1Table.total
                        },
                        13,
                        9
                    );
                }}
            >
                Сохранить
            </Button>

            <Table>
                <thead>
                    <tr>
                        <th>Тип ценности шагов</th>
                        <th>{props.AtAllLos1Table?.header1}</th>
                        <th>{props.AtAllLos1Table?.header2}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.AtAllLos1Table?.stepValueTableRecord[0].stepValueType.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setmdwla("dwmnagoawkdpawmgf");
                                    console.log(mdwla);
                                    setTableHelper(
                                        props.AtAllLos1Table?.stepValueTableRecord[0],
                                        e.target.value,
                                        myTable.length != 0 ? myTable[0].valueMark2 : null,
                                        0
                                    );
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllLos1Table?.stepValueTableRecord[0]?.valueMark1}
                                type="number"
                            ></input>
                        </td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(
                                        props.AtAllLos1Table?.stepValueTableRecord[0],
                                        myTable.length != 0 ? myTable[0]?.valueMark1 : null,
                                        e.target.value,
                                        0
                                    );
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllLos1Table?.stepValueTableRecord[0].valueMark2}
                                type="number"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>{props.AtAllLos1Table?.stepValueTableRecord[1].stepValueType.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setmdwla("dwmnagoawkdpawmgf");
                                    console.log(mdwla);
                                    setTableHelper(
                                        props.AtAllLos1Table?.stepValueTableRecord[1],
                                        e.target.value,
                                        myTable.length != 0 ? myTable[1].valueMark2 : null,
                                        1
                                    );
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllLos1Table?.stepValueTableRecord[1]?.valueMark1}
                                type="number"
                            ></input>
                        </td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(
                                        props.AtAllLos1Table?.stepValueTableRecord[1],
                                        myTable.length != 0 ? myTable[1]?.valueMark1 : null,
                                        e.target.value,
                                        1
                                    );
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllLos1Table?.stepValueTableRecord[1]?.valueMark2}
                                type="number"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>{props.AtAllLos1Table?.stepValueTableRecord[2]?.stepValueType.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setmdwla("dwmnagoawkdpawmgf");
                                    console.log(mdwla);
                                    setTableHelper(
                                        props.AtAllLos1Table?.stepValueTableRecord[2],
                                        e.target.value,
                                        myTable.length != 0 ? myTable[2]?.valueMark2 : null,
                                        2
                                    );
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllLos1Table?.stepValueTableRecord[2]?.valueMark1}
                                type="number"
                            ></input>
                        </td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(
                                        props.AtAllLos1Table?.stepValueTableRecord[2],
                                        myTable.length != 0 ? myTable[2]?.valueMark1 : null,
                                        e.target.value,
                                        2
                                    );
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllLos1Table?.stepValueTableRecord[2].valueMark2}
                                type="number"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>Итого</td>
                        <td>{myTable[0].valueMark1 + myTable[1].valueMark1 + myTable[2].valueMark1}</td>
                        <td>{myTable[0].valueMark2 + myTable[1].valueMark2 + myTable[2].valueMark2}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default AtAllLos1Table;
