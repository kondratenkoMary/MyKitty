import React, { FC, memo } from "react";
import { Button, Accordion, Card, Row } from "react-bootstrap";
import CardToolbarButton from "./CardToolbarButton";

const Menu: FC = () => {
    return (
        <>
            <Card.Body>
                <Row>
                    <CardToolbarButton xs={3} to="/dashboard" image="loga_dashboard.svg" caption="Дашборд" />
                    <CardToolbarButton xs={3} to="/registry" image="logo_projectregistry.svg" caption="Реестр кейсов" />
                    {/*<CardToolbarButton xs={3} to="/reports" image="logo_logs.svg" caption="Отчеты" />*/}
                    {/*<CardToolbarButton xs={3} to="/settings" image="logo_options.svg" caption="Настройки" />*/}
                </Row>
            </Card.Body>
        </>
    );
};

export default memo(Menu);
