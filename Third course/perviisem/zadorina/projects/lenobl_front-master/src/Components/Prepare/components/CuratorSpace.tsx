import React, { FC, memo } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import WorkersTable from "./WorkersTable";
import { IWorkerItem } from "../../../reducers/grapthReducer";
import { SelectItem } from "../MainPrepareParams";

export interface ISpaceProps {
    onChange: (value: any) => void;
    onDelete: (index: number) => void;
    options: SelectItem[];
    list: IWorkerItem[];
}

const CuratorSpace: FC<ISpaceProps> = ({ onChange, options, list, onDelete }) => {
    return (
        <fieldset disabled>
            <Form.Group>
                <Form.Label htmlFor="curator-select">Администраторы кейса</Form.Label>
                <div className="w-50">
                    <Select
                        isDisabled={true}
                        inputId="curator-select"
                        value={null}
                        onChange={onChange}
                        options={options}
                        placeholder="Выберите администратора кейса"
                    />
                </div>
                <WorkersTable onClickDelete={onDelete} label="Список выбранных кураторов" data={list} />
            </Form.Group>
        </fieldset>
    );
};

export default memo(CuratorSpace);
