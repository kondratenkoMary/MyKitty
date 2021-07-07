import React, { FC, memo, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReasonField from "./ReasonField";
import RootReasonModal, { ApplyStateArgs } from "./RootReasonModal";
import { useDispatch, useSelector } from "react-redux";
import { createProblemItem, loadProblems } from "../../../Actions/rest";
import { StoreType } from "../../../reducers";
import ReasonTable from "./ReasonList/ReasonTable";
import MenuButton from "../../MenuButton";

const taskId = 8;

const pages = ["Изменить данные", "Прикрепить файлы"];

export interface IReasonProps {
    projId: number;
}

const Reason: FC<IReasonProps> = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [currentPage, setPage] = useState(pages[0]);
    const list = useSelector<StoreType, StoreType["grapth"]["problemList"]>(({ grapth }) => grapth.problemList);

    const onApplyHandler = (values: ApplyStateArgs) => {
        dispatch(createProblemItem(props.projId, taskId, values));
        setOpen(false);
    };

    useEffect(() => {
        dispatch(loadProblems(props.projId, taskId));
    }, []);

    return (
        <div>
            <div>
                <b>Причины проблемы и следствия</b>
            </div>
            <div>Определить причинно-следственные связи причин возникновения проблемы</div>
            <div className="w-25" style={{ display: "flex" }}>
                {pages.map((page) => (
                    <MenuButton
                        key={page}
                        active={currentPage === page}
                        onClick={() => {
                            setPage(page);
                        }}
                    >
                        {page}
                    </MenuButton>
                ))}
            </div>

            {currentPage === "Прикрепить файлы" && (
                <div className="py-4">
                    <ReasonField projId={props.projId} />
                </div>
            )}

            {currentPage === "Изменить данные" && (
                <>
                    <Button onClick={() => setOpen(!open)}>Добавить корневую причину</Button>
                    {open && <RootReasonModal onClose={() => setOpen(false)} onApply={onApplyHandler} />}

                    <ReasonTable data={list} taskId={taskId} projectId={props.projId} />
                </>
            )}
        </div>
    );
};

export default memo(Reason);
