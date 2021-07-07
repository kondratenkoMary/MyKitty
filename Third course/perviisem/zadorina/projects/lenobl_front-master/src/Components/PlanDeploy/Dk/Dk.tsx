import React from "react";
import Iframe from "react-iframe";
import { Row, Button } from "react-bootstrap";
import DKfield from "./DKfield";
import getServiceUrl from "../../../utils/serviceUrl";

function Dk(props) {
    const [page, setPage] = React.useState("Таблица");

    return (
        <>
            <div>
                <b>Дорожная карта</b>
            </div>
            <div>Подготовить дорожную карту мероприятий для внедрения мер по оптимизации</div>
            <br />
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Таблица");
                }}
            >
                Таблица{" "}
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Диаграмма");
                }}
            >
                Диаграмма Ганта{" "}
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("TimeLine");
                }}
            >
                TimeLine{" "}
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Изменить данные");
                }}
            >
                Изменить данные{" "}
            </Button>
            {page === "Изменить данные" && (
                <>
                    <br />
                    <br />

                    <Row>
                        <DKfield
                            workerList={props.workerList}
                            DecisionTypes={props.DecisionTypes}
                            EventTypes={props.EventTypes}
                            DeleteDkRow={props.DeleteDkRow}
                            updateDkRow={props.updateDkRow}
                            projId={props.projId}
                            insertNewDkRow={props.insertNewDkRow}
                            table={props.DkData}
                        />
                    </Row>
                </>
            )}
            {page === "Таблица" && (
                <>
                    <br />
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=2da1a2ac-f4f0-4c23-9fa4-6f2d63544ecd&version=12.09.2020%2013.26.31.824&device=Desktop&paramProj=${props.projId}`
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
            )}
            {page === "Диаграмма" && (
                <>
                    <br />
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=50fc1e6c-ee7b-4299-917e-d99215381ab2&version=12.09.2020%2016.25.17.206&device=Desktop&paramProj=${props.projId}`
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
            )}
            {page === "TimeLine" && (
                <>
                    <br />
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=b41c3124-7320-4568-af3e-de7a8fdf59a1&version=12.09.2020%2016.25.41.569&device=Desktop&paramProj=${props.projId}`
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
            )}
        </>
    );
}

export default Dk;
