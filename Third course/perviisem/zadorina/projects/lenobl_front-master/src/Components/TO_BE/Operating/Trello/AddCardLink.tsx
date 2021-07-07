import React, { FC, memo } from "react";
import { Button } from "react-bootstrap";

export interface ILaneFooterProps {
    onClick: VoidFunction;
}

const AddCardLink: FC<ILaneFooterProps> = (props) => {
    return (
        <div className="py-2 text-center">
            <Button onClick={props.onClick}>Добавить</Button>
        </div>
    );
};

export default memo(AddCardLink);
