import React, { FC } from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Icon: FC<FontAwesomeIconProps> = (props) => {
    return <FontAwesomeIcon {...props} />;
};

export default Icon;
