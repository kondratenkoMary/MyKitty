import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFilterName, setFilterProcessType } from "../Actions/actions";
import { StoreType } from "../reducers";
import { useDebounce } from "use-debounce";

import Select, { Props } from "react-select";
import { IRequestState } from "../reducers/grapthReducer";
import { loadProjectList } from "../Actions/registry";

export interface IFilterProjRegConnected {
    nameList: IRequestState["nameList"];
    processType: IRequestState["processType"];
    regFilter: IRequestState["regFilter"];
}

const FilterProjReg: FC = () => {
    const dispatch = useDispatch();
    const props = useSelector<StoreType, IFilterProjRegConnected>(({ grapth }) => ({
        regFilter: grapth.regFilter,
        processType: grapth.processType,
        nameList: grapth.nameList
    }));
    const [name, setName] = useState<string>("");
    const [debounceName] = useDebounce(name, 500);

    useEffect(() => {
        dispatch(setFilterName(debounceName));
        dispatch(loadProjectList());
    }, [debounceName]);

    const processTypeOptions = useMemo(
        () =>
            props?.processType?.map((el) => ({
                value: el,
                label: el.name
            })) || [],
        [props.processType]
    );
    const nameListOptions = useMemo(
        () =>
            props?.nameList?.map((name) => ({
                label: name,
                value: name
            })),
        [props.nameList]
    );

    const onChangeProcessType = useCallback(
        (value: Props["OptionType"]) => {
            console.log(">>>>", value);
            dispatch(setFilterProcessType(value?.value || null));
            if (props.regFilter.processTyepe?.id != value?.value) {
                dispatch(loadProjectList());
            }
        },
        [props.regFilter.processTyepe]
    );

    const typeValue = useMemo(() => processTypeOptions.find((el) => el.value.id === props.regFilter.processTyepe?.id), [
        processTypeOptions
    ]);

    return (
        <Row>
            <Col xs={2}>
                <Select
                    placeholder="Все типы"
                    value={typeValue}
                    options={processTypeOptions}
                    onChange={onChangeProcessType}
                    isClearable
                />
            </Col>
            <Col xs={{ span: 3, offset: 7 }}>
                <Form.Control
                    placeholder="Найти кейс по наименованию"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Col>
        </Row>
    );
};

export default memo(FilterProjReg);
