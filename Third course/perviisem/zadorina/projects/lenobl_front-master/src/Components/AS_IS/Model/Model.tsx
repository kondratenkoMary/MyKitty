import React, { FC, memo } from "react";
import ModelField from "./ModelField";

export interface IModelProps {
    projId: number;
}

const Model: FC<IModelProps> = ({ projId }) => (
    <>
        <div>
            <b>Карта процесса</b>
        </div>
        <div> Подготовить описание модели процесса «как есть» </div>
        <br />
        <div>
            <ModelField projId={projId} />
        </div>
    </>
);

export default memo(Model);
