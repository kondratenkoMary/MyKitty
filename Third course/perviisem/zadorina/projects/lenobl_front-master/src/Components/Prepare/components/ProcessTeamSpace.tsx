import React, { FC, memo } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import WorkersTable from "./WorkersTable";
import { SelectItem } from "../MainPrepareParams";
import { IWorkerItem } from "../../../reducers/grapthReducer";
import { ISpaceProps } from "./CuratorSpace";

const ProcessTeamSpace: FC<ISpaceProps> = ({ list, options, onChange, onDelete }) => (
    <Form.Group>
        <Form.Label htmlFor="process-team-select">Участники процессной команды</Form.Label>
        <div className="w-50">
            <Select
                inputId="process-team-select"
                value={null}
                onChange={onChange}
                options={options}
                placeholder="Выбрать участника процессной команды"
            />
        </div>
        <WorkersTable onClickDelete={onDelete} label="Выбранные участники процессной команды" data={list} />
    </Form.Group>
);

export default memo(ProcessTeamSpace);
