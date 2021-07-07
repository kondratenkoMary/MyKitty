import React, { FC, useEffect, useMemo, useState } from "react";
// todo лучше дописать типы
// @ts-ignore
import Trello from "react-trello";
import CustomLaneHeader from "./CustomLaneHeader";
import NewCardForm from "./NewCardForm";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../../reducers";
import AddCardLink from "./AddCardLink";
import LoaderIndicator from "../../../LoaderIndicator";
import Overlay from "../../../Overlay";
import { createTrelloCard, deleteTrelloCard, loadTrelloData } from "../../../../Actions/trello";
import { TrelloCardItem, TrelloLensItem } from "../../../../reducers/trelloBoard";
import CardEditModal from "./CardEditModal";

export interface ITrelloBoardProps {
    projectId: number;
}

const findCardInLane = (laneId: string, cardId: string, lanes: TrelloLensItem[]): TrelloCardItem => {
    return lanes.find((lane) => lane.id === laneId)?.cards.find((card) => card.id === cardId)!;
};

const TrelloBoard: FC<ITrelloBoardProps> = ({ projectId }) => {
    const dispatch = useDispatch();
    const lanes = useSelector<StoreType, StoreType["trello"]["list"]>(({ trello }) => trello.list);
    const isLoading = useSelector<StoreType, boolean>(({ trello }) => trello.isLoading);
    const [card, setCard] = useState<TrelloCardItem | null>(null);

    useEffect(() => {
        dispatch(loadTrelloData(projectId));
    }, []);

    const onDeleteHandler = (cardId: string, laneId: string) => {
        dispatch(deleteTrelloCard(projectId, cardId));
    };

    let onCardAddHandler = (card: Record<any, any>, laneId: number) => {
        dispatch(
            createTrelloCard(projectId, 11, {
                name: card.description,
                projProbCauseCommand: {
                    id: laneId
                }
            })
        );
    };

    const components = useMemo(
        () => ({
            LaneHeader: CustomLaneHeader,
            NewCardForm: NewCardForm,
            AddCardLink: AddCardLink
        }),
        []
    );

    const onMoveLanes = (laneId: string, toId: string, cardId: string, positionIndex: number) => {
        const cardInfo = findCardInLane(laneId, cardId, lanes);
        if (!cardInfo) {
            return;
        }

        dispatch(deleteTrelloCard(projectId, cardId, false));
        dispatch(
            createTrelloCard(projectId, 11, {
                name: cardInfo.description,
                projProbCauseCommand: {
                    id: +toId
                }
            })
        );
    };

    const onCardClick = (cardId: string, cardMeta: any, laneId: string) => {
        // const cardInfo = findCardInLane(laneId, cardId, lanes);
        // setCard(cardInfo!);
    };

    return (
        <div className="position-relative">
            {false && card && <CardEditModal data={card} onClose={() => setCard(null)} />}
            {isLoading && (
                <Overlay>
                    <LoaderIndicator />
                </Overlay>
            )}
            <Trello
                data={{
                    lanes
                }}
                editable
                components={components}
                onCardDelete={onDeleteHandler}
                onCardAdd={onCardAddHandler}
                onCardMoveAcrossLanes={onMoveLanes}
                onCardClick={onCardClick}
            />
        </div>
    );
};

export default TrelloBoard;
