import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ConfigState} from "./config.reducers";

export const selectState = createFeatureSelector<ConfigState>('config');

export const selectRunning = createSelector(selectState,
  state => state.backendRunning
);
