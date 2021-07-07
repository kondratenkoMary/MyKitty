import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { loginUser, logoutUser, setUserToken, UserLoginActions } from "../Actions/userLoginActions";

export interface IUserType {
    name: string;
    unreadMessages: number;

    email: string | null;
    firstName: string | null;
    lastName: string | null;
    login: string;
    middleName: string | null;
    phone: string | null;
}

export interface IUserLoginStore {
    isLogged: boolean;
    user: IUserType | null;
    token: string;
}

const initialUser: IUserLoginStore = {
    isLogged: false,
    token: "",
    user: null
};

const userLoginReducer = createReducer<IUserLoginStore["isLogged"], UserLoginActions>(initialUser.isLogged)
    .handleAction(loginUser, (_, action) => !!action.payload.login)
    .handleAction(logoutUser, () => false);

const userDataReducer = createReducer<IUserLoginStore["user"], UserLoginActions>(initialUser.user)
    .handleAction(loginUser, (state, action) => action.payload)
    .handleAction(logoutUser, () => null);

const userTokenReducer = createReducer<IUserLoginStore["token"], UserLoginActions>(initialUser.token).handleAction(
    setUserToken,
    (state, action) => action.payload
);

export default combineReducers<IUserLoginStore>({
    isLogged: userLoginReducer,
    token: userTokenReducer,
    user: userDataReducer
});
