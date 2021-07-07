import React, { FC, memo } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormState } from "react-use-form-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export interface INewCardFormProps {
    onAdd: (params: any) => void;
    onCancel: VoidFunction;
    laneId: string;
}

interface FormState {
    description: string;
}

const NewCardForm: FC<INewCardFormProps> = (props) => {
    const [state, { text }] = useFormState<FormState>();

    return (
        <div className="p-2 border-primary border">
            <Form.Text className="text-center">Добавление карточки</Form.Text>
            <Form.Control
                as="textarea"
                rows={5}
                style={{ fontSize: 13 }}
                maxLength={200}
                {...text("description")}
                placeholder="Введите оптимизационное решение"
            />
            <div className="text-center mt-2">
                <Button
                    variant="success"
                    onClick={() => {
                        props.onAdd({
                            ...state.values,
                            title: ""
                        });
                        props.onCancel();
                    }}
                >
                    Сохранить
                </Button>
                <Button variant="link" onClick={props.onCancel}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </div>
        </div>
    );
};

export default memo(NewCardForm);
