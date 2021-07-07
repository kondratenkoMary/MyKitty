import React from "react";
import Iframe from "react-iframe";
import { useSelector } from "react-redux";
import { Row, Button, Card } from "react-bootstrap";

import { StoreType } from "../../reducers";
import { IRequestState } from "../../reducers/grapthReducer";
import ImplementationFields from "./ImplementationFields";
import PageName from "../PageName";
import { useRouteMatch } from "react-router";
import getServiceUrl from "../../utils/serviceUrl";

export interface IMainPrepareParamsConnect {
    table: IRequestState["IimplementationTable"];
}

function Implementation() {
    const data = useSelector<StoreType, IMainPrepareParamsConnect>(({ grapth }) => ({
        table: grapth.IimplementationTable
    }));
    const projectId = useRouteMatch<{ id: string }>().params.id;

    const [page, setPage] = React.useState("Таблица");

    const buttons = ["Таблица", "TimeLine", "Диаграмма Ганта", "Изменить данные"];

    return (
        <div className="p-4">
            <PageName>Внедрение</PageName>
            <div>
                Осуществить мониторинг и сбор сведений о реализации мероприятий дорожной карты
                <br />
                {buttons.map((button) => (
                    <Button
                        variant={page === button ? "primary" : "outline-primary"}
                        key={button}
                        className="mr-2"
                        onClick={() => setPage(button)}
                    >
                        {button}
                    </Button>
                ))}
                {page === "Изменить данные" && (
                    <div className="mt-4">
                        <Row>
                            <ImplementationFields table={data.table} projId={projectId} />
                        </Row>
                    </div>
                )}
                {page === "Таблица" && (
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=c8490a39-b858-45e2-a36f-8c9d90b36269&version=17.09.2020%2016.36.42.681&device=Desktop&paramProj=${projectId}`
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
                )}
                {page === "Диаграмма Ганта" && (
                    <>
                        <Iframe
                            url={getServiceUrl(
                                `static-report/web/report-desktop-war-lenOblProcess.html?reportId=9af3efca-f672-4112-81f1-b81503c1116b&version=19.09.2020%2009.24.42.155&device=Desktop&paramProj=${projectId}`
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
                {page === "TimeLine" ? (
                    <>
                        <br />
                        {
                            <Iframe
                                url={getServiceUrl(
                                    `static-report/web/report-desktop-war-lenOblProcess.html?reportId=aa67efef-46f2-44f7-b933-cf8dcee875d0&version=19.09.2020%2009.25.00.745&device=Desktop&paramProj=${projectId}`
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
                        }
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default Implementation;
