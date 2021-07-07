import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import ExpensesMenu from "./ExpensesMenu";
import ExpensesFields from "./ExpensesFields";

function ByPatiLos2Table(props) {
    const [table, setTable] = React.useState();
    const [tableShow, setTableShow] = React.useState([]);
    const [summ, setSumm] = React.useState([0]);

    React.useMemo(() => {
        console.log("WEWE");
        setTable(props.losByPartTable);
    }, [props.losByPartTable]);
    function helper(data) {
        setTable(data);
    }

    React.useEffect(() => {
        console.log("RERENDERING", table);
    });

    React.useMemo(() => {
        if (props.losByPartTable != null && props.losByPartTable != undefined) {
            // helper(props.losByPartTable);
            let mas = [];
            let sum = [Number(0), Number(0), Number(0), Number(0), Number(0), Number(0)];
            let sum1 = [Number(0), Number(0), Number(0), Number(0), Number(0), Number(0)];
            console.log(">>YABLE", table?.lossTypeTableMainLvl[0].subLvl);
            for (let i = 0; i < props.losByPartTable?.lossTypeTableMainLvl?.length; i++) {
                mas.push(
                    <tr>
                        <td>
                            <b>{props.losByPartTable?.lossTypeTableMainLvl[i]?.lossType?.name}</b>
                        </td>
                        <td> {props.losByPartTable?.lossTypeTableMainLvl[i]?.valueMark1} </td>
                        <td> {props.losByPartTable?.lossTypeTableMainLvl[i]?.valueMark2} </td>
                    </tr>
                );
                for (let j = 0; j < table?.lossTypeTableMainLvl[i]?.subLvl.length; j++) {
                    // if (i == 5) {
                    //     sum1[5] = sum1[0] + sum1[1] + sum1[2] + sum1[3] + sum1[4];
                    //     sum[5] = sum[0] + sum[1] + sum[2] + sum[3] + sum[4];
                    // } else {
                    sum[i] = sum[i] + Number(table?.lossTypeTableMainLvl[i].subLvl[j].valueMark1SubLvl);
                    sum1[i] = sum1[i] + Number(table?.lossTypeTableMainLvl[i].subLvl[j].valueMark2SubLvl);
                    // }
                }
                mas.push(
                    <tr key={i * 4}>
                        <td>Итого</td>
                        <td>{sum[i].toFixed(2)}</td>
                        <td>{sum1[i].toFixed(2)}</td>
                    </tr>
                );
                for (let j = 0; j < props.losByPartTable?.lossTypeTableMainLvl[i]?.subLvl?.length; j++) {
                    mas.push(
                        <tr>
                            <td>{props.losByPartTable?.lossTypeTableMainLvl[i]?.subLvl[j]?.institution?.name}</td>
                            <td>
                                <input
                                    defaultValue={
                                        props.losByPartTable?.lossTypeTableMainLvl[i]?.subLvl[j]?.valueMark1SubLvl
                                    }
                                    onChange={(e) => {
                                        setTableHelper(e.target.value, "number", i, j);
                                    }}
                                ></input>
                            </td>
                            <td>
                                <input
                                    defaultValue={
                                        props.losByPartTable?.lossTypeTableMainLvl[i]?.subLvl[j]?.valueMark2SubLvl
                                    }
                                    onChange={(e) => {
                                        setTableHelper(e.target.value, "duration", i, j);
                                    }}
                                ></input>
                            </td>
                        </tr>
                    );
                }
            }
            setTableShow(mas);
        }
    }, [props.losByPartTable, table, summ]);

    function setTableHelper(value1, type, ...rowNumb) {
        if (table != undefined) {
            let mas = table;
            if (type == "number") {
                mas.lossTypeTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark1SubLvl = Number(value1);
            } else {
                mas.lossTypeTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark2SubLvl = Number(value1);
            }

            setSumm(
                Number(mas.lossTypeTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark1SubLvl) +
                    Number(mas.lossTypeTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark1SubLvl)
            );

            console.log(">>>MAS", mas);

            setTable(mas);
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveByPartLosTable(props.projId, table, 13, 9);
                }}
            >
                Сохранить
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Тип потерь</th>
                        <th>Число шагов (единицы)</th>
                        <th>Продолжительность шагов (минуты)</th>
                    </tr>
                </thead>
                <tbody>{tableShow}</tbody>
            </Table>
        </>
    );
}

export default ByPatiLos2Table;
