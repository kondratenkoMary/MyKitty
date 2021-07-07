import React, { FC, useCallback } from "react";
import { Col } from "react-bootstrap";
import Icon from "../../../Icon";
import { getAllInitiativeType, getProject, getProjectStageFact, gerAllNPATypes } from "../../../Actions/rest";
import { setEditFlag } from "../../../Actions/actions";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { dateFormat } from "../../../Components/CardToolbar";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";
import { IProjectItem } from "../../../models/registry";

export interface ICardUnitProps {
    unit: IProjectItem;
}

const stageMap: Record<string, string> = {
    Разработка: "stage-development",
    Внедрение: "stage-introduction",
    Подготовка: "stage-preparation",
    Постмониторинг: "stage-postmonitoring",
    Завершён: "stage-completed",
    "На паузе": "stage-pause"
};

const CardUnit: FC<ICardUnitProps> = ({ unit }) => {
    const dispatch = useDispatch();

    const onCardClickHandler = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(push(`/registry/${unit.id}/prepare`));
        },
        [unit.id]
    );

    const date = unit.stage?.startDate.split("-").reverse().join(".") || "";

    let myStage;

    if (unit.condition != null && unit.condition?.id !== 1) {
        myStage = unit?.condition?.name;
    } else {
        if (unit.stage != null && unit?.stage?.name != null) {
            myStage = unit?.stage?.name;
        } else {
            // TODO Корректно задать stage: unit.condition может быть неопределен!
            // myStage  = unit.condition.name
            myStage = "Неопределен!";
        }
    }

    const onCardEditClickHandler = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(getProjectStageFact(unit.id));
            dispatch(getAllInitiativeType());
            dispatch(gerAllNPATypes());
            dispatch(getProject(String(unit.id)));
            dispatch(setEditFlag(true));
        },
        [unit.id]
    );

    return (
        <Col xs={12} lg={3} md={6} style={{ marginBottom: "10px" }}>
            <div className="core-card" onClick={onCardClickHandler}>
                <div className="core-card-title">
                    <div className="core-card__id">{unit.id}</div>
                    <div className="core-card__clock" />
                    <div className="core-card__date">{" c " + date}</div>
                    <div className={`core-card__stage ${stageMap[myStage]}`}>{myStage}</div>
                    <div className="core-card-edit-button" onClick={onCardEditClickHandler}>
                        <Icon icon={faEdit} />
                    </div>
                </div>
                <div className="core-card-body">{unit.name}</div>
                {!!unit.projPointCommand && (
                    <>
                        <div className="core-card-control-point-date">
                            {dateFormat(unit.projPointCommand?.dateFact)}
                        </div>
                        <div className="core-card-control-point-body">{unit.projPointCommand?.name}</div>
                    </>
                )}
                {/* <div className="core-card-edit">
                    <div className="core-card-edit-button" onClick={onCardEditClickHandler}>
                        <i class="fas fa-edit"></i>
                    </div>
                </div> */}
            </div>
        </Col>
    );
};

export default CardUnit;
