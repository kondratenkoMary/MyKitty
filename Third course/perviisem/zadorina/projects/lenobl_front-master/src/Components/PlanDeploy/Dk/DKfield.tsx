import React, { useState, useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";
import { Button, Table, Modal, FormControl, Row, Col, Dropdown, Badge } from "react-bootstrap";
import { filterExistWorkers, toSelectOptions } from "../../Prepare/MainPrepareParams";
import Select from "react-select";
import WorkersTable from "../../Prepare/components/WorkersTable";
import { IRequestState, IWorkerItem } from "../../../reducers/grapthReducer";
import Icon from "../../../Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

function DKfield(props) {
    // const[DecisionTypesList,setDecisionTypesList] = React.useState([])
    const [selectedEventTypes, setSelectedEventTypes] = React.useState();

    const [selectedDecisionTypes, setSelectedDecisionTypes] = React.useState();

    const [selectedWorers, setSelectedWorers] = React.useState([]);
    const [selectedWorersShow, setSelectedWorersShow] = React.useState([]);
    const [workerList, setWorkerList] = React.useState<IRequestState["workerList"]>([]);

    const [targetRow, setTargetRow] = React.useState();
    const [showCategory, setShowCategory] = React.useState(false);
    const [isRedFlag, setIsRedFlag] = React.useState(false);
    const [isAddFlag, setIsAddFlag] = React.useState(false);
    const [kategory, setKategory] = React.useState(1);
    const [optType, setOptType] = React.useState(1);
    const [name, setName] = React.useState();
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();

    let showTable = React.useMemo(() => {
        if (props.table) {
            let mas = [];
            for (let i = 0; i < props.table.length; i++) {
                let workerMas = [];
                for (let j = 0; j < props.table[i].workerCommandList.length; j++) {
                    let s = props.table[i].workerCommandList[j].name.split(" ");
                    workerMas.push(s[0] + " " + s[1][0] + "." + s[2][0] + ".");
                    workerMas.push("; ");
                }
                workerMas.pop();
                mas.push(
                    <>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{props.table[i].name}</td>
                            <td>{props.table[i].planBegin}</td>
                            <td>{props.table[i].planEnd}</td>
                            <td>{workerMas}</td>
                            <td>
                                {props.table[i].eventTypeCommand != null ? props.table[i].eventTypeCommand.name : ""}
                            </td>
                            <td>
                                {props.table[i].decisionTypeCommand != null
                                    ? props.table[i].decisionTypeCommand.name
                                    : ""}
                            </td>
                            <td>
                                <Row>
                                    <Button
                                        onClick={() => {
                                            props.DeleteDkRow(props.table[i].id, props.projId);
                                        }}
                                    >
                                        -
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            helper(
                                                props.table[i].id,
                                                props.table[i].name,
                                                props.table[i].planBegin,
                                                props.table[i].planEnd,
                                                props.table[i].eventTypeCommand,
                                                props.table[i].decisionTypeCommand,
                                                props.table[i].workerCommandList
                                            );
                                        }}
                                    >
                                        R
                                    </Button>
                                </Row>
                            </td>
                        </tr>
                    </>
                );
            }
            return mas;
        }
    }, [props.table]);

    function helper(id, name, startDay, endDay, EventTypes, DecisionTypes, workerMas) {
        clean();
        setSelectedEventTypes(EventTypes);
        setSelectedDecisionTypes(DecisionTypes);
        setName(name);
        setStartDate(startDay);
        setEndDate(endDay);
        // setSelectedWorers(null)
        setWorkerList(workerMas);
        console.log(workerMas, "VORKERMAS");
        // for (let i = 0; i < workerMas.length; i++) {
        //     // setSelectWorkerHelper(workerMas[i]);
        // }
        setShowCategory(true);
        setIsRedFlag(true);
        setTargetRow(id);
    }

    function clean() {
        setSelectedEventTypes(null);
        setSelectedDecisionTypes(null);
        setWorkerList([]);
        setName("");
        setStartDate("");
        setEndDate("");
        setSelectedWorers(null);
        setSelectedWorersShow(null);
        // setSelectWorkerHelper([]);
        setShowCategory(false);
        setIsRedFlag(false);
        setTargetRow(null);
    }

    const workerOptions = useMemo(() => toSelectOptions(props.workerList), [props.workerList]);

    const deleteWorker = useCallback((elementIndex: number) => {
        setWorkerList((current) => current.filter((_, index) => elementIndex !== index));
    }, []);

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-lg"
                show={showCategory}
                onHide={() => {
                    setShowCategory(false);
                    setIsRedFlag(false);
                    setIsAddFlag(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isAddFlag ? "Создание нового мероприятия" : "Редактирование мероприятия"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>Категория</Col>
                            <Col xs={8}>
                                <Select
                                    placeholder="Выберите категорию..."
                                    value={
                                        (selectedEventTypes && {
                                            value: selectedEventTypes,
                                            label: selectedEventTypes?.name
                                        }) ||
                                        null
                                    }
                                    isClearable
                                    onChange={(value) => setSelectedEventTypes(value?.value || null)}
                                    options={toSelectOptions(props.EventTypes)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>Тип оптимизационного решения</Col>
                            <Col xs={8}>
                                <Select
                                    value={
                                        (selectedDecisionTypes && {
                                            value: selectedDecisionTypes,
                                            label: selectedDecisionTypes?.name
                                        }) ||
                                        null
                                    }
                                    isClearable
                                    placeholder="Выберите тип..."
                                    onChange={(value) => setSelectedDecisionTypes(value?.value || null)}
                                    options={toSelectOptions(props.DecisionTypes)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Наименование мероприятия</Form.Label>
                        <Form.Control
                            placeholder="Укажите наименование мероприятия"
                            defaultValue={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            as="textarea"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Сроки реализации</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    defaultValue={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                    }}
                                    placeholder="введите дату начала"
                                    type="date"
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    defaultValue={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                    }}
                                    placeholder="Введите дату окончания"
                                    type="date"
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>
                                <Form.Label>Исполнители</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Select
                                    value={null}
                                    onChange={(value) => {
                                        setWorkerList((current) => [...current, value?.value]);
                                    }}
                                    options={filterExistWorkers(workerOptions, toSelectOptions(workerList))}
                                    placeholder="Выберите исполнителей мероприятия"
                                />
                                {workerList.length > 0 && (
                                    <Table className="mt-2">
                                        <tbody>
                                            {workerList.map((worker, index) => (
                                                <tr>
                                                    <td className="w-100">{worker.name}</td>
                                                    <td>
                                                        <Button size="sm" onClick={() => deleteWorker(index)}>
                                                            <Icon icon={faTimes} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            clean();
                            setShowCategory(false);
                            setIsRedFlag(false);
                            setIsAddFlag(false);
                        }}
                    >
                        Закрыть
                    </Button>
                    <Button
                        disabled={!name || !endDate || !workerList || workerList?.length == 0}
                        variant="primary"
                        onClick={() => {
                            if (isAddFlag) {
                                props.insertNewDkRow(
                                    props.projId,
                                    {
                                        eventTypeCommand: selectedEventTypes,
                                        decisionTypeCommand: selectedDecisionTypes,
                                        name: name,
                                        planBegin: startDate,
                                        planEnd: endDate,
                                        addLater: null,
                                        workerCommandList: workerList
                                    },
                                    15
                                );
                            } else {
                                if (isRedFlag) {
                                    if (targetRow != undefined) {
                                        props.updateDkRow(
                                            targetRow,
                                            {
                                                eventTypeCommand: selectedEventTypes,
                                                decisionTypeCommand: selectedDecisionTypes,
                                                name: name,
                                                planBegin: startDate,
                                                planEnd: endDate,
                                                addLater: null,
                                                workerCommandList: workerList
                                            },
                                            props.projId
                                        );
                                    }
                                }
                            }
                            setShowCategory(false);
                            setIsRedFlag(false);
                            setIsAddFlag(false);
                            clean();
                        }}
                    >
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table>
                <thead>
                    <td></td>
                    <td>Наименование мероприятия</td>
                    <td>Дата начала реализации</td>
                    <td>Дата окончания реализации</td>
                    <td>Исполнители</td>
                    <td>Категория</td>
                    <td>Тип оптимизационного решения</td>
                    <td></td>
                </thead>
                <tbody>{showTable}</tbody>
            </Table>
            <Button
                onClick={() => {
                    setIsAddFlag(true);
                    setShowCategory(true);
                }}
            >
                +
            </Button>
        </>
    );
}

export default DKfield;
