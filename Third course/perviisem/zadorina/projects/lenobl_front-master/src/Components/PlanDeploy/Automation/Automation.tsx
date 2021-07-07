import React from "react";
import { Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import AutomationMenu from "./AutomationMenu";
import AutomationField from "./AutomationField";

function Automation(props) {
    return (
        <>
            <Row>
                {/* <AutomationMenu></AutomationMenu> */}
                <b>Требования к автоматизации</b>
            </Row>
            <Row>
                {" "}
                Подготовить требования технического задания к программному продукту, используемому для автоматизации
                процедур для реализации процесса
            </Row>
            <br />
            <Row>
                <AutomationField
                    AutomationFile={props.AutomationFile}
                    projId={props.projId}
                    saveFile={props.saveFile}
                    addDocument={props.addDocument}
                ></AutomationField>
            </Row>
        </>
    );
}

export default Automation;
