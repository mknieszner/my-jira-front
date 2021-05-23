import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TaskState} from "./tasks.reducers";

const selectState = createFeatureSelector<TaskState>('tasks');

export const selectShowedTask = createSelector(selectState,
  state => state.showedTask
);

export const selectTaskDetailsMode = createSelector(selectState,
  state => state.taskDetailsMode
);
