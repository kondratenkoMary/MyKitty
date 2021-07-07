import React, { memo, useEffect, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInitiativeType } from "../../Actions/actions";
import { StoreType } from "../../reducers";
import { IRequestState } from "../../reducers/grapthReducer";
import Select, { Props } from "react-select";
import { ValueType } from "react-select/src/types";

const ExtraPrepareParams = (props: any) => {
    const dispatch = useDispatch();
    const data = useSelector<StoreType, IRequestState>(({ grapth }) => grapth);

    // useEffect(() => {
    //     if (data.openProjectData != null && data.openProjectData.initiateType) {
    //         console.log(">>initialType",props.initialType)
    //         // todo это должно устанавливаться в сторе на уровне редьюсера
    //         dispatch(setSelectedInitiativeType(data.openProjectData.initiateType));
    //     }
    // }, [data.openProjectData]);

    const prepareOptions = useMemo(() => {
        if (!data?.allInitiativeType?.length) {
            return [];
        }

        return data.allInitiativeType.map((value) => ({
            value,
            label: value.name
        }));
    }, [data.allInitiativeType]);

    const onChangePrepare = (value: ValueType<Props["OptionType"]>) => {
        dispatch(setSelectedInitiativeType(value?.value ?? null));
    };

    const value = useMemo(
        () =>
            (data.prepareExtraParams?.initiativeType && {
                value: data.prepareExtraParams?.initiativeType,
                label: data.prepareExtraParams?.initiativeType?.name
            }) ||
            null,
        [data.prepareExtraParams]
    );

    return (
        <>
            <div>
                <b>Дополнительные параметры</b>
            </div>
            <label htmlFor="initiativeType">Тип входящей инициативы</label>
            <div>
                <Row>
                    <Col xs={9}>
                        <Select
                            inputId="initiativeType"
                            value={value}
                            isClearable
                            onChange={onChangePrepare}
                            options={prepareOptions}
                            placeholder="Выберите процесс"
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default memo(ExtraPrepareParams);
