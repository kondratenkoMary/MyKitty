import React, { FC, memo, useState } from "react";
import { Button, Row } from "react-bootstrap";
import CardToolbarButton from "./CardToolbarButton";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../reducers";
import { addStageToStage, IProjectStageFact } from "../Actions/rest";
import { CardTypes } from "../constants/cardTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { processFetch } from "../utils/fetchers";
import CardAction from "./cards/CardAction";

const findStages = (data: IProjectStageFact[] = []): IProjectStageFact[] | [] => {
    const findSortList = ["Подготовка", "Разработка", "Внедрение"];

    return findSortList.map((name) => data?.find((current) => current.refStage.name === name)!);
};

export const dateFormat = (date?: string) => date?.split("-").reverse().join(".");

export interface ICardToolbarProps {
    projectId: string;
}

const CardToolbar: FC<ICardToolbarProps> = ({ projectId }) => {
    const [hide, setHide] = useState<boolean>(false);
    const data = useSelector<StoreType, StoreType["grapth"]["projectFacts"]>(({ grapth }) => grapth.projectFacts);

    const [prepare, develop, introduction] = findStages(data || []);

    const bottomText = (projectFact?: IProjectStageFact) => {
        if (!projectFact) {
            return;
        }

        return (
            <div className="card-toolbar-time text-left d-flex align-items-center">
                <img src="/assets/images/clock-icon.svg" className="mr-2" /> {dateFormat(projectFact?.factBegin)}
                {(projectFact?.factEnd && ` - ${dateFormat(projectFact?.factEnd)}`) || ""}
            </div>
        );
    };

    const renderActions = (
        type: "prepare" | "development" | "introduction" | "postmonitoring",
        fact?: IProjectStageFact
    ) => {
        return <CardAction type={type} fact={fact} projectId={projectId} />;
    };

    return (
        <div className="px-4">
            <Button className="mb-4" onClick={() => setHide(!hide)}>
                {(hide && "Показать меню") || "Скрыть меню"}
            </Button>
            {!hide && (
                <Row>
                    {/*<CardToolbarButton append to="/reports" image="logo_card_logs.png" caption="Отчеты" />*/}
                    <CardToolbarButton
                        bottomText={() => bottomText(prepare)}
                        actions={() => renderActions("prepare", prepare)}
                        append
                        to="/prepare"
                        image="prepare-icon.svg"
                        caption="Подготовка"
                    />
                    <CardToolbarButton
                        bottomText={() => bottomText(develop)}
                        actions={() => renderActions("development", develop)}
                        append
                        to="/development"
                        image="settings-icon.svg"
                        caption="Разработка"
                    />
                    <CardToolbarButton
                        bottomText={() => bottomText(introduction)}
                        actions={() => renderActions("introduction", introduction)}
                        append
                        to="/introduction"
                        image="introduction-icon.svg"
                        caption="Внедрение"
                    />
                    {/* <CardToolbarButton
                        append
                        to="/postmonitoring"
                        image="postmonitoring_logo.svg"
                        caption="Постмониторинг"
                    /> */}
                </Row>
            )}
        </div>
    );
};

export default memo(CardToolbar);
