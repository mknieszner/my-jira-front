import * as fromStatistics from './statistics.actions';

export interface StatisticsState {
  selectedTableName: string;
}

const initialStatisticState: StatisticsState = {
  selectedTableName: null
};

export function statisticsReducers(state: StatisticsState = initialStatisticState, action: fromStatistics.StatisticsActions) {
  switch (action.type) {
    case fromStatistics.SET_SELECTED_TABLE_NAME:
      return {
        ...state,
        selectedTableName: action.payload
      };
    default:
      return state;
  }
}
