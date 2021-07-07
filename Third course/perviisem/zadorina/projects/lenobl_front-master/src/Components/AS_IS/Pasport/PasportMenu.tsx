import React, { useEffect, useState } from "react";
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
    ToggleButton,
    ButtonGroup
} from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import { useDispatch } from "react-redux";
import { setASISflag } from "../../../Actions/actions";
import {
    getProjectPasport,
    getFileTablePasport,
    getFileTableSIPOC,
    getFileTableMODEL,
    getFileTableEXTRA,
    getFileTableREASON,
    getFileTableAsIsEXPENSES,
    getLosTable,
    getCostTable,
    getTempTable,
    getLosTable2,
    getTempByPartTable,
    getCostByPartTable,
    getFileTableAnalisEXTRA,
    getFileTableToBeOPERATING,
    getFileTableToBeMODEL,
    getFileTableToBeEXTRA,
    getFileTableToBeEXPENSES,
    getFileTableAutomation,
    getFileTableITOGO,
    getLosByPartTable,
    getStepByPartTable,
    getAllProcflaw,
    getAllInfosystem
} from "../../../Actions/rest";

import MenuButton from "../../MenuButton";

function PasportMenu(props) {
    const dispatch = useDispatch();
    const [page, setPage] = useState("");

    useEffect(() => {
        switch (props.sectionFlag) {
            case 3: {
                openPassport();
                break;
            }
            case 4: {
                openProblemSatatement();
                break;
            }
            case 5: {
                openDevelopments();
                break;
            }
            case 6: {
                openRoadMap();
                break;
            }
        }
    }, [props.sectionFlag]);

    return (
        <>
            {props.sectionFlag == "3" && (
                <div>
                    <Row>
                        <Col>
                            <MenuButton
                                tooltipValue="Подготовить паспорт процесса"
                                active={page === "Паспорт"}
                                onClick={() => {
                                    openPassport();
                                }}
                            >
                                Паспорт процесса
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Подготовить верхнеуровневое описание процесса «как есть» по методологии SIPOC"
                                active={page === "SIPOC"}
                                onClick={() => {
                                    setPage("SIPOC");
                                    dispatch(getFileTableSIPOC(props.projId));
                                    dispatch(setASISflag("SIPOC"));
                                }}
                            >
                                Верхнеуровневое описание
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Подготовить описание модели процесса «как есть»"
                                active={page === "Модель"}
                                onClick={() => {
                                    setPage("Модель");
                                    dispatch(getFileTableMODEL(props.projId));
                                    dispatch(setASISflag("Модель"));
                                }}
                            >
                                Карта процесса
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Сформировать пакет дополнительных материалов для описания процесса «как есть»"
                                active={page === "Дополнительно"}
                                onClick={() => {
                                    setPage("Дополнительно");
                                    dispatch(getFileTableEXTRA(props.projId));
                                    dispatch(setASISflag("Дополнительно"));
                                }}
                            >
                                Дополнительные материалы
                            </MenuButton>
                        </Col>
                    </Row>
                </div>
            )}
            {props.sectionFlag == "4" && (
                <div>
                    <Row>
                        <Col>
                            <MenuButton
                                tooltipValue="Формулировка проблемы текущего процесса"
                                active={page === "Формулировка проблемы"}
                                onClick={() => {
                                    openProblemSatatement();
                                }}
                            >
                                Формулировка проблемы
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Выявить узкие места текущего процесса"
                                active={page === "Узкие места"}
                                onClick={() => {
                                    setPage("Узкие места");
                                    // dispatch(getProjectPasport(props.projId));
                                    // dispatch(getFileTablePasport(props.projId));
                                    dispatch(getAllProcflaw(props.projId));
                                    dispatch(setASISflag("Узкие места"));
                                }}
                            >
                                Узкие места
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Определить причинно-следственные связи причин возникновения проблемы"
                                active={page === "Причины/следствия"}
                                onClick={() => {
                                    setPage("Причины/следствия");
                                    dispatch(setASISflag("Причины/следствия"));
                                }}
                            >
                                Причины проблемы и следствия
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Рассчитать трудозатраты и иные расходы на реализацию процесса и определить потери на каждом шаге процесса по методологии SWIIMTOO"
                                active={page === "Затраты/потери"}
                                onClick={() => {
                                    setPage("Затраты/потери");
                                    dispatch(getCostTable(props.projId, 13, 9));
                                    dispatch(getTempTable(props.projId, 13, 9));
                                    dispatch(getLosTable(props.projId, 13, 9));
                                    dispatch(getLosTable2(props.projId, 13, 9));
                                    dispatch(getLosByPartTable(props.projId, 13, 9));
                                    dispatch(getStepByPartTable(props.projId, 13, 9));
                                    dispatch(getFileTableAsIsEXPENSES(props.projId));
                                    dispatch(setASISflag("Затраты/потери"));
                                }}
                            >
                                Расчёт затрат и потерь
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Сформировать пакет дополнительных материалов для анализа процесса «как есть»"
                                active={page === "Дополнительно 2"}
                                onClick={() => {
                                    setPage("Дополнительно 2");
                                    dispatch(getFileTableAnalisEXTRA(props.projId));
                                    dispatch(setASISflag("Дополнительно 2"));
                                }}
                            >
                                Дополнительные материалы
                            </MenuButton>
                        </Col>
                    </Row>
                </div>
            )}
            {props.sectionFlag == "5" && (
                <div>
                    <Row>
                        <Col>
                            <MenuButton
                                tooltipValue="Собрать наработки мер по оптимизации процесса"
                                active={page === "Наработки"}
                                onClick={() => {
                                    openDevelopments();
                                }}
                            >
                                Оптимизационные решения
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Подготовить описание модели процесса «как должно быть»"
                                active={page === "Модель(TO_BE)"}
                                onClick={() => {
                                    setPage("Модель(TO_BE)");
                                    dispatch(getFileTableToBeMODEL(props.projId, 5, 6));
                                    dispatch(setASISflag("Модель(TO_BE)"));
                                }}
                            >
                                Карта процесса
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Рассчитать трудозатраты и иные расходы на реализацию процесса согласно каждому подготовленному варианту модели «как должно быть»"
                                active={page === "Затраты/потери(TO_BE)"}
                                onClick={() => {
                                    setPage("Затраты/потери(TO_BE)");
                                    dispatch(getFileTableToBeEXPENSES(props.projId, 14, 15));
                                    dispatch(getLosTable(props.projId, 14, 13));
                                    dispatch(getLosTable2(props.projId, 14, 13));
                                    dispatch(getCostTable(props.projId, 14, 13));
                                    dispatch(getTempTable(props.projId, 14, 13));
                                    dispatch(getTempByPartTable(props.projId, 14, 13));
                                    dispatch(getCostByPartTable(props.projId, 14, 13));
                                    dispatch(setASISflag("Затраты/потери(TO_BE)"));
                                }}
                            >
                                Расчёт затрат
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Сформировать пакет дополнительных материалов для моделирования процесса «как должно быть»"
                                active={page === "Дополнительно 3"}
                                onClick={() => {
                                    setPage("Дополнительно 3");
                                    dispatch(getFileTableToBeEXTRA(props.projId));
                                    dispatch(setASISflag("Дополнительно 3"));
                                }}
                            >
                                Дополнительные материалы
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Сформировать презентацию об итогах разработки мер по оптимизации"
                                active={page === "Итоги"}
                                onClick={() => {
                                    setPage("Итоги");
                                    dispatch(setASISflag("Итоги"));
                                    dispatch(getFileTableITOGO(props.projId));
                                }}
                            >
                                Презентация
                            </MenuButton>
                        </Col>
                    </Row>
                </div>
            )}
            {props.sectionFlag == "6" && (
                <div>
                    <Row>
                        <Col>
                            <MenuButton
                                tooltipValue="Подготовить дорожную карту мероприятий для внедрения мер по оптимизации"
                                active={page === "ДК"}
                                onClick={() => {
                                    openRoadMap();
                                }}
                            >
                                Дорожная карта
                            </MenuButton>
                        </Col>
                        <Col>
                            <MenuButton
                                tooltipValue="Подготовить требования технического задания к программному продукту, используемому для автоматизации процедур для реализации процесса"
                                active={page === "Автоматизация"}
                                onClick={() => {
                                    setPage("Автоматизация");
                                    dispatch(getFileTableAutomation(props.projId));
                                    dispatch(setASISflag("Автоматизация"));
                                }}
                            >
                                Требования к автоматизации
                            </MenuButton>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );

    function openRoadMap() {
        setPage("ДК");
        dispatch(setASISflag("ДК"));
    }

    function openDevelopments() {
        setPage("Наработки");
        dispatch(getFileTableToBeOPERATING(props.projId));
        dispatch(setASISflag("Наработки"));
    }

    function openProblemSatatement() {
        setPage("Формулировка проблемы");
        // dispatch(getProjectPasport(props.projId));
        // dispatch(getFileTablePasport(props.projId));
        dispatch(getAllProcflaw(props.projId));
        dispatch(setASISflag("Формулировка проблемы"));
    }

    function openPassport() {
        setPage("Паспорт");
        dispatch(getProjectPasport(props.projId));
        dispatch(getFileTablePasport(props.projId));
        dispatch(setASISflag("Паспорт"));
        dispatch(getAllInfosystem());
    }
}

export default PasportMenu;
