import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { IFileListPrepareItem, IGeneralFileTable } from "../../reducers/grapthReducer";
import { Button } from "react-bootstrap";
import { deleteFile } from "../../Actions/rest";
import { useRouteMatch } from "react-router";

export interface IFileDownloadButtonProps {
    data: IGeneralFileTable | IFileListPrepareItem;
    infoType: number[];
    task: number;
}
const FileDeleteLoadButton: FC<IFileDownloadButtonProps> = ({ data, infoType, task }) => {
    const dispatch = useDispatch();

    const projectId = useRouteMatch<{ id: string }>().params.id;
    const onClick = () => {
        if (task === 4 && "refProjectFile" in data && data.refProjectFile) {
            dispatch(deleteFile(data.refProjectFile.id, projectId, task, ...infoType));
        } else {
            dispatch(deleteFile(data.id, projectId, task, ...infoType));
        }
    };

    return (
        <Button size="sm" onClick={onClick}>
            Удалить
        </Button>
    );
};

export default memo(FileDeleteLoadButton);
