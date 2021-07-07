import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { IFileListPrepareItem } from "../../../reducers/grapthReducer";
import { Button } from "react-bootstrap";
import { saveFile } from "../../../Actions/rest";
import { useRouteMatch } from "react-router";

export interface IFileDownloadButtonProps {
    data: IFileListPrepareItem;
}

const FileDownloadButton: FC<IFileDownloadButtonProps> = ({ data }) => {
    const dispatch = useDispatch();

    const projectId = useRouteMatch<{ id: string }>().params.id;
    const onClick = () => {
        dispatch(saveFile(data.projectFileCommand.id, projectId, data.projectFileCommand.fileName));
    };

    return (
        <Button size="sm" onClick={onClick}>
            Скачать
        </Button>
    );
};

export default memo(FileDownloadButton);
