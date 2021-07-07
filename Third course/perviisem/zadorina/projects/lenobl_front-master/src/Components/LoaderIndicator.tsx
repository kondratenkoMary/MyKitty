import React, { memo } from "react";

const LoaderIndicator = () => (
    <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
    </div>
);

export default memo(LoaderIndicator);
