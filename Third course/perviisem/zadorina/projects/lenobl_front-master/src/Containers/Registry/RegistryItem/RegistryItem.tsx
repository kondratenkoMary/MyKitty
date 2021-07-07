import React, { useEffect } from "react";
import CardToolbar from "../../../Components/CardToolbar";
import { Route, Switch, useRouteMatch } from "react-router";
import PreparePage from "./pages/PreparePage";
import DevelopmentPage from "./pages/DevelopmentPage";
import IntroductionPage from "./pages/IntroductionPage";
import PostMonitoringPage from "./pages/PostMonitoringPage";
import ReportPage from "./pages/ReportPage";
import { useDispatch, useSelector } from "react-redux";
import {
    gerAllNPATypes,
    getAllInitiativeType,
    getFileTablePrepare,
    getProject,
    getProjectStageFact
} from "../../../Actions/rest";
import { StoreType } from "../../../reducers";

const RegistryItem = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch<{ id: string }>();
    const data = useSelector<StoreType, StoreType["grapth"]>(({ grapth }) => grapth);

    useEffect(() => {
        dispatch(getProject(match.params.id));
        dispatch(getProjectStageFact(match.params.id));
        dispatch(getAllInitiativeType());
        dispatch(gerAllNPATypes());
        dispatch(getFileTablePrepare(match.params.id));
    }, []);

    return (
        <div>
            <div className="p-4">
                <h1>{data.openProjectData?.project?.name}</h1>
                <div>
                    {data?.processType?.find((el) => el.id === data.openProjectData?.process?.refProcessTypeId)?.name}
                </div>
                <div>
                    <span style={{ marginRight: "10px", paddingLeft: "0px" }}>
                        <b>Администраторы</b>:{" "}
                        {data.openProjectData?.curators?.map((curator) => curator.name).join(", ") || "не заданы"}
                    </span>
                    <span className="mr-3" style={{ paddingLeft: "10px", borderLeft: "2px solid black" }}>
                        <b>Руководитель</b>: {data.openProjectData?.supervisor?.name || "не задан"}
                    </span>
                </div>
            </div>

            <CardToolbar projectId={match.params.id} />
            <Switch>
                <Route path="/registry/:id/reports" component={ReportPage} />
                <Route path="/registry/:id/prepare" component={PreparePage} />
                <Route path="/registry/:id/development" component={DevelopmentPage} />
                <Route path="/registry/:id/introduction" component={IntroductionPage} />
                <Route path="/registry/:id/postmonitoring" component={PostMonitoringPage} />
                <Route component={PreparePage} />
            </Switch>
        </div>
    );
};

export default RegistryItem;
