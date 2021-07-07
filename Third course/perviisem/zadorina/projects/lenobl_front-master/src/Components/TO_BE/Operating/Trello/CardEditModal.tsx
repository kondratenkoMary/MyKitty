import React, { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormState } from "react-use-form-state";
import { TrelloCardItem } from "../../../../reducers/trelloBoard";

export interface ICardEditModalProps {
    data: TrelloCardItem;
    onClose: () => void;
}

interface FormState {
    name: string;
    status: string;
    planDate: string;
    factDate: string;
    file: string;
}

const CardEditModal: FC<ICardEditModalProps> = ({ data, onClose }) => {
    const [state, { label, text }] = useFormState<FormState>(
        {},
        {
            withIds: true
        }
    );
    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>Редактирование карточки</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label {...label("status")}>Состояние</Form.Label>
                        <Form.Control {...text("status")} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label {...label("name")}>Наименование</Form.Label>
                        <Form.Control {...text("name")} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label {...label("planDate")}>Плановая дата</Form.Label>
                        <Form.Control {...text("planDate")} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label {...label("factDate")}>Фактическая дата</Form.Label>
                        <Form.Control {...text("factDate")} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label {...label("file")}>Загрузка файла</Form.Label>
                        <Form.Control {...text("file")} type="file" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Закрыть</Button>
                <Button onClick={onClose}>Применить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardEditModal;
