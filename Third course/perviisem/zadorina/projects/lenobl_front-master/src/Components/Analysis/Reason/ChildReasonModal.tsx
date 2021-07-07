import React, { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormState } from "react-use-form-state";
import { IProblemListItem } from "../../../reducers/grapthReducer";

export interface IAddChildModalProps {
    parent?: IProblemListItem;
    onApply: (reason: string) => void;
    onClose: () => void;
    initial?: { reason: string };
}

const ChildReasonModal: FC<IAddChildModalProps> = ({ onClose, onApply, parent, initial }) => {
    const [state, { text }] = useFormState(initial);

    const onClickApplyHandler = () => {
        onApply(state.values.reason);
        onClose();
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header>Описание причины</Modal.Header>
            <Modal.Body>
                {!!parent && (
                    <Form.Group>
                        <Form.Label>Верхнеуровневая причина</Form.Label>
                        <Form.Text>{parent.name}</Form.Text>
                    </Form.Group>
                )}
                <Form.Group>
                    <Form.Label>Формулировка причины</Form.Label>
                    <Form.Control as="textarea" {...text("reason")} placeholder="Укажите формулировку причины" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Закрыть</Button>
                <Button onClick={onClickApplyHandler} variant="primary">
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChildReasonModal;
