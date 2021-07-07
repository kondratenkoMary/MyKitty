import React, { FC, memo, useState, useEffect, useMemo } from "react";
import { Button, Table } from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import FileDeleteButton from "../../GeneralFileTable/FileDeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../Actions/rest";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
import PDFViewer from "pdf-viewer-reactjs";
import FileTableList from "../../FileTableList";

function OperatingField(props) {
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.OPERATINGtable);

    return <FileTableList files={files} projectId={props.projId} taskId={11} />;
}

export default OperatingField;
