import React, { FC, memo, useState, useEffect, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import FileComponentEdit from "./FileComponent";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../Actions/rest";
import { IRequestState } from "../reducers/grapthReducer";
import { StoreType } from "../reducers";
import PDFViewer from "pdf-viewer-reactjs";
import FileTableList from "./FileTableList";

function ItogoField(props) {
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.ITOGOfile);

    return <FileTableList files={files} taskId={18} projectId={props.projId} />;
}

export default ItogoField;
