import React, { useEffect } from "react";
import CardDev from "../../../../Components/CardDevelopment/CardDev";
import { useDispatch } from "react-redux";
import {
    getAllDecisionType,
    getAllEventType,
    getDkDataByEventType,
    getWorks,
    getWorkPlans,
    getWorkFacts,
    getAllInDevStage
} from "../../../../Actions/rest";
import { useRouteMatch } from "react-router";

const DevelopmentPage = () => {
    const dispatch = useDispatch();
    const projectId = useRouteMatch<{ id: string }>().params.id;

    useEffect(() => {
        dispatch(getWorks(Number(projectId)));
        dispatch(getWorkPlans(Number(projectId)));
        dispatch(getWorkFacts(Number(projectId)));
        dispatch(getAllEventType());
        dispatch(getAllDecisionType());
        dispatch(getDkDataByEventType(null, projectId));
        dispatch(getAllInDevStage());
    }, []);

    return (
        <div>
            <CardDev />
        </div>
    );
};

export default DevelopmentPage;
