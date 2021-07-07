import React, { FC, memo } from "react";

interface LaneActionsType {
    addCard: VoidFunction;
    moveCardAcrossLanes: VoidFunction;
    moveLane: VoidFunction;
    paginateLane: VoidFunction;
    removeCard: VoidFunction;
    removeLane: VoidFunction;
    updateCard: VoidFunction;
    updateCards: VoidFunction;
    updateLane: VoidFunction;
    updateLanes: VoidFunction;
}

export interface ICustomLaneHeaderProps {
    title: string;
    actions: LaneActionsType;
    boardId: string;
    canAddLanes: boolean;
    cardDragClass: string;
    cardDraggable: boolean;
    cardStyle: undefined;
    cards: any[];
    currentPage: number;
    draggable: boolean;
    droppable: boolean;
    editable: boolean;

    getCardDetails: (laneId: number, cardIndex: number) => void;
    handleDragEnd: VoidFunction;
    handleDragStart: VoidFunction;
    hideCardDeleteIcon: false;
    id: string;
    index: number;
    label: string;
    labelStyle: Record<string, any>;
    laneDraggable: boolean;
    onDelete: VoidFunction;
    onDoubleClick: VoidFunction;
    style: Record<string, any>;
}

const CustomLaneHeader: FC<ICustomLaneHeaderProps> = (props) => {
    return (
        <div title={props.title} draggable={props.draggable} className="trello-lens">
            {props.title}
        </div>
    );
};

export default memo(CustomLaneHeader);
