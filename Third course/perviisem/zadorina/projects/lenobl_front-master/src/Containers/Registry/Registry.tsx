import React, { memo, useEffect } from "react";
import ProjectRegistry from "./ProjectRegistry";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { getAllStages } from "../../Actions/rest";
import { SetProjectRegistryFlag } from "../../Actions/actions";
import Menu from "../../Components/Menu";

const Registry = () => {
    const dispatch = useDispatch();
    const grapth = useSelector<StoreType, StoreType["grapth"]>(({ grapth }) => grapth);

    useEffect(() => {
        dispatch(getAllStages());
        dispatch(SetProjectRegistryFlag());
    }, []);

    return (
        <div>
            <Menu />
            <ProjectRegistry {...grapth} />
        </div>
    );
};

export default memo(Registry);
