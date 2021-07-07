import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, FC, memo } from "react";
import { Container, Modal, Button, Row, Col, ButtonGroup, Card, ButtonToolbar, Form } from "react-bootstrap";
import Icon from "../../Icon";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";
import GanttChart from "./GanttChart";

import ControlPoints from "./ContolPoints";
import { deleteControlPoint, getControlPoints, saveControlPoint, saveWorkPlan, saveWorkFact } from "../../Actions/rest";
import {
    setControlPointsShow,
    setOutofRangeControlPoint,
    setPasportFlag,
    setRestState,
    setSectionsFlag,
    setGantFlag,
    setSectionsFlagName
} from "../../Actions/actions";
import { REST_STATE } from "../../constants/restStates";
import { StoreType } from "../../reducers";
import { IRequestState } from "../../reducers/grapthReducer";
import { DevEditMode } from "../../constants/devEditMode";

export interface IDevConnected {
    controlPoints: IRequestState["controlPoints"];
    controlPointsVisible: IRequestState["showControlPoints"];
    outOfRangeControlPoint: IRequestState["outOfRangeControlPoint"];
    restState: IRequestState["restState"];
    openProjectData: IRequestState["openProjectData"];
    reengEndDate: Date;
    reengBeginDate: Date;
    gantFlag: boolean;
}

export interface IDevProps {
    chartData: any[];
}

const Dev: FC<IDevProps> = (props) => {
    const dispatch = useDispatch();
    const data = useSelector<StoreType, IDevConnected>(({ grapth }) => ({
        controlPoints: grapth.controlPoints,
        controlPointsVisible: grapth.showControlPoints,
        outOfRangeControlPoint: grapth.outOfRangeControlPoint,
        restState: grapth.restState,
        openProjectData: grapth.openProjectData,
        allInDevStage: grapth.allInDevStage,
        gantFlag: grapth.gantFlag,
        reengBeginDate: new Date(grapth.openProjectData.reengBegin),
        reengEndDate: new Date(grapth.openProjectData.reengEnd),
        showStagePasport: grapth.pasportFlag,
        activeStage: grapth.sectionFlag
    }));
    // Для этапов
    const [showInterval, setShowInterval] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [workName, setWork] = useState(null);
    const [planId, setPlanId] = useState(null);
    const [factId, setFactId] = useState(null);
    const [workId, setWorkId] = useState(null);
    const [minDate, setMinDate] = useState(data.reengBeginDate);
    const [maxDate, setMaxDate] = useState(data.reengEndDate);
    const [showLegend, setShowLegend] = useState(false);
    const [legendBtnText, setLegendBtnText] = useState("Показать легенду");

    // Для контрольных точек
    const [cpWorkName, setCPWork] = useState(null);
    const [cpWorkId, setCPWorkId] = useState(null);
    const [cpMinDate, setCPMinDate] = useState(data.reengBeginDate);
    const [cpMaxDate, setCPMaxDate] = useState(data.reengEndDate);

    const [cpId, setCPId] = useState(null);
    const [cpName, setCPName] = useState("");
    const [planDate, setPlanDate] = useState(null);
    const [factDate, setFactDate] = useState(null);
    const [showCPDialog, setShowCPDialog] = useState(false);

    const [editMode, setEditDatesMode] = useState(DevEditMode.PASSPORT);
    const [showPasport, setShowPasport] = useState(false);

    const [sectionsHidden, setSectionsHidden] = useState(true);
    const [radioValue, setRadioValue] = useState<number>(1);

    const showPasportCard = (w, wId) => {
        if (wId != -1) {
            dispatch(setSectionsFlagName(w));
            dispatch(setSectionsFlag(wId));
            let newWorkSelected = wId != workId;
            setWork(w);
            setWorkId(wId);
            let newShowPasportValue = newWorkSelected || !showPasport;
            setShowPasport(newShowPasportValue);
            dispatch(setPasportFlag(newShowPasportValue));
        }
    };

    const showIntervalDialog = (start, end, w, wId, pId) => {
        if (wId > 0) {
            setStartDate(start);
            setEndDate(end);
            setWork(w);
            setWorkId(wId);
            editMode == DevEditMode.PLANS ? setPlanId(pId) : setFactId(pId);
            setShowInterval(true);
        }
    };

    const showControlPointsCard = (w, wId, min, max) => {
        let newWorkSelected = wId != cpWorkId;
        setCPWork(w);
        setCPWorkId(wId);
        setCPMinDate(min);
        setCPMaxDate(max);
        if (!min || !max) {
            alert("Для работы с контрольными точками установите сроки для данного вида работ");
            dispatch(setControlPointsShow(false));
        } else {
            dispatch(getControlPoints(wId, newWorkSelected || !data.controlPointsVisible));
        }
    };

    const showAddCPDialog = () => {
        setCPId(null);
        setCPName("");
        setPlanDate(null);
        setFactDate(null);
        setShowCPDialog(true);
    };

    const showChangeCPDialog = (cpId, cpName, planDate, factDate) => {
        setCPId(cpId);
        setCPName(cpName);
        setPlanDate(planDate);
        setFactDate(factDate);
        setShowCPDialog(true);
    };

    const handleSaveAndClose = () => {
        if (editMode == DevEditMode.PLANS) {
            if (startDate && endDate) {
                dispatch(saveWorkPlan(planId, workId, startDate, endDate));
                if (planId == null) {
                    setShowInterval(false);
                }
            } else {
                alert("Укажите даты начала и окончания этапа");
            }
        } else if (editMode == DevEditMode.FACTS) {
            if (startDate) {
                dispatch(saveWorkFact(factId, workId, startDate, endDate));
                setShowInterval(false);
            } else {
                alert("Укажите фактическую дату начала этапа");
            }
        }
    };

    const handleClose = () => {
        setShowInterval(false);
    };

    const handleCPSaveAndClose = () => {
        if (!cpName) {
            alert("Укажите название контрольной точки");
        } else if (planDate || factDate) {
            dispatch(saveControlPoint(cpId, cpWorkId, cpName, planDate, factDate));
            setShowCPDialog(false);
        } else {
            alert("Укажите плановую или фактическую дату");
        }
    };

    const handleCPDeleteAndClose = () => {
        if (!cpId) {
            alert("Данные не сохранены, поэтому не могут быть удалены");
        } else {
            if (confirm("Вы действительно хотите удалить контрольную точку?")) {
                dispatch(deleteControlPoint(cpId, cpWorkId));
                setShowCPDialog(false);
            }
        }
    };

    const handleCPClose = () => {
        setShowCPDialog(false);
    };

    // для этапов
    let today = new Date();
    let todayAvaiable = minDate <= today && today <= maxDate;

    let openStartDate = startDate ? startDate : todayAvaiable ? today : minDate;
    let openEndDate = endDate ? endDate : todayAvaiable ? today : maxDate;

    // для контрольных точек
    let todayForCPAvaiable = cpMinDate <= today && today <= cpMaxDate;
    let openPlanDate = planDate ? planDate : todayForCPAvaiable ? today : cpMinDate;
    let openFactDate = factDate ? factDate : todayForCPAvaiable ? today : cpMaxDate;

    useEffect(() => {
        switch (data.restState) {
            case REST_STATE.NO: {
                break;
            }
            case REST_STATE.ERROR: {
                // Сообщение об ошибке
                data.outOfRangeControlPoint
                    ? alert(
                          `Данные не сохранены. Даты контрольной точки (${data.outOfRangeControlPoint.name}) вне указанного диапазона.`
                      )
                    : alert("Данные не сохранены. Некоторые контрольные точки вне указанного диапазона.");
                // сброс статуса ответа от rest-сервиса
                dispatch(setRestState(REST_STATE.NO));
                break;
            }
            case REST_STATE.OK: {
                setShowInterval(false);
                // Обновить каротчку с КТ, если  она по тому же виду работ, что и изменяемая запись
                if (workId == cpWorkId) {
                    setCPMinDate(startDate);
                    setCPMaxDate(endDate);
                }
                // Сброс информации о том, какая КТ вне указанного в модальном окне по работе диапазона
                dispatch(setOutofRangeControlPoint(REST_STATE.NO));
                // сброс статуса ответа от rest-сервиса
                dispatch(setRestState(REST_STATE.NO));
                break;
            }
        }
    }, [data.restState]);

    return (
        <>
            <Row className="ml-1">
                <ButtonToolbar className="mr-2">
                    <Button
                        onClick={() => {
                            dispatch(setGantFlag());
                        }}
                    >
                        {/* ⇅ */}
                        {data.gantFlag ? "Скрыть диаграмму" : "Показать диаграмму"}
                    </Button>
                </ButtonToolbar>
                <ButtonGroup>
                    {!sectionsHidden && (
                        <Button
                            variant="outline-success"
                            onClick={(e) => {
                                setRadioValue(1);
                                setSectionsHidden(true);
                                setEditDatesMode(DevEditMode.PASSPORT);
                                dispatch(setPasportFlag(true));
                            }}
                        >
                            Вернуться к навигации по разделам
                        </Button>
                    )}
                    {data.gantFlag && (
                        <Button
                            variant={radioValue === 2 ? "primary" : "secondary"}
                            onClick={(e) => {
                                setRadioValue(2);
                                setSectionsHidden(false);
                                dispatch(setPasportFlag(false));
                                setEditDatesMode(DevEditMode.PLANS);
                            }}
                        >
                            Редактировать строки
                        </Button>
                    )}
                    {data.gantFlag && (
                        <Button
                            variant={radioValue === 3 ? "primary" : "secondary"}
                            onClick={(e) => {
                                setRadioValue(3);
                                setSectionsHidden(false);
                                dispatch(setPasportFlag(false));
                                setEditDatesMode(DevEditMode.FACTS);
                            }}
                        >
                            Редактировать факты
                        </Button>
                    )}
                </ButtonGroup>

                <div className="ml-auto">
                    <Button
                        variant="light"
                        onClick={() => {
                            setShowLegend(!showLegend);
                            setLegendBtnText(showLegend ? "Показать легенду" : "Скрыть легенду");
                        }}
                    >
                        <Icon icon={faQuestionCircle} className="mr-2" />
                        {legendBtnText}
                    </Button>
                </div>
            </Row>

            {props.chartData && data.reengEndDate && data.reengBeginDate && (
                <div className={data.gantFlag ? "" : "d-none"}>
                    <GanttChart
                        data={props.chartData}
                        maxDate={data.reengEndDate}
                        minDate={data.reengBeginDate}
                        onWorkClick={editMode == DevEditMode.PASSPORT ? showPasportCard : showIntervalDialog}
                        showControlPointsDialog={showControlPointsCard}
                        editMode={editMode}
                        showLegend={showLegend}
                        activeStage={data.showStagePasport ? data.activeStage : null}
                    />
                </div>
            )}
            <div>
                {data.controlPointsVisible && (
                    <Card>
                        <Card.Header>{cpWorkName} - Контрольные точки</Card.Header>
                        <Card.Body>
                            <ControlPoints
                                data={[]}
                                workName={cpWorkName}
                                workId={cpWorkId}
                                controlPoints={data.controlPoints}
                                maxDate={cpMaxDate}
                                minDate={cpMinDate}
                                showAddCPDialog={showAddCPDialog}
                                showChangeCPDialog={showChangeCPDialog}
                            />
                        </Card.Body>
                    </Card>
                )}
            </div>
            <div>
                <Modal show={showInterval} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {workName} {editMode == DevEditMode.FACTS ? " (фактические значения)" : ""}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <DatePicker
                                    minDate={editMode == DevEditMode.PLANS ? data.reengBeginDate : null}
                                    maxDate={editMode == DevEditMode.PLANS ? data.reengEndDate : new Date()}
                                    dateFormat="dd.MM.yyyy"
                                    locale={ru}
                                    placeholderText="Дата начала этапа"
                                    todayButton={todayAvaiable ? "Сегодня" : null}
                                    onChange={(date) => {
                                        setStartDate(date);
                                    }}
                                    className="form-control"
                                    selected={startDate}
                                    isClearable
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    openToDate={openStartDate}
                                />
                            </Row>
                            <Row>
                                <br />
                            </Row>
                            <Row>
                                <DatePicker
                                    minDate={editMode == DevEditMode.PLANS ? data.reengBeginDate : null}
                                    maxDate={editMode == DevEditMode.PLANS ? data.reengEndDate : new Date()}
                                    dateFormat="dd.MM.yyyy"
                                    locale={ru}
                                    className="form-control"
                                    placeholderText="Дата окончания этапа"
                                    todayButton={todayAvaiable ? "Сегодня" : null}
                                    onChange={(date) => {
                                        setEndDate(date);
                                    }}
                                    selected={endDate}
                                    isClearable
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    openToDate={openEndDate}
                                />
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleSaveAndClose}>
                            Сохранить
                        </Button>
                        <Button variant="light" onClick={handleClose}>
                            Отменить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Row>
                <Modal show={showCPDialog} onHide={handleCPClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Контрольная точка</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Наименование"
                                    value={cpName}
                                    onChange={(e) => {
                                        setCPName(e.target.value);
                                    }}
                                    style={{ width: "100%" }}
                                />
                            </Row>
                            <Row>
                                <DatePicker
                                    minDate={cpMinDate}
                                    maxDate={cpMaxDate}
                                    dateFormat="dd.MM.yyyy"
                                    locale={ru}
                                    className="form-control"
                                    placeholderText="Плановая дата"
                                    todayButton={todayForCPAvaiable ? "Сегодня" : null}
                                    onChange={(date) => {
                                        setPlanDate(date);
                                    }}
                                    selected={planDate}
                                    isClearable
                                    openToDate={openPlanDate}
                                />
                            </Row>
                            <Row>
                                <br />
                            </Row>
                            <Row>
                                <DatePicker
                                    minDate={data.openProjectData.reengBegin}
                                    maxDate={data.openProjectData.reengeEnd}
                                    dateFormat="dd.MM.yyyy"
                                    locale={ru}
                                    className="form-control"
                                    placeholderText="Фактическая дата"
                                    todayButton={todayForCPAvaiable ? "Сегодня" : null}
                                    onChange={(date) => {
                                        setFactDate(date);
                                    }}
                                    selected={factDate}
                                    isClearable
                                    openToDate={openFactDate}
                                />
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleCPSaveAndClose}>
                            Сохранить
                        </Button>
                        <Button variant="light" disabled={cpId < 1} onClick={handleCPDeleteAndClose}>
                            Удалить
                        </Button>
                        <Button variant="light" onClick={handleCPClose}>
                            Отменить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </>
    );
};

export default memo(Dev);
