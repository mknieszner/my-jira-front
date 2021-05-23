import {Action} from '@ngrx/store';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel, TaskModel} from '../../table.model';
import {UserModel} from '../../../user/user.model';
import {SortModel} from '../../sort/sort.model';

export const RESET_TABLE_STORE = 'RESET_TABLE_STORE';

export const ADD_ROW = 'ADD_ROW';
export const ADD_TASK = 'ADD_TASK';
export const SHOW_ROW = 'SHOW_ROW';
export const UPDATE_ROW = 'UPDATE_ROW';
export const EDIT_ROW_MODE = 'EDIT_ROW_MODE';
export const EDITED_ROW = 'EDITED_ROW';
export const DELETE_ROW = 'DELETE_ROW';

export const SET_ROWS = 'SET_ROWS';

export const SET_DEFINITION = 'SET_DEFINITION';

export const SET_NAMES = 'SET_NAMES';
export const ADD_NAMES = 'ADD_NAMES';

export const NEW_ROW_MODE = 'NEW_ROW_MODE';

export const SET_FILTER = 'SET_FILTER';
export const EXTENDED_FILTER_MODE = 'EXTENDED_FILTER_MODE';
export const SET_EXTENDED_TABLE_VIEW = 'SET_EXTENDED_TABLE_VIEW';
export const SET_EXTENDED_ROW_VIEW = 'SET_EXTENDED_ROW_VIEW';
export const RUN_EXTENDED_FILTER = 'RUN_EXTENDED_FILTER';
export const SET_EXTENDED_FILTER = 'SET_EXTENDED_FILTER';
export const SET_EXTENDED_FILTER_SELECT = 'SET_EXTENDED_FILTER_SELECT';

export const SET_SORT_CONTENT = 'SET_SORT_CONTENT';

export const SWITCH_TABLE_RESET = 'SWITCH_TABLE_RESET';

export const SET_ROW_TASKS = 'SET_ROW_TASKS';
export const SET_TABLE_USERS = 'SET_TABLE_USERS';
export const UPDATE_ROWS_TASK = 'UPDATE_ROWS_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_ROWS_TASK = 'DELETE_ROWS_TASK';
export const DELETE_TABLE = 'DELETE_TABLE';


export class SetNewRowModeAction implements Action {
  readonly type = NEW_ROW_MODE;

  constructor(public payload: boolean) {
  }
}

export class SetSortContent implements Action {
  readonly type = SET_SORT_CONTENT;

  constructor(public payload: SortModel) {
  }
}

export class AddRowAction implements Action {
  readonly type = ADD_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class ShowRowDetailsAction implements Action {
  readonly type = SHOW_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class UpdateRowAction implements Action {
  readonly type = UPDATE_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class SetRowsAction implements Action {
  readonly type = SET_ROWS;

  constructor(public payload: RowContentModel[]) {
  }
}

export class SetTableDefinitionAction implements Action {
  readonly type = SET_DEFINITION;

  constructor(public payload: TableDefinitionModel) {
  }
}

export class SetNamesAction implements Action {
  readonly type = SET_NAMES;

  constructor(public payload: { id: number, name: string }[]) {
  }
}

export class AddNamesAction implements Action {
  readonly type = ADD_NAMES;

  constructor(public payload: string[]) {
  }
}

export class SetEditRowMode implements Action {
  readonly type = EDIT_ROW_MODE;

  constructor(public payload: boolean) {
  }
}

export class SetEditedRow implements Action {
  readonly type = EDITED_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class ResetStore implements Action {
  readonly type = RESET_TABLE_STORE;

  constructor() {
  }
}

export class TableFilter implements Action {
  readonly type = SET_FILTER;

  constructor(public payload: string) {
  }
}

export class SetExtendedFilterMode implements Action {
  readonly type = EXTENDED_FILTER_MODE;

  constructor(public payload: boolean) {
  }
}

export class RunExtendedFilter implements Action {
  readonly type = RUN_EXTENDED_FILTER;

  constructor() {
  }
}

export class SetExtendedFilterSelect implements Action {
  readonly type = SET_EXTENDED_FILTER_SELECT;

  constructor(public payload: boolean) {
  }
}

export class SetExtendedFilter implements Action {
  readonly type = SET_EXTENDED_FILTER;

  constructor(public payload: ExtendedFilterModel) {
  }
}

export class SwitchTableReset implements Action {
  readonly type = SWITCH_TABLE_RESET;

  constructor() {
  }
}

export class SetRowsTasksAction implements Action {
  readonly type = SET_ROW_TASKS;

  constructor(public payload: { tasks: TaskModel[], rowId } ) {
  }
}

export class SetTableUsers implements Action {
  readonly type = SET_TABLE_USERS;

  constructor(public payload: UserModel[] ) {
  }
}

export class UpdateRowsTaskAction implements Action {
  readonly type = UPDATE_ROWS_TASK;

  constructor(public payload: { rowId: number, task: TaskModel } ) {
  }
}

export class UpdateTaskAction implements Action {
  readonly type = UPDATE_TASK;

  constructor(public payload: TaskModel ) {
  }
}

export class DeleteTask implements Action {
  readonly type = DELETE_ROWS_TASK;

  constructor(public payload: { taskId: number, rowId: number } ) {
  }
}

export class SetExtendedTableView implements Action {
  readonly type = SET_EXTENDED_TABLE_VIEW;

  constructor(public payload: boolean) {
  }
}

export class SetExtendedRowView implements Action {
  readonly type = SET_EXTENDED_ROW_VIEW;

  constructor(public payload: boolean) {
  }
}

export class DeleteRow implements Action {
  readonly type = DELETE_ROW;

  constructor(public payload: number) {
  }
}

export class AddTaskAction implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: {task: TaskModel, rowId: number}) {
  }
}

export class DeleteTable implements Action {
  readonly type = DELETE_TABLE;

  constructor(public payload: number) {
  }
}

export type TableActions =
  AddRowAction |
  SetNamesAction |
  AddNamesAction |
  SetRowsAction |
  SetTableDefinitionAction |
  SetNewRowModeAction |
  UpdateRowAction |
  ResetStore |
  ShowRowDetailsAction |
  SetEditRowMode |
  SetEditedRow |
  TableFilter |
  SetExtendedFilterMode |
  RunExtendedFilter |
  SetExtendedFilter |
  SetExtendedFilterSelect |
  SwitchTableReset|
  SetRowsTasksAction |
  SetTableUsers |
  UpdateRowsTaskAction |
  UpdateTaskAction |
  DeleteTask |
  SetExtendedTableView |
  SetExtendedRowView |
  SetSortContent |
  DeleteRow |
  AddTaskAction |
  DeleteTable;
