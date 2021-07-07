import React, { FC, memo } from "react";
import { Button, ButtonProps, OverlayTrigger, Tooltip } from "react-bootstrap";

export interface MenuButtonProps extends ButtonProps {
    tooltipValue?: string;
}

const MenuButton: FC<MenuButtonProps> = ({ tooltipValue, children, active, className, ...props }) => {
    const button = (
        <Button
            {...props}
            className={["core-menu-button", active ? "core-menu-button--active" : "", className].join(" ")}
        >
            {children}
        </Button>
    );

    if (!tooltipValue) {
        return button;
    }

    return (
        <OverlayTrigger overlay={<Tooltip id={`tooltip`}>{tooltipValue}</Tooltip>} placement="right">
            {button}
        </OverlayTrigger>
    );
};

export default memo(MenuButton);
