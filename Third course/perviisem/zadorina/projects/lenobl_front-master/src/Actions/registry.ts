import { ActionType, createAsyncAction } from "typesafe-actions";
import { IWorkerItem } from "../reducers/grapthReducer";
import { Dispatch } from "react";
import { GetState } from "../reducers";
import { processFetch } from "../utils/fetchers";
import { IProjectItem } from "../models/registry";

export const caseListAction = createAsyncAction("REQUEST_CASE_LIST", "SUCCESS_CASE_LIST", "ERROR_CASE_LIST")<
    void,
    IProjectItem[],
    string
>();

export interface ProjectListArgs {
    stageId?: number;
    processTypeId?: number;
    projName?: string;
}

export const loadProjectList = () => async (dispatch: Dispatch<any>, getState: GetState) => {
    const { stage, processTyepe, name } = getState().grapth.regFilter;
    const append = Object.entries({
        stageId: stage?.id,
        processTypeId: processTyepe?.id,
        projName: name
    } as ProjectListArgs)
        .filter(([_, value]) => !!value)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    try {
        dispatch(caseListAction.request());
        const result = await processFetch<IProjectItem[]>(`project/getAllProjects?${append}`);
        // dispatch(setProjList(result));
        dispatch(caseListAction.success(result));
    } catch (e) {
        dispatch(caseListAction.failure("Ошибка загрузки"));
    }
};

export const updateProj = (id: number, data: any) => async (dispatch: Dispatch<any>) => {
    try {
        console.log("HERE", data);
        await processFetch(`project/saveUpdate/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        dispatch(loadProjectList());
    } catch (e) {
        console.error(e);
    }
};
export const saveNewProj = (process: any, newName: any, workerId: IWorkerItem[], instList: any) => async (
    dispatch: Dispatch<any>
) => {
    try {
        await processFetch("project/addNewProject", {
            method: "POST",
            body: JSON.stringify({
                projectName: newName,
                process: process,
                curators: workerId,
                institution: instList
            })
        });
        dispatch(loadProjectList());
    } catch (e) {
        console.error(e);
    }
};

export type RegistryAction = ActionType<typeof caseListAction>;
