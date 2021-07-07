import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Row, Dropdown, FormControl, Col, Table, Form } from "react-bootstrap";
import FileComponentEdit from "../FileComponent";
import { useDispatch, useSelector } from "react-redux";
import { saveFile, savePrepareProject } from "../../Actions/rest";
import { StoreType } from "../../reducers";
import { IProcess, IRequestState, IWorkerItem } from "../../reducers/grapthReducer";
import Select, { Props } from "react-select";
import WorkersTable from "./components/WorkersTable";
import LoaderIndicator from "../LoaderIndicator";
import CuratorSpace from "./components/CuratorSpace";
import ProcessTeamSpace from "./components/ProcessTeamSpace";
import SupervisorSpace from "./components/SupervisorSpace";
import FileUploaderSpace from "./components/FileUploaderSpace";
import ExtsraPrepareParams from "./ExtsraPrepareParams";

export interface SelectItem {
    label: string;
    value: any;
}

export const filterExistWorkers = (mainList: SelectItem[], currentList: SelectItem[]) =>
    mainList?.filter((currentWorker) => !currentList?.some((el) => el.label === currentWorker.label));

// todo перенести в утилиты
export const toSelectOptions = (list: any[]) =>
    list?.map((item) => ({
        label: item.name,
        value: item
    }));

export interface IMainPrepareParamsConnect {
    NPATypeList: IRequestState["NPATypeList"];
    processList: IRequestState["processList"];
    workerList: IRequestState["workerList"];
    prepareData: IRequestState["openProjectData"];
}

function MainPrepareParams() {
    const data = useSelector<StoreType, IMainPrepareParamsConnect>(({ grapth }) => ({
        prepareData: grapth.openProjectData,
        NPATypeList: grapth.NPATypeList,
        workerList: grapth.workerList,
        processList: grapth.processList
    }));

    const dispatch = useDispatch();

    // todo по хорошему все эти данные должны быть в своем редьюсере
    const [curatorList, setCuratorList] = useState<IWorkerItem[]>([]);
    const [processList, setProcessList] = useState<IWorkerItem[]>([]);
    const [supervisor, setSupervisor] = useState<IWorkerItem | null>(null);
    //

    const [reengBegin, setReengBegin] = useState("");
    const [reengEnd, setReengEnd] = useState("");

    const [newProjName, setNewProjName] = React.useState<string>("");
    const [selectProcess, setSelectProcess] = useState<Props["OptionType"] | null>(null);

    useEffect(() => {
        if (data.prepareData?.project) {
            setNewProjName(data.prepareData.project.name);
        }
    }, [data.prepareData?.project?.name]);

    const workerOptions = useMemo(() => toSelectOptions(data.workerList), [data.workerList]);
    const processOptions = useMemo(() => toSelectOptions(data.processList), [data.processList]);

    /*
     Инициализация значений компонентов (по идее все это должно быть в редьюсере,
     и компоненты принимать должны значения оттуда
    */
    useEffect(() => {
        if (data.prepareData?.supervisor) {
            setSupervisor(data.prepareData?.supervisor);
        }
        if (data.prepareData?.reengBegin) {
            setReengBegin(data.prepareData?.reengBegin);
        }
        if (data.prepareData?.reengEnd) {
            setReengEnd(data.prepareData?.reengEnd);
        }
        if (data.prepareData?.curators) {
            setCuratorList(data.prepareData?.curators);
        }
        if (data.prepareData?.processTeam) {
            setProcessList(data.prepareData?.processTeam);
        }
        if (data.prepareData?.process) {
            setSelectProcess({
                value: data.prepareData?.process,
                label: data.prepareData?.process?.name
            });
        }
    }, [data.prepareData]);

    const onChangeCurator = useCallback((value: Props["OptionType"]) => {
        setCuratorList((currentValue) => [...currentValue, value.value]);
    }, []);

    const onChangeSupervisor = useCallback((value: Props["OptionType"]) => {
        setSupervisor(value.value);
    }, []);

    const onChangeProcessTeam = useCallback((value: Props["OptionType"]) => {
        setProcessList((currentValue) => [...currentValue, value.value]);
    }, []);

    const onChangeProcess = useCallback((value: Props["OptionType"]) => {
        setSelectProcess(value);
    }, []);

    const onDeleteCurator = (deleteIndex: number) => {
        setCuratorList(curatorList.filter((_, index) => deleteIndex !== index));
    };
    const onDeleteProcess = (deleteIndex: number) => {
        const current = processList.find((_, index) => index === deleteIndex);

        setProcessList(processList.filter((_, index) => deleteIndex !== index));

        if (supervisor?.name === current?.name) {
            setSupervisor(null);
        }
    };

    if (!data.prepareData) {
        return (
            <div>
                <LoaderIndicator />
            </div>
        );
    }

    const onClickSave = () => {
        // todo переделать savePrepareProject в передачу объекта, а не тонны свойств
        dispatch(
            savePrepareProject({
                id: data.prepareData.project.id,
                curators: curatorList,
                process: selectProcess.value as IProcess,
                reengBegin,
                reengEnd,
                processTeam: processList,
                supervisor,
                projectName: newProjName,
                project: data.prepareData.project
            })
        );
    };

    return (
        <div>
            <fieldset disabled>
                <Form.Group>
                    <Form.Label aria-disabled={true} htmlFor="process-select">
                        Процесс
                    </Form.Label>
                    <Select
                        isDisabled={true}
                        inputId="process-select"
                        value={selectProcess}
                        onChange={onChangeProcess}
                        options={processOptions}
                        placeholder="Выбрать процесс"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="naming">Наименование кейса</Form.Label>
                    <FormControl
                        id="naming"
                        as="textarea"
                        style={{ minHeight: 40 }}
                        defaultValue={data.prepareData?.project?.name || ""}
                        onChange={(e) => {
                            setNewProjName(e.target.value);
                        }}
                    />
                </Form.Group>
            </fieldset>
            <CuratorSpace
                onDelete={onDeleteCurator}
                list={curatorList}
                onChange={onChangeCurator}
                options={filterExistWorkers(workerOptions, toSelectOptions(curatorList))}
            />

            <Form.Label htmlFor="datetime-from">Сроки работ по реинжинирингу</Form.Label>
            <Form.Group className="w-50">
                <Row>
                    <Col>
                        <Form.Control
                            id="datetime-from"
                            type="date"
                            value={reengBegin}
                            onChange={(e) => {
                                setReengBegin(e.target.value);
                            }}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            id="datetime-to"
                            type="date"
                            value={reengEnd}
                            onChange={(e) => {
                                setReengEnd(e.target.value);
                            }}
                        />
                    </Col>
                </Row>
            </Form.Group>

            <ProcessTeamSpace
                onDelete={onDeleteProcess}
                list={processList}
                onChange={onChangeProcessTeam}
                options={filterExistWorkers(workerOptions, toSelectOptions(processList))}
            />
            <SupervisorSpace onChange={onChangeSupervisor} value={supervisor} list={processList} />

            <FileUploaderSpace />

            <ExtsraPrepareParams />

            <br />

            <Button onClick={onClickSave}>Сохранить изменения</Button>
        </div>
    );
}

export default MainPrepareParams;
