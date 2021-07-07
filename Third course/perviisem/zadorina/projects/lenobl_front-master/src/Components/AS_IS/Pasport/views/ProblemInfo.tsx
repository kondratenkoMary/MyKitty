import React, { FC, memo, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormState } from "react-use-form-state";
import { IProblemItem } from "../../../../reducers/grapthReducer";
import { useDispatch, useSelector } from "react-redux";
import { loadProcessInfo, saveProcessInfo } from "../../../../Actions/rest";
import { StoreType } from "../../../../reducers";

export interface IProblemInfoProps {
    projId: number;
    taskId: number;
}

interface FormState {
    info: string;
}

const ProblemInfo: FC<IProblemInfoProps> = ({ projId, taskId }) => {
    const [state, { textarea }] = useFormState<FormState>();
    const dispatch = useDispatch();
    const data = useSelector<StoreType, IProblemItem[]>(({ grapth }) => grapth.problemItems);

    useEffect(() => {
        dispatch(loadProcessInfo(projId, taskId));
    }, []);

    useEffect(() => {
        state.setField("info", data[0]?.name || "");
    }, [data]);

    const onClickHandler = () => {
        dispatch(saveProcessInfo(projId, taskId, state.values.info, data?.[0]?.id ?? undefined));
    };

    return (
        <div>
            <div>
                <b>Формулировка проблемы</b>
            </div>
            <div>Сформулировать основную проблему текущего процесса</div>
            <div>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        placeholder="Укажите формулировку основной проблемы текущего процесса (не более 255 символов)..."
                        maxLength={255}
                        {...textarea("info")}
                    />
                </Form.Group>
                <Button onClick={onClickHandler}>Сохранить изменения</Button>
            </div>
        </div>
    );
};

export default memo(ProblemInfo);
