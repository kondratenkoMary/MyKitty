import React, { FC, memo, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Button, Overlay, Table, Col } from "react-bootstrap";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
import { insertProcflaw, updateProcflaw, deleteProcflaw } from "../../../Actions/rest";

export interface IBadPlaysFieldProps {
    projId: number;
}

const BadPlaysField: FC<IBadPlaysFieldProps> = (props) => {
    const dispatch = useDispatch();

    const badplays = React.useRef(null);
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.allProcFlaw);
    const [showBadplays, setShowBadplays] = useState(false);
    const [BadplaysTypes, setBadplaysTypes] = useState("");
    const [procFlawId, setProcFlawId] = useState();
    const [projId, setProjId] = useState(props.projId);
    const [selectedBadPlays, setSelectedBadPlays] = useState<string>();
    const [selectedBadPlaysTable, setSelectedBadPlaysTable] = useState([]);
    const [selectedBadPlaysTableShow, setSelectedBadPlaysTableShow] = useState([]);

    useEffect(() => {
        setProjId(props.projId);
    }, [props.projId]);

    useEffect(() => {
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                selectedBadPlaysTableHelper(files[i].name);
            }
        }
    }, [files]);

    function selectedBadPlaysTableHelper(value) {
        if (value != "") {
            let isAllreadyPick = false;
            let mas = selectedBadPlaysTable;
            let mas1 = selectedBadPlaysTableShow;
            for (let i = 0; i < mas.length; i++) {
                if (mas[i].value == value) {
                    isAllreadyPick = true;
                }
            }
            if (!isAllreadyPick) {
                mas.push({ value: value });
                mas1.push(
                    <tr key={mas.length}>
                        <td>{value}</td>
                    </tr>
                );
                // console.log(mas1)
                setSelectedBadPlaysTable(mas);
                setSelectedBadPlaysTableShow(mas1);
            }
            // console.log(mas1)
        }
    }

    return (
        <>
            <Row>
                <Button
                    variant="outline-primary"
                    style={{ width: "100%" }}
                    ref={badplays}
                    onClick={() => {
                        setShowBadplays(!showBadplays);
                        setBadplaysTypes("Add");
                    }}
                >
                    Укажите имеющиеся узкие места в процессе...
                </Button>
                <Overlay target={badplays.current} show={showBadplays} placement="bottom">
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                        <div
                            {...props}
                            style={{
                                border: "2px solid black",
                                backgroundColor: "white",
                                padding: "2px 10px",
                                borderRadius: 3,
                                width: "65%",
                                ...props.style
                            }}
                        >
                            <Row>
                                <Col xs={4}>Формулировка</Col>
                                <Col xs={8}>
                                    <textarea
                                        defaultValue={selectedBadPlays}
                                        onChange={(e) => {
                                            setSelectedBadPlays(e.target.value);
                                        }}
                                        style={{ width: "100%" }}
                                        placeholder="Укажите формулировку..."
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        onClick={() => {
                                            if (BadplaysTypes === "Add") {
                                                dispatch(insertProcflaw(projId, selectedBadPlays));
                                            } else {
                                                dispatch(updateProcflaw(projId, procFlawId, selectedBadPlays));
                                            }
                                            setShowBadplays(false);
                                        }}
                                    >
                                        {BadplaysTypes === "Add" ? " Добавить" : "Сохранить изменения"}
                                    </Button>{" "}
                                    <Button
                                        onClick={() => {
                                            setShowBadplays(false);
                                            setSelectedBadPlays("");
                                        }}
                                    >
                                        Отменить
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Overlay>
            </Row>
            <Table>
                <tbody>
                    {files?.map((el) => (
                        <tr>
                            <td>{el.name}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        if (confirm("Вы точно хотите удалить элемент?")) {
                                            dispatch(deleteProcflaw(el.id));
                                        }
                                    }}
                                >
                                    Удалить
                                </Button>
                                <Button
                                    onClick={() => {
                                        setBadplaysTypes("edit");
                                        setShowBadplays(true);
                                        setProcFlawId(el.id);
                                        setSelectedBadPlays(el.name);
                                    }}
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default memo(BadPlaysField);
