import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";

function ByPatiLos1Table(props) {
    const [myTable, setMyTable] = React.useState();
    const [tableShow, setTableShow] = React.useState([]);
    const [summ, setSumm] = React.useState([0]);

    React.useMemo(() => {
        console.log("DAWDFWADAWFAWD");
        if (props.stepByPartTable != null && props.stepByPartTable != undefined) {
            helper(props.stepByPartTable);
            let mas = [];
            let sum = [Number(0), Number(0), Number(0)];
            let sum1 = [Number(0), Number(0), Number(0)];
            for (let i = 0; i < props.stepByPartTable?.stepValueTableMainLvl?.length; i++) {
                mas.push(
                    <tr>
                        <td>
                            <b>{props.stepByPartTable?.stepValueTableMainLvl[i].stepValueType.name}</b>
                        </td>
                        <td> {props.stepByPartTable?.stepValueTableMainLvl[i].valueMark1} </td>
                        <td> {props.stepByPartTable?.stepValueTableMainLvl[i].valueMark2} </td>
                    </tr>
                );
                for (let j = 0; j < myTable?.stepValueTableMainLvl[i].subLvl.length; j++) {
                    sum[i] = sum[i] + Number(myTable?.stepValueTableMainLvl[i].subLvl[j].valueMark1SubLvl);
                    sum1[i] = sum1[i] + Number(myTable?.stepValueTableMainLvl[i].subLvl[j].valueMark2SubLvl);
                }
                mas.push(
                    <tr key={i * 4}>
                        <td>Итого</td>
                        <td>{sum[i].toFixed(2)}</td>
                        <td>{sum1[i].toFixed(2)}</td>
                    </tr>
                );
                for (let j = 0; j < props.stepByPartTable?.stepValueTableMainLvl[i].subLvl.length; j++) {
                    mas.push(
                        <tr>
                            <td> {props.stepByPartTable?.stepValueTableMainLvl[i].subLvl[j].institution.name} </td>
                            <td>
                                {" "}
                                <input
                                    defaultValue={
                                        props.stepByPartTable?.stepValueTableMainLvl[i].subLvl[j].valueMark1SubLvl
                                    }
                                    onChange={(e) => {
                                        setTableHelper(e.target.value, "number", i, j);
                                    }}
                                ></input>
                            </td>
                            <td>
                                {" "}
                                <input
                                    defaultValue={
                                        props.stepByPartTable?.stepValueTableMainLvl[i].subLvl[j].valueMark2SubLvl
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
    }, [props.stepByPartTable, myTable, summ]);

    function helper(data) {
        setMyTable(data);
    }

    function setTableHelper(value1, type, ...rowNumb) {
        // console.log(">>value1", value1);
        // console.log(">>type", type);
        // console.log(">>rowNumb", rowNumb);
        if (myTable != undefined && myTable != "aaa") {
            let mas = myTable;
            if (type == "number") {
                mas.stepValueTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark1SubLvl = value1;
            } else {
                mas.stepValueTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark2SubLvl = value1;
            }

            setSumm(
                Number(mas.stepValueTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark1SubLvl) +
                    Number(mas.stepValueTableMainLvl[rowNumb[0]].subLvl[rowNumb[1]].valueMark2SubLvl)
            );

            // console.log(">>>MAS", mas);

            setMyTable(mas);
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    props.saveByPartStepTable(props.projId, myTable, 13, 9);
                }}
            >
                Сохранить
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Тип ценности шагов</th>
                        <th>Число шагов (единицы)</th>
                        <th>Продолжительность шагов (минуты) </th>
                    </tr>
                </thead>
                <tbody>{tableShow}</tbody>
            </Table>
        </>
    );
}

export default ByPatiLos1Table;
