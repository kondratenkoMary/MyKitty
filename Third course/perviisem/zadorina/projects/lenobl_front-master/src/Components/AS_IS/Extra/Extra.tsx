import React, { FC, memo } from "react";
import ExtraField from "./ExtraField";

const typeMap: Record<number, { subLevel: number; text: string }> = {
    1: {
        subLevel: 4,
        text: "Сформировать пакет дополнительных материалов для описания процесса «как есть»"
    },
    2: {
        subLevel: 3,
        text: "Сформировать пакет дополнительных материалов для анализа процесса «как есть»"
    },
    3: {
        subLevel: 4,
        text: "Сформировать пакет дополнительных материалов для моделирования процесса «как должно быть»"
    },
    4: {
        subLevel: 3,
        text: "Сформировать пакет дополнительных материалов для планирования внедрения мер по оптимизации"
    }
};

export interface IExtraProps {
    type: number;
    projId: number;
}

const Extra: FC<IExtraProps> = ({ projId, type }) => {
    return (
        <>
            <div>
                <b>Дополнительные материалы</b>
            </div>
            <div> {typeMap[type].text}</div>
            <br />
            <div>
                <ExtraField type={type} projId={projId} />
            </div>
        </>
    );
};

export default memo(Extra);
