import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { IProjectItem } from "../models/registry";
import { caseListAction, RegistryAction } from "../Actions/registry";

export interface IRegistryState {
    isLoading: boolean;
    list: IProjectItem[];
    error: string | null;
}

const initialRegistry: IRegistryState = {
    isLoading: false,
    list: [],
    error: null
};

const loadingReducer = createReducer<IRegistryState["isLoading"], RegistryAction>(initialRegistry.isLoading)
    .handleAction(caseListAction.request, () => true)
    .handleAction([caseListAction.success, caseListAction.failure], () => false);

const listReducer = createReducer<IRegistryState["list"], RegistryAction>(initialRegistry.list)
    .handleAction(caseListAction.success, (state, action) =>
        action.payload.sort((first, second) => first.id - second.id)
    )
    .handleAction(caseListAction.request, (state, action) => []);

const errorReducer = createReducer<IRegistryState["error"], RegistryAction>(initialRegistry.error)
    .handleAction(caseListAction.failure, (state, action) => action.payload)
    .handleAction([caseListAction.request, caseListAction.success], () => null);

export default combineReducers<IRegistryState>({
    isLoading: loadingReducer,
    list: listReducer,
    error: errorReducer
});
