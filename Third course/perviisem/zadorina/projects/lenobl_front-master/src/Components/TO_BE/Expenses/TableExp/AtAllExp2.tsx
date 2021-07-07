import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import ExpensesMenu from "./ExpensesMenu";
import ExpensesFields from "./ExpensesFields";
import recountFunction from "../../../../utils/recountFunction";

function AtAllExp2Table(props) {
    console.log(props, "PROPS_PROPS_PROPS");

    const [table, setTable] = React.useState(props.AtAllExp2Table.costTableRecord);
    const [tableShow, setTableShow] = React.useState([]);
    const [summ, setSumm] = React.useState(0);
    const [recount, setRecount] = React.useState([]);

    React.useEffect(() => {
        let mas = [];
        mas.push(recountFunction(table[0].value));
        mas.push(recountFunction(table[1].value));
        mas.push(recountFunction(summ));

        setRecount(mas);
    }, [table, summ]);

    React.useMemo(() => {
        if (props.AtAllExp2Table.costTableRecord != null && props.AtAllExp2Table.costTableRecord != undefined) {
            let mas = [];
            let sum = 0;
            for (let i = 0; i < props.AtAllExp2Table.costTableRecord.length; i++) {
                mas.push(
                    <tr>
                        <td>{props.AtAllExp2Table.costTableRecord[i].mark.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(props.AtAllExp2Table.costTableRecord[i], e.target.value, i);
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllExp2Table.costTableRecord[i].value}
                                type="number"
                            ></input>
                        </td>
                        <td>{recount[i]}</td>
                    </tr>
                );
            }
            sum = props.AtAllExp2Table?.costTableRecord[0].value - props.AtAllExp2Table?.costTableRecord[1].value;
            setSumm(sum);
            setTableShow(mas);
        }
    }, [props.AtAllExp2Table]);

    function setTableHelper(row, value, rowNumb) {
        let mas = [];
        let sum = 0;
        for (let i = 0; i < table.length; i++) {
            if (i != rowNumb) {
                mas.push(table[i]);
            }
            if (i == rowNumb) {
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
            }
        }
        if (rowNumb == 1) {
            sum = table[0].value - value;
        } else {
            sum = value - table[1].value;
        }
        setSumm(sum);
        setTable(mas);
    }

    return (
        <>
            Временные
            <br />
            <Button
                onClick={() => {
                    props.saveCostTable(
                        props.projId,
                        { costTableRecord: table, type: props.AtAllExp2Table.type },
                        14,
                        13
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
                        <th>Пересчет</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.AtAllExp2Table.costTableRecord[0].mark.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(props.AtAllExp2Table.costTableRecord[0], e.target.value, 0);
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllExp2Table.costTableRecord[0].value}
                                type="number"
                            ></input>
                        </td>
                        <td>{recount[0]}</td>
                    </tr>
                    <tr>
                        <td>{props.AtAllExp2Table.costTableRecord[1].mark.name}</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setTableHelper(props.AtAllExp2Table.costTableRecord[1], e.target.value, 1);
                                }}
                                style={{ width: "100%" }}
                                defaultValue={props.AtAllExp2Table.costTableRecord[1].value}
                                type="number"
                            ></input>
                        </td>
                        <td>{recount[1]}</td>
                    </tr>
                    <tr>
                        <td>{props.AtAllExp2Table.costTableRecord[2].mark.name}</td>
                        <td>{summ.toFixed(2)}</td>
                        <td>{recount[2]}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default AtAllExp2Table;
