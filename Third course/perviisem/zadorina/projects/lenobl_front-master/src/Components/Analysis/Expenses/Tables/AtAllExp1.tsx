import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import ExpensesMenu from "./ExpensesMenu";
import ExpensesFields from "./ExpensesFields";

function AtAllExp1Table(props) {
    const [table, setTable] = React.useState(props.AtAllExp1Table.costTableRecord);
    const [tableShow, setTableShow] = React.useState([]);
    const [summ, setSumm] = React.useState(0);

    React.useMemo(() => {
        if (props.AtAllExp1Table.costTableRecord != null && props.AtAllExp1Table.costTableRecord != undefined) {
            let mas = [];
            let sum = 0;
            for (let i = 0; i < props.AtAllExp1Table.costTableRecord.length; i++) {
                if (props.AtAllExp1Table.costTableRecord[i].mark.name != "Суммарные затраты") {
                    sum += Number(props.AtAllExp1Table.costTableRecord[i].value);
                }
                // console.log(">>Name", props.AtAllExp1Table.costTableRecord[i].mark.name == "Суммарные затраты");
                if (props.AtAllExp1Table.costTableRecord[i].mark.name == "Суммарные затраты") {
                    mas.push(
                        <tr>
                            <td>{props.AtAllExp1Table.costTableRecord[i].mark.name}</td>
                            <td>{summ.toFixed(2)}</td>
                        </tr>
                    );
                } else {
                    mas.push(
                        <tr>
                            <td>{props.AtAllExp1Table.costTableRecord[i].mark.name}</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setTableHelper(props.AtAllExp1Table.costTableRecord[i], e.target.value, i);
                                    }}
                                    style={{ width: "100%" }}
                                    defaultValue={props.AtAllExp1Table.costTableRecord[i].value}
                                    type="number"
                                ></input>
                            </td>
                        </tr>
                    );
                }
            }
            setSumm(Number(sum));
            setTableShow(mas);
        }
    }, [props.AtAllExp1Table]);

    function setTableHelper(row, value, rowNumb) {
        let mas = [];
        // console.log("row", rowNumb);
        let sum = 0;
        for (let i = 0; i < table.length; i++) {
            if (i != rowNumb) {
                mas.push(table[i]);
                if (table[i].mark.name != "Суммарные затраты") {
                    sum += Number(table[i].value);
                }
            }
            if (i == rowNumb) {
                // console.log(value);
                mas.push({
                    mark: {
                        calculated: row.mark.calculated,
                        id: row.mark.id,
                        name: row.mark.name,
                        orderNumber: row.mark.orderNumber,
                        refMarkFeature: row.mark.refMarkFeature,
                        refMarkType: row.mark.refMarkType,
                        unit: row.mark.unit
                    },
                    value: value
                });
                if (table[i].mark.name != "Суммарные затраты") {
                    sum += Number(value);
                }
            }
        }
        setSumm(Number(sum));
        setTable(mas);
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveCostTable(
                        props.projId,
                        { costTableRecord: table, type: props.AtAllExp1Table.type },
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
                        <th>Показатель</th>
                        <th>Значение (тыс. рублей)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.AtAllExp1Table.costTableRecord[0].mark.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(props.AtAllExp1Table.costTableRecord[0], e.target.value, 0);
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllExp1Table.costTableRecord[0].value}
                                type="number"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>{props.AtAllExp1Table.costTableRecord[1].mark.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(props.AtAllExp1Table.costTableRecord[1], e.target.value, 1);
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllExp1Table.costTableRecord[1].value}
                                type="number"
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>{props.AtAllExp1Table.costTableRecord[2].mark.name}</td>
                        <td>{summ.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default AtAllExp1Table;
