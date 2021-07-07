import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../reducers";
import { IRequestState } from "../../../reducers/grapthReducer";
import FileTableList from "../../FileTableList";

export interface ISIPOCProps {
    projId: number;
}

const SIPOC: FC<ISIPOCProps> = ({ projId }) => {
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.SIPOCfile) || [];

    return (
        <>
            <div>
                <b>Верхнеуровневое описание</b>
            </div>
            <div>Подготовить верхнеуровневое описание процесса «как есть» по методологии SIPOC</div>
            <br />
            <div>
                <FileTableList files={files} projectId={projId} taskId={5} />
            </div>
        </>
    );
};

export default memo(SIPOC);
