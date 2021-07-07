import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import recountFunction from "../../../../utils/recountFunction";

function tempByPartTable(props) {
    const [table, setTable] = React.useState();
    const [tableShow, setTableShow] = React.useState([]);
    const [summ, setSumm] = React.useState([0, 0, 0]);

    React.useMemo(() => {
        setTable(props.tempByPartTable);
    }, [props.tempByPartTable]);

    React.useMemo(() => {
        if (props.tempByPartTable != null && props.tempByPartTable != undefined && table != undefined) {
            let mas = [];
            let sum = [Number(0), Number(0), Number(0)];

            mas = props?.tempByPartTable?.costMarksTableMainLevel?.map((element, index) => {
                let summ = 0;
                return (
                    <>
                        <tr key={index}>
                            <td>
                                <b>{element.mark.name}</b>
                            </td>
                            <td>{element.value}</td>
                            <td>{recountFunction(element.value)}</td>
                        </tr>
                        {table?.costMarksTableMainLevel[index]?.subLevelCommand.map((subElement, subIndex) => {
                            summ += Number(subElement.value);

                            return (
                                <tr>
                                    <td>
                                        <Col xs={1} />
                                        <Col xs={11}>{subElement.institution.name}</Col>
                                    </td>
                                    <td>
                                        {index != 2 ? (
                                            <input
                                                onChange={(e) => {
                                                    setTableHelper(subElement.name, e.target.value, index, subIndex);
                                                }}
                                                style={{ width: "100%" }}
                                                defaultValue={subElement.value}
                                                type="number"
                                            ></input>
                                        ) : (
                                            subElement.value
                                        )}
                                    </td>
                                    <td>{recountFunction(subElement.value)}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <Col xs={1} />
                                <Col xs={11}>Итого</Col>
                            </td>
                            <td>{summ}</td>
                            <td>{recountFunction(summ)}</td>
                        </tr>
                    </>
                );
            });
            setTableShow(mas);
            sum[2] = sum[0] + sum[1];
            setSumm(sum);
        }
    }, [props.tempByPartTable, table]);

    function setTableHelper(name, value, ...rowNumb) {
        let mas = [];
        let subMas = [];
        let sum = [];
        for (let j = 0; j < table.costMarksTableMainLevel[0].subLevelCommand.length; j++) {
            sum.push(0);
        }
        for (let i = 0; i < table.costMarksTableMainLevel.length; i++) {
            if (i != rowNumb[0]) {
                if (i == 2) {
                    let subMas2 = [];
                    console.log(">>SUMM", sum);
                    for (let j = 0; j < table.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                        subMas2.push({
                            institution: table.costMarksTableMainLevel[i].subLevelCommand[j].institution,
                            value: sum[j]
                        });
                    }
                    mas.push({
                        mark: table.costMarksTableMainLevel[i].mark,
                        subLevelCommand: subMas2,
                        totalRecord: table.costMarksTableMainLevel[i].totalRecord,
                        value: table.costMarksTableMainLevel[i].totalRecord.value
                    });
                } else {
                    mas.push({
                        mark: table.costMarksTableMainLevel[i].mark,
                        subLevelCommand: table.costMarksTableMainLevel[i].subLevelCommand,
                        totalRecord: table.costMarksTableMainLevel[i].totalRecord,
                        value: table.costMarksTableMainLevel[i].totalRecord.value
                    });
                    for (let j = 0; j < table.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                        sum[j] = Number(sum[j]) + Number(table.costMarksTableMainLevel[i].subLevelCommand[j].value);
                    }
                }
            }
            if (i == rowNumb[0]) {
                for (let j = 0; j < table.costMarksTableMainLevel[i].subLevelCommand.length; j++) {
                    if (j == rowNumb[1]) {
                        subMas.push({
                            institution: table.costMarksTableMainLevel[i].subLevelCommand[j].institution,
                            value: value
                        });
                        sum[j] = Number(sum[j]) + Number(value);
                    } else {
                        subMas.push({
                            institution: table.costMarksTableMainLevel[i].subLevelCommand[j].institution,
                            value: table.costMarksTableMainLevel[i].subLevelCommand[j].value
                        });
                        sum[j] = Number(sum[j]) + Number(table.costMarksTableMainLevel[i].subLevelCommand[j].value);
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
        console.log(mas);
        setTable({ costMarksTableMainLevel: mas });
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveByPartCostTable(
                        props.projId,
                        { type: "temporary", costMarksTableMainLevel: table.costMarksTableMainLevel },
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
                <tbody>{tableShow}</tbody>
            </Table>
        </>
    );
}

export default tempByPartTable;
