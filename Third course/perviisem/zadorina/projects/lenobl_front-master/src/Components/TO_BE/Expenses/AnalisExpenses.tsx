import Iframe from "react-iframe";
import React from "react";
import {
    Popover,
    Overlay,
    Button,
    Row,
    Col,
    Dropdown,
    FormControl,
    Form,
    DropdownButton,
    Tab,
    Tabs
} from "react-bootstrap";
import getServiceUrl from "../../../utils/serviceUrl";

function AnalisExpenses(props) {
    return (
        <>
            <br />
            <Iframe
                url={getServiceUrl(
                    `static-report/web/report-desktop-war-lenOblProcess.html?reportId=2e0fb4e3-cfcb-46ad-8fea-12dc349268a6&version=30.08.2020%2013.57.20.716&device=Desktop&paramProj=${props.projId}`
                )}
                width="100%"
                height="1500px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                frameBorder={0}
                styles={{ border: "0px solid white" }}
            />
        </>
    );
}

export default AnalisExpenses;
