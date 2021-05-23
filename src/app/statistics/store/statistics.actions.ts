import {Action} from '@ngrx/store';

export const SET_SELECTED_TABLE_NAME = 'SET_SELECTED_TABLE_NAME';

export class SetSelectedTableName implements Action {
  readonly type = SET_SELECTED_TABLE_NAME;

  constructor(public payload: string) {
  }
}

export type StatisticsActions = SetSelectedTableName;
