import React, { FC, memo, useState, useEffect, useMemo } from "react";
import {
    Popover,
    Overlay,
    Button,
    Row,
    Col,
    Dropdown,
    FormControl,
    Form,
    DropdownButton,
    Table
} from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import FileDeleteloadButton from "../../GeneralFileTable/FileDeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../Actions/rest";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
import PDFViewer from "pdf-viewer-reactjs";

function SIPOCfield(props) {
    // console.log(props.SIPOCfile)
    const [fileTable, setFileTable] = React.useState();
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.AutomationFile);
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
        if (props.AutomationFile != undefined) {
            let mas = [];
            for (let i = 0; i < props.AutomationFile.length; i++) {
                mas.push(
                    <tr>
                        <td> {props.AutomationFile[i].docName} </td>
                        <td onClick={() => onClickRow(i)} style={{ cursor: "pointer" }}>
                            {" "}
                            {props.AutomationFile[i].fileName}{" "}
                        </td>
                        <td>
                            <Button
                                size="sm"
                                onClick={() => {
                                    props.saveFile(
                                        props.AutomationFile[i].id,
                                        props.projId,
                                        props.AutomationFile[i].fileName
                                    );
                                }}
                            >
                                Скачать
                            </Button>
                            <FileDeleteloadButton data={props.AutomationFile[i]} task={16}></FileDeleteloadButton>
                        </td>
                    </tr>
                );
            }
            setFileTable(mas);
        }
    }, [props.AutomationFile]);

    return (
        <>
            <FileComponentEdit projId={props.projId} addDocument={props.addDocument} taskId={16}></FileComponentEdit>
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
        </>
    );
}

export default SIPOCfield;
