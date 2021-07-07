import React, { FC, memo } from "react";
import { IProblemListItem } from "../../../../reducers/grapthReducer";
import ReasonListItem from "./ReasonListItem";

export interface IReasonListProps {
    parentIndex?: string;
    data: IProblemListItem[];
    projectId: number;
    taskId: number;
}

const ReasonList: FC<IReasonListProps> = ({ data, parentIndex, taskId, projectId }) => {
    return (
        <>
            {data.map((row, index) => (
                <React.Fragment key={row.id}>
                    <ReasonListItem
                        taskId={taskId}
                        projectId={projectId}
                        data={row}
                        parentIndex={parentIndex}
                        index={index}
                    />
                    {row.children?.length && (
                        <ReasonList
                            data={row.children}
                            parentIndex={`${(parentIndex && `${parentIndex}.`) || ""}${index + 1}`}
                            taskId={taskId}
                            projectId={projectId}
                        />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default memo(ReasonList);
