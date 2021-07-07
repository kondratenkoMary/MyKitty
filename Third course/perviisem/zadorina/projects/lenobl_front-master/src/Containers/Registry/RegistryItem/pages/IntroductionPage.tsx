import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";

import { getImplementationDataByEventType } from "../../../../Actions/rest";
import Implementation from "../../../../Components/Implementation/Implementation";

const IntroductionPage = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch<{ id: string }>();

    useEffect(() => {
        dispatch(getImplementationDataByEventType(1, Number(match.params.id)));
    }, []);

    return (
        <div>
            <Implementation projId={match.params.id} />
        </div>
    );
};

export default IntroductionPage;
