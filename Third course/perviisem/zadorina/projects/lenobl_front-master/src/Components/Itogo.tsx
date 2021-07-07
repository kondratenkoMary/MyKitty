import React from "react";
import { Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import ItogoField from "./ItogoField";

function Itogo(props) {
    return (
        <>
            <Row>
                {/* <ModelMenu></ModelMenu> */}
                <b>Презентация</b>
            </Row>
            <Row>
                <span>Сформировать презентацию об итогах разработки мер по оптимизации</span>
            </Row>
            <br />
            <Row>
                <ItogoField
                    ITOGOfile={props.ITOGOfile}
                    MODELfile={props.MODELfile}
                    projId={props.projId}
                    addDocument={props.addDocument}
                    saveFile={props.saveFile}
                ></ItogoField>
            </Row>
        </>
    );
}

export default Itogo;
