import React, { FC, useEffect, useState } from "react";
import { Button, Accordion, Card, Row, Col } from "react-bootstrap";
import FilterProjReg from "../../Components/FilterProjReg";
import CreatingNewForm from "../../Components/CreatingNewForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllInitiativeType, getProject } from "../../Actions/rest";
import { setGlobalAddingFlag, setOpenProjectFlag } from "../../Actions/actions";
import CreateNewProject from "./Cards/CreateNewProject";
import CardList from "./Cards/CardList";
import PageName from "../../Components/PageName";
import { IRequestState } from "../../reducers/grapthReducer";
import LoaderIndicator from "../../Components/LoaderIndicator";
import CardUnit from "./Cards/CardUnit";
import EditProject from "../../Components/EditProject";
import { StoreType } from "../../reducers";
import Overlay from "../../Components/Overlay";
import { loadProjectList } from "../../Actions/registry";

// todo сделать нормальные типы
export interface IProjectRegistryProps {
    unusedProcess: any;
    nameList: any;
    processType: any;
    getProjList: any;
    regFilter: IRequestState["regFilter"];
    stages: IRequestState["stages"];
    workerList: IRequestState["workerList"];
    processList: IRequestState["processList"];
    projList: IRequestState["projList"];
    globalAddingFlag: any;
    globaleditingFlag: any;
}

const ProjectRegistry: FC<IProjectRegistryProps> = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector<StoreType, boolean>(({ registry }) => registry.isLoading);

    useEffect(() => {
        dispatch(loadProjectList());
    }, []);

    return (
        <>
            <CreatingNewForm
                unusedProcess={props.unusedProcess}
                workerList={props.workerList}
                processList={props.processList}
                addingFlag={props.globalAddingFlag}
            />
            <EditProject
                unusedProcess={props.unusedProcess}
                workerList={props.workerList}
                processList={props.processList}
                editingFlag={props.globaleditingFlag}
            />
            <div className="px-4">
                <PageName>Реестр кейсов</PageName>
            </div>

            <div className="p-4">
                <FilterProjReg />
            </div>

            <div className="px-4 position-relative">
                <Row className="mt-4">
                    <>
                        <CreateNewProject />
                        {(isLoading && (
                            <Col xs={12} lg={3} md={6}>
                                <LoaderIndicator />
                            </Col>
                        )) || <CardList />}
                    </>
                </Row>
            </div>
        </>
    );
};

export default ProjectRegistry;
