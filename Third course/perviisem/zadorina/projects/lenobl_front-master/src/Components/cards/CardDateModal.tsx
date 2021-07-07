import React, { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";
import { useFormState } from "react-use-form-state";
import { dateFormat } from "../CardToolbar";

export interface ICardDateModalProps {
    startDate: string;
    endDate: string;
    onClose: VoidFunction;
    onApply: (values: FormState) => void;
}

export interface FormState {
    startDate: Date;
    endDate: Date;
}

const CardDateModal: FC<ICardDateModalProps> = ({ startDate, endDate, onApply, onClose }) => {
    const [state, { raw }] = useFormState<FormState>({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    });

    return (
        <Modal show onHide={onClose} onClick={(event: React.MouseEvent) => event.stopPropagation()}>
            <Modal.Header>Редактирование данных этапа</Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label htmlFor="beginDate">Дата начала</Form.Label>
                    <div>
                        <DatePicker
                            id="beginDate"
                            wrapperClassName="w-100"
                            className="form-control"
                            dateFormat="dd.MM.yyyy"
                            locale={ru}
                            placeholderText="Дата начала этапа"
                            todayButton="Сегодня"
                            selected={state.values.startDate}
                            isClearable
                            selectsStart
                            {...raw("startDate")}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="endDate">Дата окончания</Form.Label>
                    <div>
                        <DatePicker
                            id="endDate"
                            wrapperClassName="w-100"
                            className="form-control"
                            dateFormat="dd.MM.yyyy"
                            locale={ru}
                            placeholderText="Дата окончания этапа"
                            todayButton="Сегодня"
                            selected={state.values.endDate}
                            isClearable
                            selectsEnd
                            {...raw("endDate")}
                        />
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Отменить</Button>
                <Button onClick={() => onApply(state.values)}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardDateModal;
