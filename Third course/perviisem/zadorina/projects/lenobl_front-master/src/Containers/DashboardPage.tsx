import React, { memo } from "react";
import Iframe from "react-iframe";
import Menu from "../Components/Menu";
import { useRouteMatch } from "react-router";
import getServiceUrl from "../utils/serviceUrl";

const DashboardPage = () => {
    return (
        <div>
            <Menu />
            <div className="p-4">
                <Iframe
                    url={getServiceUrl(
                        "static-report/web/report-desktop-war-lenOblProcess.html?reportId=addb7b18-978f-44c6-9bab-823e1a9ee6ec&version=20.09.2020%2010.43.07.895&device=Desktop"
                    )}
                    width="100%"
                    height="2500px"
                    id="myId"
                    className="myClassname"
                    position="relative"
                    frameBorder={0}
                    styles={{ border: "0px solid white" }}
                />
            </div>
        </div>
    );
};

export default memo(DashboardPage);
