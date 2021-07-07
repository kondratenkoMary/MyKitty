import { combineReducers } from "redux";
import getGrapthReducer, { IRequestState } from "./grapthReducer";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import userLogin, { IUserLoginStore } from "./userLogin";
import { reducer as notifications, NotificationsState } from "react-notification-system-redux";
import registryReducer, { IRegistryState } from "./registry";
import trelloReducer, { ITrelloState } from "./trelloBoard";

export interface StoreType {
    grapth: IRequestState;
    trello: ITrelloState;
    user: IUserLoginStore;
    router: RouterState;
    notifications: NotificationsState;
    registry: IRegistryState;
}

export type GetState = () => StoreType;

const rootReducer = (history: History) =>
    combineReducers({
        grapth: getGrapthReducer,
        registry: registryReducer,
        user: userLogin,
        trello: trelloReducer,
        router: connectRouter(history),
        notifications
    });

export default rootReducer;
