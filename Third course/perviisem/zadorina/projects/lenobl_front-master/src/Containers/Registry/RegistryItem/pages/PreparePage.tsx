import React, { useEffect } from "react";
import PrepareCard from "../../../../Components/Prepare/PrepareCard";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { gerAllNPATypes, getAllInitiativeType, getFileTablePrepare, getProject } from "../../../../Actions/rest";

const PreparePage = () => {
    return (
        <div>
            <PrepareCard />
        </div>
    );
};

export default PreparePage;
