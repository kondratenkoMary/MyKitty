import Iframe from "react-iframe";
import React from "react";
import { Button } from "react-bootstrap";
import getServiceUrl from "../../../utils/serviceUrl";

function AnalisExpenses(props) {
    const [page, setPage] = React.useState("Затраты");

    const pages = ["Затраты", "Ценность", "Потери"];

    return (
        <>
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => {
                        setPage(page);
                    }}
                >
                    {page}
                </Button>
            ))}
            {page === pages[0] && (
                <>
                    <br />
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=132a7f87-1b4d-420d-955e-6cfdf881bb0c&version=24.08.2020%2010.09.12.809&device=Desktop?paramProj=${props.projId}`
                        )}
                        width="100%"
                        height="1030px"
                        id="myId"
                        className="myClassname"
                        position="relative"
                        frameBorder={0}
                        styles={{ border: "0px solid white" }}
                    />
                </>
            )}
            {page === pages[1] && (
                <>
                    <br />
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=ac5fd8e4-6534-4c54-8ada-5c087edb3305&version=26.08.2020%2008.52.39.774&device=Desktop?paramProj=${props.projId}`
                        )}
                        width="100%"
                        height="1500px"
                        id="myId"
                        className="myClassname"
                        position="relative"
                        frameBorder={0}
                        styles={{ border: "0px solid white" }}
                    />
                </>
            )}
            {page === pages[2] && (
                <>
                    <br />
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=efaf5500-c26c-48a3-be6e-5f9dd00180c9&version=26.08.2020%2015.39.17.837&device=Desktop?paramProj=${props.projId}`
                        )}
                        width="100%"
                        height="1500px"
                        id="myId"
                        className="myClassname"
                        position="relative"
                        frameBorder={0}
                        styles={{ border: "0px solid white" }}
                    />
                </>
            )}
        </>
    );
}

export default AnalisExpenses;
