import React, { FC, memo } from "react";
import { IRequestState } from "../../reducers/grapthReducer";
import { useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { Table } from "react-bootstrap";
import FileDeleteButton from "./FileDeleteButton";
import FileDownloadButton from "../Prepare/components/FileDownloadButton";

const FileTable: FC = () => {
    const data = useSelector<StoreType, IRequestState["fileListPrepare"]>(({ grapth }) => grapth.fileListPrepare);

    // todo ??? проверить что должно приходить в FileDeleteButton
    return (
        <Table size="sm" className="core-table" striped bordered style={{ fontSize: 13 }}>
            <thead className="bg-dark text-light">
                <tr>
                    <th>Наименование документа</th>
                    <th>Наименование файла</th>
                    <th>Действия</th>
                </tr>
            </thead>
            {data?.length > 0 && (
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.nameNPA}</td>
                            <td>{row.numberNPA}</td>
                            <td className="text-center">
                                <FileDownloadButton data={row} />
                                <FileDeleteButton data={row} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            )}
        </Table>
    );
};

export default memo(FileTable);
