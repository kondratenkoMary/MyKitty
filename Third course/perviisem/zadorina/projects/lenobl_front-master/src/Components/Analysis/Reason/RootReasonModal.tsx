import React, { FC, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select/async";
import { useFormState } from "react-use-form-state";
import { useAsyncData } from "../../../hooks/useAsyncData";

export interface ApplyStateArgs {
    factor?: any;
    reason: string;
}

export interface AddReasonModalProps {
    initial?: ApplyStateArgs;
    onClose: () => void;
    onApply: (values: ApplyStateArgs) => void;
}

export interface FactorTypeItem {
    id: number;
    orderNumber: number;
    name: string;
}

const RootReasonModal: FC<AddReasonModalProps> = ({ onClose, onApply, initial }) => {
    const [formState, { text, raw }] = useFormState<ApplyStateArgs>({
        factor: null,
        reason: initial?.reason
    });

    const [isLoading, data] = useAsyncData<FactorTypeItem[]>("/referencebook/rest/factorType/getAll");

    const onApplyHandler = () => {
        onApply({
            factor: formState.values.factor,
            reason: formState.values.reason
        });
    };

    useEffect(() => {
        if (data.length && initial?.factor) {
            formState.setField(
                "factor",
                data.find((el) => el.id === initial.factor)
            );
        }
    }, [data]);

    return (
        <Modal show onHide={onClose}>
            <Modal.Header>Описание корневой причины</Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Группа факторов</Form.Label>
                    <div>
                        <Select<FactorTypeItem>
                            isLoading={isLoading}
                            loadOptions={() => Promise.resolve(data)}
                            defaultOptions={data}
                            getOptionValue={(option) => option.id.toString()}
                            getOptionLabel={(option) => option.name}
                            {...raw("factor")}
                            placeholder="Выберите группу факторов (при необходимости)"
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Формулировка причины</Form.Label>
                    <Form.Control as="textarea" {...text("reason")} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Закрыть</Button>
                <Button onClick={onApplyHandler} variant="primary">
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RootReasonModal;
