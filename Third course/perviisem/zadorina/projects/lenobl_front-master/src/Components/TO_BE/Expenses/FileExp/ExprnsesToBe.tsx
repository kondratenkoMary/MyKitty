import React from "react";
import { Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton } from "react-bootstrap";
import ExpensesToBeField from "./ExpensesToBeField";
import ExpensesToBeMenu from "./ExpensesToBeMenu";

function ExprnsesToBe(props) {
    return (
        <>
            <ExpensesToBeField
                ToBeExpensesfile={props.ToBeExpensesfile}
                projId={props.projId}
                addDocument={props.addDocument}
                saveFile={props.saveFile}
            ></ExpensesToBeField>
        </>
    );
}

export default ExprnsesToBe;
