import * as ConfigActions from './config.actions';

export interface ConfigState {
  backendRunning: boolean;
}

const initialTableState: ConfigState = {
  backendRunning: false
};

export function configReducers(state: ConfigState = initialTableState, action: ConfigActions.ConfigActions) {

  switch (action.type) {
    case ConfigActions.SET_RUNNING:
      return {
        ...state,
        backendRunning: action.payload,
      };
    default:
      return state;
  }
}
