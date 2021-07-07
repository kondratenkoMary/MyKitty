import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import MenuBlockContainer from "./Containers/MenuBlockContainer";
import DashboardPage from "./Containers/DashboardPage";
import ReportsPage from "./Containers/ReportsPage";
import Registry from "./Containers/Registry/Registry";
import Header from "./Containers/HeaderContainer/Header";
import RegistryItem from "./Containers/Registry/RegistryItem";
import SettingsPage from "./Containers/SettingsPage";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { StoreType } from "./reducers";
import LoginPage from "./Containers/LoginPage";
import { refreshUserToken, getUserData } from "./Actions/userLoginActions";
import {
    getAllInstitution,
    getAllDayType,
    getAllDeclarantType,
    getAllTaxType,
    getAllDigitalType,
    getUnusedProcess,
    getProcess,
    getWorker,
    getNameList,
    getAllStages,
    getProcessType
} from "./Actions/rest";
import { hot } from "react-hot-loader";

export const mainPage = "/registry";
export const loginPage = "/login";

const AppRouter = () => {
    const dispatch = useDispatch();
    const user = useSelector<StoreType, StoreType["user"]>(({ user }) => user);

    useEffect(() => {
        const access = localStorage.getItem("accessToken");
        const refresh = localStorage.getItem("refreshToken");

        dispatch(getUserData());
        if (access && refresh) {
            return;
        }

        dispatch(push(loginPage));
    }, []);

    useEffect(() => {
        const access = localStorage.getItem("accessToken");
        const refresh = localStorage.getItem("refreshToken");

        if (!access || !refresh) {
            return;
        }

        if (user.isLogged && access && refresh) {
            const actions: any[] = [
                getProcess,
                getUnusedProcess,
                getWorker,
                getProcessType,
                getNameList,
                getAllStages,
                getAllInstitution,
                getAllDigitalType,
                getUnusedProcess,
                getAllTaxType,
                getAllDayType,
                getAllDeclarantType
            ];

            actions.forEach((action) => {
                dispatch(action());
            });
        }
        if (user.isLogged) {
            dispatch(getUserData());
        }
    }, [user.isLogged]);

    return (
        <>
            <Header />
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route exact path="/registry" component={Registry} />
                <Route path="/registry/:id" component={RegistryItem} />
                <Route path="/reports" component={ReportsPage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/" component={LoginPage} />
            </Switch>
        </>
    );
};

export default hot(module)(AppRouter);
