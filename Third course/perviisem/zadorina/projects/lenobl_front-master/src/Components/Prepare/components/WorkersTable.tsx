import React, { FC, memo } from "react";
import { IWorkerItem } from "../../../reducers/grapthReducer";
import { Button, Form, Table } from "react-bootstrap";
import Icon from "../../../Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

export interface IWorkersTableProps {
    label: string;
    data: IWorkerItem[];
    onClickDelete: (index: number) => void;
}

const WorkersTable: FC<IWorkersTableProps> = ({ data, label, onClickDelete }) => (
    <>
        {data.length > 0 && (
            <Form.Group className="mt-3">
                <Form.Label>{label}</Form.Label>
                <Table size="sm" striped bordered style={{ fontSize: 13 }}>
                    <tbody>
                        {data.map((worker, index) => (
                            <tr key={worker.id}>
                                <td style={{ verticalAlign: "middle" }}>
                                    <Button size="sm" variant="primary" onClick={() => onClickDelete(index)}>
                                        <Icon icon={faTimes} />
                                    </Button>
                                </td>
                                <td style={{ verticalAlign: "middle" }} className="w-25">
                                    {worker.name}
                                </td>
                                <td>
                                    <div className="font-weight-bold">Должность:</div>
                                    {worker.post}
                                    <div className="font-weight-bold">Организация:</div>
                                    {worker.orgName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Form.Group>
        )}
    </>
);

export default memo(WorkersTable);
