import {Action} from '@ngrx/store';

export const SET_RUNNING = 'SET_RUNNING';


export class SetBackendRunning implements Action {
  readonly type = SET_RUNNING;

  constructor(public payload: boolean) {
  }
}


export type ConfigActions = SetBackendRunning;
