import React, { FC, memo, useState, useEffect, useMemo } from "react";
import { Table, Button, FormControl, Dropdown, Row } from "react-bootstrap";
import FileComponentEdit from "../../../FileComponent";
import { getFileTableToBeEXPENSES } from "../../../../Actions/rest";
import FileDeleteButton from "../../../GeneralFileTable/FileDeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../../Actions/rest";
import { IRequestState } from "../../../../reducers/grapthReducer";
import { StoreType } from "../../../../reducers";
import PDFViewer from "pdf-viewer-reactjs";

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

function ExpensesToBeField(props) {
    const [selectedKategory, setSelectedKategory] = React.useState();
    const [selectedinfotype, setSelectedInfotype] = React.useState([14, 15]);
    const [fileTable, setFileTable] = React.useState();
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.TOBEExpensesFile);
    const [currentFile, setFile] = useState<number | null>(
        files?.length >= 1 && files[0].fileName.includes(".pdf") ? 0 : null
    );
    useMemo(() => {
        if (currentFile === null && files?.length >= 1 && files[0].fileName.includes(".pdf")) {
            // setFile(0);
            setTimeout(() => {
                setFile(0);
            }, 100);
        }
    }, [files]);

    const onClickRow = (index: number) => {
        setFile(null);
        if (!files[index].fileName.includes(".pdf")) {
            return;
        }

        // Хак для перерисовки компонента
        setTimeout(() => {
            setFile(index);
        }, 100);
    };

    React.useMemo(() => {
        if (props.ToBeExpensesfile != undefined) {
            let mas = [];
            for (let i = 0; i < props.ToBeExpensesfile.length; i++) {
                mas.push(
                    <tr>
                        <td> {props.ToBeExpensesfile[i].docName} </td>
                        <td onClick={() => onClickRow(i)} style={{ cursor: "pointer" }}>
                            {" "}
                            {props.ToBeExpensesfile[i].fileName}{" "}
                        </td>
                        <td>
                            <Button
                                size="sm"
                                onClick={() => {
                                    props.saveFile(
                                        props.ToBeExpensesfile[i].id,
                                        props.projId,
                                        props.ToBeExpensesfile[i].fileName
                                    );
                                }}
                            >
                                Скачать
                            </Button>
                            <FileDeleteButton
                                data={props.ToBeExpensesfile[i]}
                                infoType={selectedinfotype}
                                task={13}
                            ></FileDeleteButton>
                        </td>
                    </tr>
                );
            }
            setFileTable(mas);
        }
    }, [props.ToBeExpensesfile]);

    const dispatch = useDispatch();

    return (
        <>
            <Row>
                <Dropdown style={{ whiteSpace: "normal" }}>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {selectedKategory != undefined ? selectedKategory.name : "Все категории"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedKategory({ name: "Все категории", id: -1 });
                                setSelectedInfotype([14, 15]);
                                dispatch(getFileTableToBeEXPENSES(props.projId, 14, 15));
                            }}
                        >
                            Все категории
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedKategory({ name: "Калькулятор AS IS - TO BE", id: 14 });
                                setSelectedInfotype([14]);
                                dispatch(getFileTableToBeEXPENSES(props.projId, 14));
                            }}
                        >
                            Калькулятор AS IS - TO BE
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedKategory({ name: "Калькулятор AS IS – DREAM", id: 15 });
                                setSelectedInfotype([15]);
                                dispatch(getFileTableToBeEXPENSES(props.projId, 15));
                            }}
                        >
                            Калькулятор AS IS – DREAM
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* {selectedWorkList} */}
            </Row>
            <br />
            <Row>
                <FileComponentEdit
                    projId={props.projId}
                    addDocument={props.addDocument}
                    taskId={13}
                ></FileComponentEdit>
                <br></br>
                {currentFile !== null && (
                    <div className="core-pdf-viewer">
                        {files?.[currentFile]?.id && (
                            <PDFViewer
                                document={{
                                    url: getFileUrl(files[currentFile].id, props.projId)
                                }}
                            />
                        )}
                    </div>
                )}
                <Table>
                    <tbody>{fileTable}</tbody>
                </Table>
            </Row>
        </>
    );
}

export default ExpensesToBeField;
