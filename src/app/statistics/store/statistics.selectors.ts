import {createFeatureSelector, createSelector} from "@ngrx/store";
import {StatisticsState} from "./statistics.reducers";

const selectState = createFeatureSelector<StatisticsState>('statistics');

export const selectSelectedTableName = createSelector(selectState,
  state => state.selectedTableName
);
