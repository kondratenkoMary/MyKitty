import React, { FC, memo } from "react";
import { IProblemListItem } from "../../../../reducers/grapthReducer";
import ReasonList from "./ReasonList";
import { Table } from "react-bootstrap";

export interface IReasonTableProps {
    data: IProblemListItem[];
    projectId: number;
    taskId: number;
}

const ReasonTable: FC<IReasonTableProps> = ({ data, taskId, projectId }) => {
    if (!data.length) {
        return <div className="my-4">Отсутствуют данные</div>;
    }

    return (
        <Table className="my-4" striped bordered hover size="sm">
            <tbody>
                <ReasonList data={data} taskId={taskId} projectId={projectId} />
            </tbody>
        </Table>
    );
};

export default memo(ReasonTable);
