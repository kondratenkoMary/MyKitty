import { Dispatch } from "react";
import { TreeItem } from "../reducers/grapthReducer";
import { processFetch } from "../utils/fetchers";
import notify from "../utils/notify";
import { ActionType, createAsyncAction } from "typesafe-actions";
import { TrelloLensItem } from "../reducers/trelloBoard";

export const trelloAction = createAsyncAction("REQUEST_TRELLO", "SUCCESS_TRELLO", "ERROR_TRELLO")<
    void,
    TrelloLensItem[],
    void
>();

const parseData = (items: TreeItem[]): TrelloLensItem[] => {
    return items.map((item) => ({
        id: item.id.toString(),
        title: item.name,
        label: "",
        cards: item.decisionCommands.map((command) => ({
            id: command.id.toString(),
            label: "", // command.name,
            title: "", // command.name,
            description: command.name
        }))
    }));
};

export const loadTrelloData = (projectId: number) => async (dispatch: Dispatch<any>) => {
    dispatch(trelloAction.request());
    const result: TreeItem[] = await processFetch(`projdecision/${projectId}/getTree/8`);
    dispatch(trelloAction.success(parseData(result)));
};

export interface CreateCardData {
    name: string;
    projProbCauseCommand: {
        id: number;
    };
}

export const createTrelloCard = (projectId: number, taskId: number, data: CreateCardData) => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(trelloAction.request());
        await processFetch(`projdecision/${projectId}/addItem/${taskId}`, {
            method: "POST",
            body: JSON.stringify(data)
        });
        dispatch(loadTrelloData(projectId));
        dispatch(notify.success("Успешно сохранено"));
    } catch (e) {
        dispatch(notify.error("Ошибка удаления"));
        dispatch(trelloAction.failure());
    }
};

export const deleteTrelloCard = (projectId: number, cardId: string, needToUpdate = true) => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(trelloAction.request());
        await processFetch(`projdecision/deleteItem/${cardId}`, {
            method: "DELETE"
        });
        if (needToUpdate) {
            dispatch(loadTrelloData(projectId));
            dispatch(notify.success("Успешно удалено"));
        }
    } catch (e) {
        dispatch(notify.error("Ошибка удаления"));
        dispatch(trelloAction.failure());
    }
};

export type TrelloType = ActionType<typeof trelloAction>;
