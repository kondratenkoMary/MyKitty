import React, { memo, useCallback, useEffect } from "react";
import { Button, Modal, Row, Dropdown, FormControl, Col, Badge, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalAddingFlag } from "../Actions/actions";
import { StoreType } from "../reducers";
import { filterExistWorkers, toSelectOptions } from "./Prepare/MainPrepareParams";
import Select from "react-select";
import { IProject, IWorkerItem } from "../reducers/grapthReducer";
import Icon from "../Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { saveNewProj } from "../Actions/registry";

function CreatingNewForm(props) {
    const dispatch = useDispatch();
    const data = useSelector<StoreType, any>(({ grapth }) => ({
        addingFlag: grapth.globalAdditingFlag,
        institutionList: grapth.pasportParams?.allInstitution,
        statikAdministrationList: grapth.statikAdministrationList
    }));
    const [instList, setInstList] = React.useState();
    const [workerList, setWorkerList] = React.useState<IWorkerItem[]>([]);
    const [selectProcess, setSelectProcess] = React.useState<IProject>(null);
    const [newName, setNewName] = React.useState("");

    const addWorker = (worker: IWorkerItem) => {
        setWorkerList((list) => [...list, worker]);
    };

    const deleteWorker = useCallback((elementIndex: number) => {
        setWorkerList((current) => current.filter((_, index) => elementIndex !== index));
    }, []);

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-lg"
                show={data.addingFlag}
                onHide={() => {
                    dispatch(setGlobalAddingFlag(false));
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Создание нового кейса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>
                                <Form.Label htmlFor="process-name">Процесс</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Select
                                    inputId="process-name"
                                    placeholder="Выберите процесс"
                                    options={toSelectOptions(props.unusedProcess)}
                                    onChange={(value) => setSelectProcess(value?.value)}
                                    value={{
                                        value: selectProcess,
                                        label: selectProcess?.name
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>
                                <Form.Label htmlFor="owner-name">Владелец</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Select
                                    inputId="owner-name"
                                    placeholder="Выберите владельца"
                                    options={toSelectOptions(data.institutionList)}
                                    onChange={(value) => setInstList(value?.value)}
                                    value={{
                                        value: instList,
                                        label: instList?.name
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>
                                <Form.Label htmlFor="case-name">Наименование кейса</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    id="case-name"
                                    as="textarea"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        setNewName(e.target.value);
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>
                                <Form.Label htmlFor="case-name">Администраторы кейса</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Select
                                    placeholder="Выберите администратора кейса"
                                    value={null}
                                    onChange={(value) => addWorker(value?.value)}
                                    options={filterExistWorkers(
                                        toSelectOptions(data.statikAdministrationList),
                                        toSelectOptions(workerList)
                                    )}
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
                            dispatch(setGlobalAddingFlag(false));
                        }}
                    >
                        Закрыть
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            dispatch(setGlobalAddingFlag(false));
                            dispatch(saveNewProj(selectProcess, newName, workerList, instList));
                        }}
                        disabled={!selectProcess || newName == "" || workerList.length === 0 || !instList}
                    >
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default memo(CreatingNewForm);
