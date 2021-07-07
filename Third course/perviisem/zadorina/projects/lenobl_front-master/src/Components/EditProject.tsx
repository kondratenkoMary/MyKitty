import React, { memo, useCallback, useEffect } from "react";
import { Button, Modal, Row, Dropdown, FormControl, Col, Badge, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../Actions/rest";
import { setEditFlag } from "../Actions/actions";
import { StoreType } from "../reducers";
import { Props } from "react-select";

// import { filterExistWorkers, toSelectOptions } from "./Prepare/MainPrepareParams";
import Select from "react-select";
import { IProject, IWorkerItem } from "../reducers/grapthReducer";
import Icon from "../Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { updateProj } from "../Actions/registry";

function EditProject(props) {
    const dispatch = useDispatch();
    const data = useSelector<StoreType, any>(({ grapth }) => ({
        editingFlag: grapth.globalEditingFlag,
        institutionList: grapth.pasportParams?.allInstitution,
        projWorkerList: grapth.openProjectData?.curators,
        projSelectProcess: grapth.openProjectData?.process,
        projInstList: grapth.openProjectData?.institution,
        projNewName: grapth.openProjectData?.project?.name,
        projId: grapth.openProjectData?.project?.id,
        statikAdministrationList: grapth.statikAdministrationList
    }));
    const [instList, setInstList] = React.useState(data.projInstList);
    const [workerList, setWorkerList] = React.useState<IWorkerItem[]>(data.projWorkerList);
    // const [selectProcess, setSelectProcess] = React.useState<IProject>(data.projSelectProcess);
    const [selectProcess, setSelectProcess] = React.useState<Props["OptionType"] | null>(null);
    const [newName, setNewName] = React.useState(data.projNewName);
    const filterExistWorkers = (mainList: SelectItem[], currentList: SelectItem[]) =>
        mainList?.filter((currentWorker) => !currentList?.some((el) => el.label === currentWorker.label));

    // todo перенести в утилиты
    const toSelectOptions = (list: any[]) => {
        return list?.map((item) => ({
            label: item.name,
            value: item
        }));
    };

    const addWorker = (worker: IWorkerItem) => {
        setWorkerList((list) => [...list, worker]);
    };

    const deleteWorker = useCallback((elementIndex: number) => {
        setWorkerList((current) => current.filter((_, index) => elementIndex !== index));
    }, []);

    React.useMemo(() => {
        setSelectProcess(data.projSelectProcess);
    }, [data.projSelectProcess]);

    React.useMemo(() => {
        setInstList(data.projInstList);
    }, [data.projInstList]);

    React.useMemo(() => {
        setWorkerList(data.projWorkerList);
    }, [data.projWorkerList]);

    React.useMemo(() => {
        setNewName(data.projNewName);
    }, [data.projNewName]);
    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-lg"
                show={data.editingFlag}
                onHide={() => {
                    dispatch(setEditFlag(false));
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование данных кейса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col xs={4}>
                                <Form.Label htmlFor="process-name-edit">Процесс</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Select
                                    // defaultValue={{
                                    //     value: data.projSelectProcess,
                                    //     label: data.projSelectProcess?.name
                                    // }}
                                    isDisabled={true}
                                    inputId="process-name-edit"
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
                                <Form.Label htmlFor="owner-name-edit">Владелец</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Select
                                    // defaultValue={data.projInstList}
                                    inputId="owner-name-edit"
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
                                <Form.Label htmlFor="case-name-edit">Наименование кейса</Form.Label>
                            </Col>
                            <Col xs={8}>
                                <Form.Control
                                    defaultValue={data.projNewName}
                                    id="case-name-edit"
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
                                <Form.Label htmlFor="case-name-edit">Администраторы кейса</Form.Label>
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
                                {workerList?.length > 0 && (
                                    <Table className="mt-2">
                                        <tbody>
                                            {workerList.map((worker, index) => (
                                                <tr key={index}>
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
                    {/* <Button
                        variant="outline-danger"
                        onClick={() => {
                            if (confirm("Вы действительно хотите удалить кейс? Отмена операции будет невозможна")) {
                                dispatch(deleteProject(data.projId));
                            }
                        }}
                    >
                        {" "}
                        Удалить кейс{" "}
                    </Button> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            dispatch(setEditFlag(false));
                        }}
                    >
                        Закрыть
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            dispatch(setEditFlag(false));
                            console.log(">>newName", newName);
                            dispatch(
                                updateProj(data.projId, {
                                    name: newName,
                                    process: selectProcess,
                                    curators: workerList,
                                    institutions: instList
                                })
                            );
                        }}
                        disabled={!selectProcess || newName == "" || workerList?.length === 0 || !instList}
                    >
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default memo(EditProject);
