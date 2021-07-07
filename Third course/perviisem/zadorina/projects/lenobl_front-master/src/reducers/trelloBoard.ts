import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { trelloAction, TrelloType } from "../Actions/trello";

export interface TrelloCardItem {
    id: string;
    title: string;
    description: string;
    label: string;
    draggable?: boolean;
}

export interface TrelloLensItem {
    id: string;
    title: string;
    label: string;
    cards: TrelloCardItem[];
}

export interface ITrelloState {
    isLoading: boolean;
    list: TrelloLensItem[];
}

const initialTrello: ITrelloState = {
    isLoading: false,
    list: []
};

const loadingReducer = createReducer<ITrelloState["isLoading"], TrelloType>(initialTrello.isLoading)
    .handleAction(trelloAction.request, () => true)
    .handleAction([trelloAction.success, trelloAction.failure], () => false);

const listReducer = createReducer<ITrelloState["list"], TrelloType>(initialTrello.list)
    .handleAction(trelloAction.success, (state, action) => action.payload)
    .handleAction(trelloAction.request, () => []);

export default combineReducers<ITrelloState>({
    isLoading: loadingReducer,
    list: listReducer
});
