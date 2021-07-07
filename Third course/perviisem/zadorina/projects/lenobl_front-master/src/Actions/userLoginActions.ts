import { ActionType, createStandardAction } from "typesafe-actions";
import { Dispatch } from "react";
import { push } from "connected-react-router";
import { mainPage } from "../Router";
import { IUserType } from "../reducers/userLogin";
import { authFetch } from "../utils/fetchers";
import notify from "../utils/notify";

export const setUserToken = createStandardAction("SET_USER_TOKEN")<string>();
export const loginUser = createStandardAction("LOGIN_USER")<IUserType>();
export const logoutUser = createStandardAction("LOGOUT_USER")();

const intervals = {
    refresh: -1
};

export const getUserData = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await authFetch<IUserType>("users/getAboutYourself");

        dispatch(loginUser(result));

        window.clearInterval(intervals.refresh);
        intervals.refresh = window.setInterval(() => dispatch(refreshUserToken()), 100000);
    } catch (e) {
        window.clearInterval(intervals.refresh);
    }
};

export interface LoginUserResponse {
    accessToken: string;
    refreshToken: string;
}

const setStorageData = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("base64Tokens", btoa(access + ":" + refresh));
};

export const logIn = (login: string, pass: string, authType: number) => async (dispatch: Dispatch<any>) => {
    try {
        const result = await authFetch<LoginUserResponse>(
            `users/loginUser?login=${login}&pass=${pass}&authType=${authType}`
        );
        const { accessToken, refreshToken } = result;
        setStorageData(accessToken, refreshToken);
        dispatch(setUserToken(accessToken));
        dispatch(getUserData());
        dispatch(push(mainPage));
    } catch (e) {
        window.clearInterval(intervals.refresh);
    }
};

export const logOff = (login: string) => async (dispatch: Dispatch<any>) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("base64Tokens");

    window.clearInterval(intervals.refresh);
    dispatch(logoutUser());
    try {
        await authFetch(`users/logoffUser?login=${login}`);
        dispatch(notify.success("Успешный выход из системы"));
    } catch (e) {
        dispatch(notify.error("Ошибка выхода из системы"));
    }
};

export const refreshUserToken = () => async (dispatch: Dispatch<any>) => {
    try {
        const result = await authFetch<LoginUserResponse>(`tokens/refreshToken`);

        setStorageData(result.accessToken, result.refreshToken);

        dispatch(setUserToken(result.accessToken));
    } catch (e) {
        dispatch(notify.error("Ошибка обновления токена"));
        window.clearInterval(intervals.refresh);
    }
};

export type UserLoginActions = ActionType<typeof loginUser | typeof logoutUser | typeof setUserToken>;
