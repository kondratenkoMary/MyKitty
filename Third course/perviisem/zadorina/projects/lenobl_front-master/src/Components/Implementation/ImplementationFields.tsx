import React, { useState } from "react";
import { Button, Table, Modal, FormControl, Row, Col, Dropdown, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateIMPRow, insertIMPRow, saveFile, mergeProjEventFactVsFile } from "../../Actions/rest";
import FileComponentEdit from "../FileComponent";
import { StoreType } from "../../reducers";
import { IGeneralFileTable, IRequestState } from "../../reducers/grapthReducer";

const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC"
};

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
    const [value, setValue] = React.useState("");
    return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
            <FormControl
                autoFocus
                className="my-2 w-auto"
                placeholder="Начните печатать для фильтрации"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                style={{ minWidth: "320px", width: "100%", margin: "0px", whiteSpace: "normal" }}
            />
            <ul className="list-unstyled" style={{ whiteSpace: "normal" }}>
                {React.Children.toArray(children).filter(
                    (child) => !value || child.props.children[1].toLowerCase().startsWith(value)
                )}
            </ul>
        </div>
    );
});

function ImplementationFields(props) {
    const newFileId = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.ImpFileRowId) || [];

    console.log(props.table);

    const dispatch = useDispatch();

    const [showRedModal, setShowRedModal] = React.useState(false);
    const [factBegin, setFactBegin] = React.useState("");
    const [factEnd, setFactEnd] = React.useState("");
    const [factComment, setFactComment] = React.useState("");
    const [rowNumb, setRowNumb] = React.useState("");

    const [date, setDate] = useState(new Date().toLocaleString("ru", options).split("."));
    const [formDate, setFormDate] = useState(date[2] + "-" + date[1] + "-" + date[0]);

    let showTable = React.useMemo(() => {
        if (props.table != undefined && props.table != null) {
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
                            <td>{props.table[i].eventTypeCommand?.name}</td>
                            <td>{props.table[i].decisionTypeCommand?.name}</td>
                            <td>{props.table[i].projEventFactCommand?.factBegin}</td>
                            <td>{props.table[i].projEventFactCommand?.factEnd}</td>
                            <td>{props.table[i].projEventFactCommand?.factNote}</td>
                            <td>
                                {props.table[i].projEventFactCommand?.projectFileCommand != undefined &&
                                    props.table[i].projEventFactCommand?.projectFileCommand != null && (
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    saveFile(
                                                        props.table[i].projEventFactCommand?.projectFileCommand?.id,
                                                        props.projId,
                                                        props.table[i].projEventFactCommand?.projectFileCommand
                                                            ?.fileName
                                                    )
                                                );
                                            }}
                                        >
                                            Скачать
                                        </Button>
                                    )}
                            </td>
                            <td>
                                <Row>
                                    <Button
                                        onClick={() => {
                                            helper(
                                                i,
                                                props.table[i].id,
                                                props.table[i].factBegin,
                                                props.table[i].factEnd,
                                                props.table[i].factNote
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

    function helper(rowNumbb, id, firstDateFact, lastDadeFact, commentFact) {
        setShowRedModal(true);
        setRowNumb(rowNumbb);
        setFactComment(commentFact);
        setFactEnd(lastDadeFact);
        setFactBegin(firstDateFact);
        console.log(">>COmment", commentFact);
    }

    function onBtnClick() {
        console.log(">>TABLE", props.table[rowNumb]);
        let data = props.table[rowNumb].projEventFactCommand;
        if (data != null) {
            data.factBegin = factBegin;
            data.factEnd = factEnd;
            data.factNote = factComment;
            dispatch(mergeProjEventFactVsFile(props.table[rowNumb]?.projEventFactCommand?.id, newFileId));
            dispatch(updateIMPRow(props.table[rowNumb]?.projEventFactCommand?.id, data, props.projId, newFileId));
        } else {
            data = {
                factBegin: factBegin,
                factEnd: factEnd,
                factNote: factComment,
                projEventCommand: { id: props.table[rowNumb]?.id }
            };
            // dispatch();
            dispatch(insertIMPRow(1, data, props.projId, newFileId));
        }

        console.log(">>UPDATE DATA", data);
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-lg"
                show={showRedModal}
                onHide={() => {
                    setShowRedModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование мероприятия</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col> Дата начала по факту </Col>
                        <Col>
                            {" "}
                            <input
                                type="date"
                                defaultValue={
                                    props.table != null && props.table?.length != 0
                                        ? props.table[rowNumb]?.projEventFactCommand?.factBegin
                                        : ""
                                }
                                max={formDate}
                                onChange={(e) => {
                                    setFactBegin(e.target.value);
                                }}
                                style={{ width: "100%" }}
                            ></input>{" "}
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col> Дата окончания по факту </Col>
                        <Col>
                            {" "}
                            <input
                                defaultValue={
                                    props.table != null && props.table?.length != 0
                                        ? props.table[rowNumb]?.projEventFactCommand?.factEnd
                                        : ""
                                }
                                type="date"
                                max={formDate}
                                onChange={(e) => {
                                    setFactEnd(e.target.value);
                                }}
                                style={{ width: "100%" }}
                            ></input>{" "}
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col> Краткое описание результата </Col>
                        <Col>
                            <textarea
                                placeholder="Укажите краткий результат реализации мероприятия..."
                                defaultValue={
                                    props.table != null ? props.table[rowNumb]?.projEventFactCommand?.factNote : ""
                                }
                                onChange={(e) => {
                                    setFactComment(e.target.value);
                                }}
                                style={{ width: "100%" }}
                            ></textarea>{" "}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FileComponentEdit projId={props.projectId} taskId={19} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            setShowRedModal(false);
                        }}
                    >
                        Отменить
                    </Button>
                    <Button
                        disabled={
                            props.table != null
                                ? (props.table[rowNumb]?.projEventFactCommand?.factNote === "" ||
                                      props.table[rowNumb]?.projEventFactCommand?.factNote == undefined ||
                                      props.table[rowNumb]?.projEventFactCommand?.factNote == null) &&
                                  (factComment === "" || factComment == undefined || factComment == null)
                                : false
                        }
                        onClick={() => {
                            onBtnClick();
                            setShowRedModal(false);
                        }}
                    >
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table>
                <thead>
                    <td></td>
                    <td>Наименование мероприятия</td>
                    <td>План. Дата начала</td>
                    <td>План. Дата окончания</td>
                    <td>Исполнители</td>
                    <td>Категория</td>
                    <td>Тип оптимизационного решения</td>
                    <td>Факт. Дата начала</td>
                    <td>Факт. Дата окончания</td>
                    <td>Краткое описание</td>
                </thead>
                <tbody>{showTable}</tbody>
            </Table>
        </>
    );
}

export default ImplementationFields;
