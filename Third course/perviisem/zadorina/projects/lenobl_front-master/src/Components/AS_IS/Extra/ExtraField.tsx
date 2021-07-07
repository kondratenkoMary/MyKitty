import React, { FC, memo, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../Actions/rest";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
import { Button, Table } from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import FileDeleteloadButton from "../../GeneralFileTable/FileDeleteButton";
import PDFViewer from "pdf-viewer-reactjs";

export interface IExtraFieldProps {
    type: number;
    projId: number;
}

const ExtraField: FC<IExtraFieldProps> = (props) => {
    const dispatch = useDispatch();
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.EXTRAfile);
    const [currentFile, setFile] = useState<number | null>(
        files?.length >= 1 && files[0].fileName.includes(".pdf") ? 0 : null
    );
    const typeTaskMap: Record<number, number> = {
        1: 7,
        2: 10,
        3: 14,
        4: 17
    };

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

    return (
        <>
            <div>
                <FileComponentEdit projId={props.projId} taskId={typeTaskMap[props.type]} />
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
            </div>

            <Table>
                <tbody>
                    {files.map((file, index) => (
                        <tr>
                            <td>{file.docName}</td>
                            <td onClick={() => onClickRow(index)} style={{ cursor: "pointer" }}>
                                {file.fileName}
                            </td>
                            <td>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        dispatch(saveFile(file.id, props.projId, file.fileName));
                                    }}
                                >
                                    Скачать
                                </Button>
                                <FileDeleteloadButton data={file} task={typeTaskMap[props.type]} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default memo(ExtraField);
