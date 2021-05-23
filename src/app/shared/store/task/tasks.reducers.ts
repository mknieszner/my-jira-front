import * as TaskActions from './tasks.actions';
import {TaskModel} from '../../table.model';

export interface TaskState {
  taskDetailsMode: boolean;
  showedTask: TaskModel;
}

const initialTaskState: TaskState = {
  taskDetailsMode: false,
  showedTask: null
};

export function tasksReducers(state: TaskState = initialTaskState, action: TaskActions.TaskActions) {
  switch (action.type) {
    case TaskActions.SET_TASK_DETAILS_MODE:
      return {
        ...state,
        taskDetailsMode: action.payload
      };
    case TaskActions.SET_SHOWED_TASK:
      return {
        ...state,
        showedTask: action.payload
      };
    case TaskActions.ON_DELETE_TASK:
      state.taskDetailsMode = false;
      state.showedTask = null;
      return state;
    case TaskActions.RESET_TASK_STORE:
      state = initialTaskState;
      return state;
    default:
      return state;
  }
}
