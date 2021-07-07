import React, { memo, useEffect } from "react";
import { IRequestState } from "../../../reducers/grapthReducer";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../reducers";
import { Button, Form, Table } from "react-bootstrap";
import { saveFile } from "../../../Actions/rest";
import FileComponentEdit from "../../FileComponent";
import FileTable from "./FileTable";

export interface IFileUploaderSpaceProps {
    data: IRequestState["fileListPrepare"];
}

const FileUploaderSpace = () => {
    return (
        <>
            <Form.Group>
                <Form.Label>Файл с текстом распоряжения о проведении работ по реинжинирингу</Form.Label>
                <FileComponentEdit taskId={1} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Список загруженных файлов</Form.Label>
                <FileTable />
            </Form.Group>
        </>
    );
};

export default memo(FileUploaderSpace);
