import React, { memo } from "react";
import { Button, NavItem, OverlayTrigger, Popover } from "react-bootstrap";

const ContactInfo = () => {
    const popover = (
        <Popover id="popover-info">
            <Popover.Title as="h3">Контактные данные</Popover.Title>
            <Popover.Content>
                Для получения учетной записи или решения проблемы с авторизацией обратитесь в техническую поддержку:
                <br />
                fmsupport@krista.ru
                <br />
                8-800-200-20-73
            </Popover.Content>
        </Popover>
    );

    return (
        <NavItem className="mr-1">
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button variant="light">
                    <i className="fas fa-question-circle" />
                </Button>
            </OverlayTrigger>
        </NavItem>
    );
};

export default memo(ContactInfo);
