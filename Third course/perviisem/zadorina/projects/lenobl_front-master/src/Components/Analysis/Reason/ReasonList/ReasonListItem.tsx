import React, { FC, memo, useState } from "react";
import { IProblemListItem } from "../../../../reducers/grapthReducer";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { createProblemItem, deleteProblemItem, updateProblemItem } from "../../../../Actions/rest";
import ChildReasonModal from "../ChildReasonModal";
import RootReasonModal, { ApplyStateArgs } from "../RootReasonModal";

export interface IReasonListItemProps {
    index: number;
    parentIndex?: string;
    data: IProblemListItem;
    projectId: number;
    taskId: number;
}

const ReasonListItem: FC<IReasonListItemProps> = ({ data, projectId, taskId, index, parentIndex }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const onApplyAddChild = (reason: string) => {
        dispatch(createProblemItem(projectId, taskId, { reason }, data.id));
        setAdd(false);
    };

    const onApplyEditChild = (reason: string) => {
        dispatch(updateProblemItem(projectId, taskId, { ...data, name: reason }));
        setAdd(false);
    };

    const onApplyEdit = (values: ApplyStateArgs) => {
        const factor: Record<string, any> = {};
        if (values.factor?.id) {
            factor.factorTypeCommand = {
                id: values.factor?.id
            };
        }
        dispatch(
            updateProblemItem(projectId, taskId, {
                ...data,
                name: values.reason,
                ...factor
            })
        );
        setEdit(false);
    };

    const onClickDeleteHandler = () => {
        dispatch(deleteProblemItem(projectId, taskId, data.id));
    };

    let typeCommand = "";
    if (!parentIndex) {
        typeCommand = data.factorTypeCommand?.name || "Не указана";
    }
    const parentCount = parentIndex?.split(".").length || 0;

    return (
        <>
            {add && <ChildReasonModal parent={data} onClose={() => setAdd(false)} onApply={onApplyAddChild} />}
            {edit && parentCount === 0 && (
                <RootReasonModal
                    initial={{
                        reason: data.name,
                        factor: data.factorTypeCommand?.id
                    }}
                    onClose={() => setEdit(false)}
                    onApply={onApplyEdit}
                />
            )}
            {edit && parentCount > 0 && (
                <ChildReasonModal
                    initial={{
                        reason: data.name
                    }}
                    onClose={() => setEdit(false)}
                    onApply={onApplyEditChild}
                />
            )}
            <tr>
                <td style={{ width: "55%" }}>
                    <span style={{ paddingLeft: parentCount * 20 }} className="mr-3">
                        {(parentIndex && `${parentIndex}.`) || ""}
                        {index + 1}
                    </span>
                    <span>{data.name}</span>
                </td>
                <td style={{ width: "20%" }} className="text-center">
                    {typeCommand}
                </td>
                <td style={{ width: "20%" }} className="text-center">
                    <Button onClick={() => setEdit(true)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() => setAdd(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button onClick={onClickDeleteHandler}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default memo(ReasonListItem);
