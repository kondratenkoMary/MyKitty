import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../reducers";
import CardUnit from "./CardUnit";

const CardList: FC = () => {
    const list = useSelector<StoreType, StoreType["registry"]["list"]>(({ registry }) => registry.list);

    return (
        <>
            {list.map((unit) => (
                <CardUnit unit={unit} key={unit.id} />
            ))}
        </>
    );
};

export default memo(CardList);
