import React, { FC, useEffect, useState } from "react";
import { IGeneralFileTable } from "../reducers/grapthReducer";
import { getFileUrl, saveFile, deleteFile } from "../Actions/rest";
import { Button, Table } from "react-bootstrap";
import FileDeleteloadButton from "./GeneralFileTable/FileDeleteButton";
import FileComponentEdit from "./FileComponent";
import PDFViewer from "pdf-viewer-reactjs";
import { useDispatch } from "react-redux";

export interface FileTableListProps {
    files: IGeneralFileTable[];
    projectId: number;
    taskId: number;
    infoType?: number[];
}

const FileTableList: FC<FileTableListProps> = ({ files, infoType, taskId, projectId }) => {
    const [currentFile, setFile] = useState<number | null>(
        files?.length >= 1 && files[0].fileName.includes(".pdf") ? 0 : null
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentFile === null && files?.length >= 1 && files[0].fileName.includes(".pdf")) {
            setFile(0);
            setTimeout(() => {
                setFile(0);
            }, 100);
        }
    });

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

    return (
        <>
            <FileComponentEdit projId={projectId} taskId={taskId} />
            <br />
            {currentFile !== null && (
                <div className="core-pdf-viewer">
                    {files?.[currentFile]?.id && (
                        <PDFViewer
                            document={{
                                url: getFileUrl(files[currentFile].id, projectId)
                            }}
                        />
                    )}
                </div>
            )}
            <Table>
                <tbody>
                    {files?.map((file, index) => (
                        <tr key={file.id}>
                            <td> {file.docName} </td>
                            <td onClick={() => onClickRow(index)} style={{ cursor: "pointer" }}>
                                {" "}
                                {file.fileName}{" "}
                            </td>
                            <td>
                                {/* {file.fileName.includes(".pdf") && (
                                    <a href={getFileUrl(file.id, projectId)} target="_blank">
                                        Открыть
                                    </a>
                                )} */}
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        dispatch(saveFile(file.id, projectId, file.fileName));
                                    }}
                                >
                                    Скачать
                                </Button>
                                {/* <Button
                                    size="sm"
                                    onClick={() => {
                                        dispatch(deleteFile(file.id, projectId, file.fileName, infoType));
                                    }}
                                >
                                    Удалить
                                </Button> */}
                                <FileDeleteloadButton data={file} infoType={infoType} task={taskId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default FileTableList;
