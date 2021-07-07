import React, { useEffect } from "react";
import { getFileTableREASON } from "../../../Actions/rest";
import { useDispatch, useSelector } from "react-redux";
import { IRequestState } from "../../../reducers/grapthReducer";
import { StoreType } from "../../../reducers";
import FileTableList from "../../FileTableList";
import Select from "react-select";
import { useFormState } from "react-use-form-state";
import { OptionsType } from "react-select/src/types";

interface OptionValue {
    label: string;
    value: number;
}

const selectOptions: OptionsType<OptionValue> = [
    {
        label: "Все категории",
        value: -1
    },
    {
        label: "Диаграмма Ишикавы",
        value: 7
    },
    {
        label: "5Почему?",
        value: 8
    },
    {
        label: "MindMap",
        value: 9
    }
];

interface FormState {
    category: OptionValue;
}

const getInfoTypes = (category: number): number[] => {
    if (category === -1) {
        return selectOptions.filter((option) => option.value !== -1).map((option) => option.value);
    }

    return [selectOptions.find((option) => option.value === category)!.value];
};

function ReasonField(props) {
    const [state, { raw }] = useFormState<FormState>({
        category: selectOptions[0]
    });
    const infoType = getInfoTypes(state.values.category.value);
    const files = useSelector<StoreType, IRequestState["MODELfile"]>(({ grapth }) => grapth.REASONfile);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!state.values.category) {
            return;
        }

        if (state.values.category.value === -1) {
            dispatch(getFileTableREASON(props.projId, ...infoType));
            return;
        }

        dispatch(getFileTableREASON(props.projId, state.values.category.value));
    }, [state.values.category]);

    return (
        <>
            <div className="w-25 pb-2">
                <Select<OptionValue> options={selectOptions} {...raw("category")} placeholder="Выберите категорию" />
            </div>
            <FileTableList files={files} projectId={props.projId} infoType={infoType} taskId={8} />
        </>
    );
}

export default ReasonField;
