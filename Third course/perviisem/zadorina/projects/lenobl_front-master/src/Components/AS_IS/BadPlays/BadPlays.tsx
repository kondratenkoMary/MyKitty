import React, { FC, memo } from "react";
import BadPlaysField from "./BadPlaysField";

export interface IBadPlaysProps {
    projId: number;
}

const BadPlays: FC<IBadPlaysProps> = (props) => (
    <>
        <div>
            <b>Узкие места</b>
        </div>
        <div> Выявить узкие места текущего процесса </div>
        <br />
        <div>
            <BadPlaysField projId={props.projId} />
        </div>
    </>
);

export default memo(BadPlays);
