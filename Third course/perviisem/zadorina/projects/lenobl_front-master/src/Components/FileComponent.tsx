import React, { FC, memo, useEffect, useState } from "react";
import { useFormState } from "react-use-form-state";
import Select from "react-select";
import { Row, Col, Button, Dropdown, FormControl, Form } from "react-bootstrap";
import { addDocument } from "../Actions/rest";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../reducers";
import { IProject, IRequestState } from "../reducers/grapthReducer";
import { useRouteMatch } from "react-router";
import { Modal } from "react-bootstrap";

// todo убрать это и использовать react-select
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        style={{
            paddingRight: "10px",
            borderBottom: "1px solid black",
            color: "#767676",
            whiteSpace: "normal",
            fontFamily: " Exo 2",
            fontStyle: "italic",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "17px"
        }}
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
            <FormControl
                autoFocus
                className="my-2 w-auto"
                placeholder="Начните печатать для фильтрации"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                style={{ minWidth: "350px", whiteSpace: "normal" }}
            />
            <ul className="list-unstyled" style={{ whiteSpace: "normal" }}>
                {React.Children.toArray(children).filter(
                    (child) => !value || child.props.children[1].toLowerCase().startsWith(value)
                )}
            </ul>
        </div>
    );
});

export interface IFileComponentProps {
    projId: number;
    taskId: number;
}

const FileComponentEdit: FC<IFileComponentProps> = ({ projId, taskId }) => {
    const dispatch = useDispatch();
    const projectId = useRouteMatch<{ id: string }>().params.id;
    const [formState, { text, number }] = useFormState();

    const NPATypeList = useSelector<StoreType, IRequestState["NPATypeList"]>(({ grapth }) => grapth.NPATypeList);

    const [numberNPA, setNumberNPA] = useState(); //*
    const [dateNPA, setDateNPA] = useState();
    const [nameNPA, setNameNPA] = useState(""); //*
    const [formatdateNPA, setFormatdateNPA] = useState(); //*
    const [showModal, setShowModal] = useState<boolean>(false);
    const [NPATypeDropList, setNPATypeDropList] = useState([]);
    const [selectedNPAType, setSelectedNPAType] = useState(); //*
    const [selectedKategory, setSelectedKategory] = useState<IProject>(); //*
    const [docName, setDocName] = useState(""); //*
    const [commentChange, setCommentChange] = useState("");
    const [clarification, setClarification] = useState("");
    const prepareFile = React.useRef(null);

    //TODO - прописать зависимости для мемо

    let dis = React.useMemo(() => {
        console.log("docName", docName);
        console.log("taskId", taskId);
        switch (taskId) {
            case 1: {
                if (
                    nameNPA != undefined &&
                    nameNPA != "" &&
                    numberNPA != undefined &&
                    formatdateNPA != undefined &&
                    selectedNPAType?.id != undefined
                ) {
                    return false;
                }
                return true;
            }
            case 4: {
                if (
                    nameNPA != undefined &&
                    nameNPA != "" &&
                    numberNPA != undefined &&
                    formatdateNPA != undefined &&
                    selectedNPAType?.id != undefined &&
                    clarification != undefined &&
                    clarification != ""
                ) {
                    return false;
                }
                return true;
            }
            case 8: {
                if (
                    docName != undefined &&
                    commentChange != undefined &&
                    docName != "" &&
                    commentChange != "" &&
                    selectedKategory?.id != undefined
                ) {
                    return false;
                }
                return true;
            }
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 16:
            case 17:
            case 18:
            case 19: {
                if (docName != undefined && commentChange != undefined && docName != "" && commentChange != "") {
                    return false;
                }
                return true;
            }
            default:
                return false;
        }
    }, [nameNPA, numberNPA, formatdateNPA, selectedNPAType, clarification, docName, commentChange, taskId]);

    React.useMemo(() => {
        if (NPATypeList) {
            let mas = [];
            for (let i = 0; i < NPATypeList.length; i++) {
                mas.push(
                    <Dropdown.Item
                        key={i}
                        onClick={() => {
                            console.log("NPATYPE", NPATypeList[i]);
                            setSelectedNPAType(NPATypeList[i]);
                        }}
                    >
                        {" "}
                        {NPATypeList[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setNPATypeDropList(mas);
        }
    }, [NPATypeList]);

    function dataForm(data) {
        let mas = [];
        console.log(data);
        mas = data.split("-").reverse().join(".");
        console.log("ПРОВЕРИТЬ", mas);
        setFormatdateNPA(mas);
    }

    return (
        <div style={{ width: "100%" }}>
            <Button variant="secondary" ref={prepareFile} onClick={() => setShowModal(true)}>
                Загрузить файлы
            </Button>

            <Modal backdrop="static" animation show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Загрузка файлов</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form name="uploaderParams" encType="multipart/form-data" method="POST">
                        {[8, 12, 13].includes(taskId) && (
                            <div>
                                <Row>
                                    <Col xs={4}>Категория</Col>
                                    <Col xs={8}>
                                        <Dropdown style={{ width: "100%" }}>
                                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                {selectedKategory?.name && "Выберите категорию"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu style={{ width: "100%" }} as={CustomMenu}>
                                                {taskId == 8 && (
                                                    <>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({
                                                                    name: "Диаграмма Ишикавы",
                                                                    id: 7
                                                                });
                                                            }}
                                                        >
                                                            Диаграмма Ишикавы
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({ name: "5Почему?", id: 8 });
                                                            }}
                                                        >
                                                            5Почему?
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({ name: "MindMap", id: 9 });
                                                            }}
                                                        >
                                                            MindMap
                                                        </Dropdown.Item>
                                                    </>
                                                )}
                                                {taskId === 12 && (
                                                    <>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({ name: "TO BE", id: 5 });
                                                            }}
                                                        >
                                                            TO BE
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({ name: "DREAM", id: 6 });
                                                            }}
                                                        >
                                                            DREAM
                                                        </Dropdown.Item>
                                                    </>
                                                )}
                                                {taskId === 13 && (
                                                    <>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({ name: "TO BE", id: 14 });
                                                            }}
                                                        >
                                                            TO BE
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setSelectedKategory({ name: "DREAM", id: 15 });
                                                            }}
                                                        >
                                                            DREAM
                                                        </Dropdown.Item>
                                                    </>
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <br />
                            </div>
                        )}
                        {[1, 4].includes(taskId) && (
                            <Form.Group>
                                <Form.Label htmlFor="type-npa">Тип НПА</Form.Label>
                                <Select
                                    inputId="type-npa"
                                    placeholder="Выбрать тип НПА"
                                    onChange={(selected) => setSelectedNPAType(selected.value)}
                                    options={NPATypeList?.map((item) => ({
                                        label: item.name,
                                        value: item
                                    }))}
                                />
                            </Form.Group>
                        )}
                        {[5, 18, 6, 16, 8, 7, 17, 9, 12, 14, 10, 11, 13].includes(taskId) && (
                            <Form.Group>
                                <Form.Label htmlFor="naming-doc">Наименование документа</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    onChange={(e) => {
                                        setDocName(e.target.value);
                                    }}
                                    id="naming-doc"
                                />
                            </Form.Group>
                        )}
                        {[5, 18, 6, 16, 8, 7, 17, 9, 12, 14, 10, 11, 13].includes(taskId) && (
                            <Form.Group>
                                <Form.Label htmlFor="comments">Комментарии об изменениях</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    onChange={(e) => {
                                        setCommentChange(e.target.value);
                                    }}
                                    id="comments"
                                />
                            </Form.Group>
                        )}

                        {/* {[5, 18, 6, 16, 7, 17, 9, 14, 10, 11, 13].includes(taskId) && (
                            <Form.Group>
                                <Form.Label>Итоговый</Form.Label>
                            </Form.Group>
                        )} */}

                        {[1, 4].includes(taskId) && (
                            <>
                                <Form.Group>
                                    <Form.Label htmlFor="naming-npa">Наименование НПА</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        onChange={(e) => {
                                            setNameNPA(e.target.value);
                                        }}
                                        id="naming-npa"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="number-npa">Номер НПА</Form.Label>
                                    <Form.Control
                                        onChange={(e) => {
                                            setNumberNPA(e.target.value);
                                        }}
                                        id="number-npa"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="date-npa">Дата НПА</Form.Label>
                                    <Form.Control
                                        onChange={(e) => {
                                            setDateNPA(e.target.value);
                                            dataForm(e.target.value);
                                        }}
                                        id="date-npa"
                                        type="date"
                                    />
                                </Form.Group>
                            </>
                        )}

                        {taskId === 4 && (
                            <Form.Group>
                                <Form.Label htmlFor="helper-text">Уточнение</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setClarification(e.target.value);
                                    }}
                                    as="textarea"
                                    id="helper-text"
                                />
                            </Form.Group>
                        )}

                        <Form.Group>
                            <Form.Label htmlFor="file-npa">Файл</Form.Label>
                            <Form.Control id="file-npa" name="userFile" type="file" />
                        </Form.Group>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Закрыть
                    </Button>
                    {console.log(
                        "falg",
                        taskId,
                        nameNPA,
                        numberNPA,
                        formatdateNPA,
                        // selectedNPAType.id,
                        (taskId == 1 &&
                            nameNPA != undefined &&
                            numberNPA != undefined &&
                            formatdateNPA != undefined &&
                            selectedNPAType?.id != undefined) === true
                    )}
                    <Button
                        disabled={
                            dis
                            // !(
                            //     taskId == 1 &&
                            //     nameNPA != undefined &&
                            //     numberNPA != undefined &&
                            //     formatdateNPA != undefined &&
                            //     selectedNPAType?.id != undefined
                            // ) ||
                            // !(
                            //     taskId == 4 &&
                            //     nameNPA != undefined &&
                            //     numberNPA != undefined &&
                            //     formatdateNPA != undefined &&
                            //     selectedNPAType?.id != undefined &&
                            //     clarification != undefined
                            // ) ||
                            // !(taskId == 6 && docName != undefined && commentChange != undefined) ||
                            // !(taskId == 8 && selectedKategory?.id != undefined) ||
                            // !(
                            //     [5, 18, 17, 16, 8, 7, 9, 12, 14, 10, 11, 13, 19].includes(taskId) &&
                            //     docName != undefined &&
                            //     commentChange != undefined
                            // )
                        }
                        variant="primary"
                        onClick={() => {
                            // {console.log(ref.current.props,'FILEDOCK')}
                            var form = document.forms.namedItem("uploaderParams");
                            var fileData = new FormData(form);
                            var oData = new FormData();
                            if ([5, 18, 17, 16, 8, 7, 9, 12, 14, 10, 11, 13, 19].includes(taskId)) {
                                oData.append("docName", docName);
                                oData.append("commentChange", commentChange);
                                if (taskId == 19) {
                                    oData.append("infoType", 17);
                                    oData.append("task", 19);
                                }
                                if (taskId == 5) {
                                    oData.append("infoType", 3);
                                    oData.append("task", 5);
                                }
                                if (taskId == 7) {
                                    oData.append("infoType", 11);
                                    oData.append("task", 7);
                                }
                                if (taskId == 8) {
                                    console.log(selectedKategory.id, " 8");
                                    oData.append("infoType", selectedKategory.id);
                                    oData.append("task", 8);
                                }
                                if (taskId == 9) {
                                    oData.append("infoType", 13);
                                    oData.append("task", 9);
                                }
                                if (taskId == 12) {
                                    console.log(selectedKategory.id, " 12");
                                    oData.append("infoType", selectedKategory.id);
                                    oData.append("task", 12);
                                }
                                if (taskId == 10) {
                                    oData.append("infoType", 11);
                                    oData.append("task", 10);
                                }
                                if (taskId == 14) {
                                    oData.append("infoType", 11);
                                    oData.append("task", 14);
                                }
                                if (taskId == 11) {
                                    oData.append("infoType", 10);
                                    oData.append("task", 11);
                                }
                                if (taskId == 16) {
                                    oData.append("infoType", 12);
                                    oData.append("task", 16);
                                }
                                if (taskId == 17) {
                                    oData.append("infoType", 11);
                                    oData.append("task", 17);
                                }
                                if (taskId == 13) {
                                    // console.log(selectedKategory.id,' 13')
                                    oData.append("infoType", selectedKategory.id);
                                    oData.append("task", 13);
                                }
                                if (taskId == 18) {
                                    oData.append("infoType", 16);
                                    oData.append("task", 18);
                                }
                            }
                            if (taskId == 6) {
                                oData.append("docName", docName);
                                oData.append("commentChange", commentChange);
                                oData.append("infoType", 4);
                                oData.append("task", 6);
                            }
                            if (taskId == 1 || taskId == 4) {
                                oData.append("nameNPA", nameNPA);
                                oData.append("numberNPA", Number(numberNPA));
                                oData.append("dateNPA", formatdateNPA);
                                oData.append("refNPAType", selectedNPAType.id);
                            }
                            if (taskId == 4) {
                                oData.append("clarification", clarification);
                            }
                            if (taskId == 8) {
                                oData.append("kategory", selectedKategory.id);
                            }
                            oData.append("file", fileData.get("userFile") || "");
                            console.log(fileData.get("userFile"));
                            // console.log(oData.get("file").name,"oData");
                            if (oData.get("file").name != "") {
                                // let docName = district.fileFields.fileName + '.' + oData.get('file').name.split('.')[oData.get('file').name.split('.').length -1];
                                // onSetFileField(docName,'fileName');
                                // oData.set('fileName', docName);
                                dispatch(addDocument(oData, projectId, taskId));
                                // addFile(oData,projId,taskId);
                                // document.getElementById('fileDescription'+fileGroupNum).value = ''
                                // document.getElementById('fileName'+fileGroupNum).value = ''
                                // onSetFileField('','fileDescription')
                                // onSetFileField('','fileName')
                                // onSetFileField(null,'fileType')
                            }
                            setShowModal(false);
                            // props.getFileTable(props.id);
                        }}
                    >
                        Загрузить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default memo(FileComponentEdit);
