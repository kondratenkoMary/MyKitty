import React, { FC } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import recountFunction from "../../../../utils/recountFunction";
import { useDispatch } from "react-redux";
import { saveByPartCostTable, setRecountExpensesTable } from "../../../../actions/rest";
import { MarksTableType } from "../../../../reducers/grapthReducer";

interface tempByPartTableProps {
    tempByPartTable: MarksTableType;
    projId: string;
}

const ByPatiExp2Table: FC<tempByPartTableProps> = (props) => {
    const dispatch = useDispatch();
    console.log(props.tempByPartTable);

    return (
        <>
            <Button
                onClick={() => {
                    dispatch(
                        saveByPartCostTable(
                            props.projId,
                            { type: "temporary", costMarksTableMainLevel: props.tempByPartTable },
                            13,
                            9
                        )
                    );
                }}
            >
                Сохранить
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Показатель</th>
                        <th>Значение (минуты)</th>
                        <th>Пересчет</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tempByPartTable?.map((el, id) => {
                        return (
                            <>
                                <tr key={`main${id}`}>
                                    <td>
                                        <b>{el.mark.name}</b>
                                    </td>
                                    <td>{el.value} </td>
                                    <td>{el.recount}</td>
                                </tr>
                                <tr>
                                    <td>{el.totalRecord.name}</td>
                                    <td>{el.totalRecord.value}</td>
                                    <td>{el.totalRecord.recount}</td>
                                </tr>
                                {el.subLevelCommand?.map((el, subId) => {
                                    return (
                                        <tr key={`sub${subId}`}>
                                            <td>
                                                <Col xs={1} />
                                                <Col>{el.institution.name}</Col>
                                            </td>
                                            <td>
                                                <input
                                                    defaultValue={el.value}
                                                    onChange={(e) => {
                                                        dispatch(
                                                            setRecountExpensesTable(
                                                                { costMarksTableMainLevel: props.tempByPartTable },
                                                                id,
                                                                subId,
                                                                e.target.value
                                                            )
                                                        );
                                                    }}
                                                ></input>
                                            </td>
                                            <td>{el.recount}</td>
                                        </tr>
                                    );
                                })}
                            </>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default ByPatiExp2Table;
