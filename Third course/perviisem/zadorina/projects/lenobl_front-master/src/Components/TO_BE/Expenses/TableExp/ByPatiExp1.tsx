import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";

function ByPatiExp1Table(props) {
    const [table, setTable] = React.useState();
    const [tableShow, setTableShow] = React.useState([]);
    const [summ, setSumm] = React.useState([0, 0, 0]);

    React.useMemo(() => {
        setTable(props.costByPartTable);
    }, [props.costByPartTable]);

    React.useMemo(() => {
        // console.log(props.costByPartTable,'USEMEMO PROPS')
        if (props.costByPartTable != null && props.costByPartTable != undefined && table != undefined) {
            let mas = [];
            let sum = [Number(0), Number(0), Number(0)];
            for (let i = 0; i < props.costByPartTable.costMarksTableMainLevel.length; i++) {
                mas.push(
                    <tr key={i * 4}>
                        <td>
                            <b>{props.costByPartTable.costMarksTableMainLevel[i].mark.name}</b>
                        </td>
                        <td>{props.costByPartTable.costMarksTableMainLevel[i].value}</td>
                    </tr>
                );
                for (let j = 0; j < table?.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                    if (i == 2) {
                        sum[2] = sum[0] + sum[1];
                    } else {
                        sum[i] = sum[i] + Number(table?.costMarksTableMainLevel[i].subLevelCommand[j].value);
                    }
                }
                mas.push(
                    <tr key={i * 4}>
                        <td>Итого</td>
                        <td>{sum[i].toFixed(2)}</td>
                    </tr>
                );
                for (let j = 0; j < props.costByPartTable.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                    if (props.costByPartTable.costMarksTableMainLevel[i].mark.name != "Суммарные затраты") {
                        mas.push(
                            <tr key={i * 4 + j + 1}>
                                <td>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {
                                            props.costByPartTable.costMarksTableMainLevel[i].subLevelCommand[j]
                                                .institution.name
                                        }
                                    </Col>
                                </td>
                                <td>
                                    <input
                                        onChange={(e) => {
                                            setTableHelper(
                                                props.costByPartTable.costMarksTableMainLevel[i].subLevelCommand[j]
                                                    .institution.name,
                                                e.target.value,
                                                i,
                                                j
                                            );
                                        }}
                                        style={{ width: "100%" }}
                                        defaultValue={
                                            props.costByPartTable.costMarksTableMainLevel[i].subLevelCommand[j].value
                                        }
                                        type="number"
                                    ></input>
                                </td>
                            </tr>
                        );
                    } else {
                        mas.push(
                            <tr key={i * 4 + j + 1}>
                                <td>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {table?.costMarksTableMainLevel[i].subLevelCommand[j].institution.name}
                                    </Col>
                                </td>
                                <td>
                                    {(
                                        Number(table?.costMarksTableMainLevel[0]?.subLevelCommand[j]?.value) +
                                        Number(table?.costMarksTableMainLevel[1]?.subLevelCommand[j]?.value)
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        );
                    }
                }
            }
            setTableShow(mas);
            sum[2] = sum[0] + sum[1];
            setSumm(sum);
        }
    }, [props.costByPartTable, table]);

    function setTableHelper(name, value, ...rowNumb) {
        if (table != undefined) {
            let mas = [];
            let subMas = [];
            let sum = [0, 0, 0];

            for (let i = 0; i < table.costMarksTableMainLevel.length; i++) {
                if (i != rowNumb[0]) {
                    if (i == 2) {
                        for (let j = 0; j < table.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                            sum[i] = sum[i] + table.costMarksTableMainLevel[i].subLevelCommand[j].value;
                        }
                        mas.push({
                            mark: table.costMarksTableMainLevel[i].mark,
                            subLevelCommand: table.costMarksTableMainLevel[i].subLevelCommand,
                            totalRecord: table.costMarksTableMainLevel[i].totalRecord,
                            value:
                                table.costMarksTableMainLevel[0].totalRecord.value +
                                table.costMarksTableMainLevel[1].totalRecord.value
                        });
                        //TODO - дописать заполнение поля value суммой
                    }
                    mas.push({
                        mark: table.costMarksTableMainLevel[i].mark,
                        subLevelCommand: table.costMarksTableMainLevel[i].subLevelCommand,
                        totalRecord: table.costMarksTableMainLevel[i].totalRecord,
                        value: table.costMarksTableMainLevel[i].totalRecord.value
                    });
                }
                if (i == rowNumb[0]) {
                    for (let j = 0; j < table.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                        if (j == rowNumb[1]) {
                            subMas.push({
                                institution: table.costMarksTableMainLevel[i].subLevelCommand[j].institution,
                                value: value
                            });
                            sum[i] = sum[i] + value;
                        } else {
                            subMas.push({
                                institution: table.costMarksTableMainLevel[i].subLevelCommand[j].institution,
                                value: table.costMarksTableMainLevel[i].subLevelCommand[j].value
                            });
                            sum[i] = sum[i] + table.costMarksTableMainLevel[i].subLevelCommand[j].value;
                        }
                    }
                    mas.push({
                        mark: table.costMarksTableMainLevel[i].mark,
                        subLevelCommand: subMas,
                        totalRecord: table.costMarksTableMainLevel[i].totalRecord,
                        value: table.costMarksTableMainLevel[i].totalRecord.value
                    });
                }
            }
            setTable({ costMarksTableMainLevel: mas });
            setSumm(sum);
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveByPartCostTable(
                        props.projId,
                        { type: "cost", costMarksTableMainLevel: table.costMarksTableMainLevel },
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
                    </tr>
                </thead>
                <tbody>{tableShow}</tbody>
            </Table>
        </>
    );
}

export default ByPatiExp1Table;
