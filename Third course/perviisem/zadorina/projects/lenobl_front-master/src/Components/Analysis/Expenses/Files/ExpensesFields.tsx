import React, { FC, memo, useState, useEffect, useMemo } from "react";
import { Button, Table, FormControl, Dropdown, Row } from "react-bootstrap";
import FileComponentEdit from "../../../FileComponent";
import FileDeleteloadButton from "../../../GeneralFileTable/FileDeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl, saveFile } from "../../../../Actions/rest";
import { IRequestState } from "../../../../reducers/grapthReducer";
import { StoreType } from "../../../../reducers";
import PDFViewer from "pdf-viewer-reactjs";
import FileTableList from "../../../FileTableList";

function ExpensesField(props) {
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.Expensesfile);

    return <FileTableList files={files} projectId={props.projId} taskId={9} />;
}

export default ExpensesField;
