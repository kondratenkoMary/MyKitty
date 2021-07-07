import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { CardTypes } from "../../constants/cardTypes";
import { addStageToStage, IProjectStageFact, updateStageDate } from "../../Actions/rest";
import { useDispatch } from "react-redux";
import CardDateModal from "./CardDateModal";
import moment from "moment";

export interface ICardActionProps {
    type: "prepare" | "development" | "introduction" | "postmonitoring";
    fact?: IProjectStageFact;
    projectId: string;
}

const CardAction: FC<ICardActionProps> = ({ fact, type, projectId }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const uType = type.toUpperCase();
    // @ts-ignore
    const stageId: number = CardTypes[uType];
    const onCheckDateHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(addStageToStage(projectId, stageId));
    };

    const showCheck = fact?.factBegin && !fact?.factEnd;
    const showEdit = fact?.factBegin && fact?.factEnd;

    const onEditDatesHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShow(!show);
    };

    const onApplyDateHandler = (values: { endDate: Date; startDate: Date }) => {
        if (!values.startDate || !values.endDate) {
            return;
        }
        dispatch(
            updateStageDate(projectId, stageId, {
                factBegin: moment(values.startDate).format("YYYY-MM-DD"),
                factEnd: moment(values.endDate).format("YYYY-MM-DD")
            })
        );

        setShow(false);
    };

    return (
        <div className="core-card__actions">
            {showCheck && (
                <div title="Завершить этап" onClick={onCheckDateHandler} className="core-card__action-button">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            )}
            {showEdit && (
                <div title="Редактировать этап" onClick={onEditDatesHandler} className="core-card__action-button">
                    <FontAwesomeIcon icon={faEdit} />
                </div>
            )}
            {show && (
                <CardDateModal
                    startDate={fact?.factBegin || ""}
                    endDate={fact?.factEnd || ""}
                    onClose={() => setShow(false)}
                    onApply={onApplyDateHandler}
                />
            )}
        </div>
    );
};

export default CardAction;
