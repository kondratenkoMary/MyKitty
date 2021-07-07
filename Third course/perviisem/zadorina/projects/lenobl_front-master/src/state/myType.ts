import { StateType, ActionType } from 'typesafe-actions';

export type Store = StateType<typeof import('../store').default>;
export type RootAction = ActionType<typeof import('../actions/root-action').default>;
export type RootState = StateType<typeof import('../reducers').default>;
