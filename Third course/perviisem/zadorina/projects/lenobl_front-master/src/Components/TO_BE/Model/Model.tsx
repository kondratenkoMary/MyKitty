import React from "react";
import { Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import ModelMenu from "./ModelMenu";
import ModelField from "./ModelField";

function Model(props) {
    return (
        <>
            <Row>
                {/* <ModelMenu></ModelMenu> */}
                <b>Карта процесса</b>
            </Row>
            <Row> Подготовить описание модели процесса «как должно быть» </Row>
            <br />
            <ModelField
                ToBeModelfile={props.ToBeModelfile}
                projId={props.projId}
                addDocument={props.addDocument}
                saveFile={props.saveFile}
            ></ModelField>
        </>
    );
}

export default Model;
