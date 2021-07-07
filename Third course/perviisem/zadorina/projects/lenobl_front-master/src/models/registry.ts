export interface IProjectItem {
    condition: { id: number; orderNum: number; name: string };
    id: number;
    name: string;
    projPointCommand: {
        dateFact: string;
        id: number;
        name: string;
    } | null;
    stage: { id: number; name: string; stageId: number; startDate: string };
}
