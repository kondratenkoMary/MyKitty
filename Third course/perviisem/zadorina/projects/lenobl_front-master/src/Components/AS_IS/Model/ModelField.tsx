import React, { FC, memo, useState, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import FileDeleteLoadButton from "../../GeneralFileTable/FileDeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../Actions/rest";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
import PDFViewer from "pdf-viewer-reactjs";

export interface IModelFieldProps {
    projId: number;
}

const ModelField: FC<IModelFieldProps> = (props) => {
    const dispatch = useDispatch();
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.MODELfile);
    const [currentFile, setFile] = useState<number | null>(
        files?.length >= 1 && files[0].fileName.includes(".pdf") ? 0 : null
    );
    useMemo(() => {
        if (currentFile === null && files?.length >= 1 && files[0].fileName.includes(".pdf")) {
            setTimeout(() => {
                setFile(0);
            }, 1000);
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
        }, 1000);
    };

    return (
        <>
            <FileComponentEdit projId={props.projId} taskId={6} />
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
                <tbody>
                    {files.map((file, index) => (
                        <tr key={file.id}>
                            <td>{file.docName}</td>
                            <td onClick={() => onClickRow(index)} style={{ cursor: "pointer" }}>
                                {file.fileName}
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
                                        dispatch(saveFile(file.id, props.projId, file.fileName));
                                    }}
                                >
                                    Скачать
                                </Button>
                                <FileDeleteLoadButton data={file} task={6} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default memo(ModelField);
