import React, { FC, memo } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { IWorkerItem } from "../../../reducers/grapthReducer";

export interface ISupervisorSpaceProps {
    list: IWorkerItem[];
    onChange: (value: any) => void;
    value: IWorkerItem | null;
}

const SupervisorSpace: FC<ISupervisorSpaceProps> = ({ list, value, onChange }) => (
    <Form.Group>
        <Form.Label htmlFor="supervisor-select">Руководитель процессной команды</Form.Label>
        <Select
            className="w-50"
            inputId="supervisor-select"
            value={{
                label: value?.name,
                value: value
            }}
            onChange={onChange}
            options={list.map((worker) => ({
                value: worker,
                label: worker.name
            }))}
            placeholder="Выбрать руководителя"
        />
    </Form.Group>
);

export default memo(SupervisorSpace);
