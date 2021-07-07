import React, { FC, memo, useState, useEffect, useMemo } from "react";
import { Table, Button, FormControl, Dropdown, Row } from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import { getFileTableToBeMODEL } from "../../../Actions/rest";
import FileDeleteloadButton from "../../GeneralFileTable/FileDeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../Actions/rest";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
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

function ModelField(props) {
    const [selectedKategory, setSelectedKategory] = React.useState();
    const [selectedInfoType, setSelectedInfoType] = React.useState([6, 5]);
    const [fileTable, setFileTable] = React.useState();
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.ToBeModelfile);
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
        if (props.ToBeModelfile != undefined) {
            let mas = [];
            for (let i = 0; i < props.ToBeModelfile.length; i++) {
                mas.push(
                    <tr>
                        <td> {props.ToBeModelfile[i].docName} </td>
                        <td onClick={() => onClickRow(i)} style={{ cursor: "pointer" }}>
                            {" "}
                            {props.ToBeModelfile[i].fileName}{" "}
                        </td>
                        <td>
                            {/* {file.fileName.includes(".pdf") && (
                                <a href={getFileUrl(file.id, props.projId)} target="_blank">
                                    Открыть
                                </a>
                            )} */}
                            <Button
                                size="sm"
                                onClick={() => {
                                    props.saveFile(
                                        props.ToBeModelfile[i].id,
                                        props.projId,
                                        props.ToBeModelfile[i].fileName
                                    );
                                }}
                            >
                                Скачать
                            </Button>
                            <FileDeleteloadButton
                                data={props.ToBeModelfile[i]}
                                infoType={selectedInfoType}
                                task={12}
                            ></FileDeleteloadButton>
                        </td>
                    </tr>
                );
            }
            setFileTable(mas);
        }
    }, [props.ToBeModelfile]);

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
                                setSelectedInfoType([6, 5]);
                                dispatch(getFileTableToBeMODEL(props.projId, 6, 5));
                            }}
                        >
                            Все категории
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedKategory({ name: "Модель DREAM", id: 6 });
                                setSelectedInfoType([6]);
                                dispatch(getFileTableToBeMODEL(props.projId, 6));
                            }}
                        >
                            Модель DREAM
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedKategory({ name: "Модель TO BE", id: 5 });
                                setSelectedInfoType([5]);
                                dispatch(getFileTableToBeMODEL(props.projId, 5));
                            }}
                        >
                            Модель TO BE
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
                    taskId={12}
                ></FileComponentEdit>
                <br />
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

export default ModelField;
