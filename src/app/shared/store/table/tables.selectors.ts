import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TableState} from "./tables.reducers";

export const selectState = createFeatureSelector<TableState>('tables');

export const selectFilter = createSelector(selectState,
  state => state.tableFilter
);

export const selectExtendedTableView = createSelector(selectState,
  state => state.extendedTableView
);

export const selectExtendedFilterContent = createSelector(selectState,
  state => state.extendedFilterContent
);

export const selectExtendedFilterMode = createSelector(selectState,
  state => state.extendedFilterMode
);

export const selectTableDetails = createSelector(selectState,
  state => state.tablesDetails
);

export const selectTableContent = createSelector(selectState,
  state => state.tableContent
);

export const selectEditedRow = createSelector(selectState,
  state => state.editedRow
);

export const selectTableDefinition = createSelector(selectState,
  state => state.tableDefinition
);

export const selectTableUsers = createSelector(selectState,
  state => state.tableUsers
);

export const selectExtendedRowView = createSelector(selectState,
  state => state.extendedRowView
);

export const selectEditedRowMode = createSelector(selectState,
  state => state.editRowMode
);

export const selectNewRowMode = createSelector(selectState,
  state => state.newRowMode
);

export const selectSortContent = createSelector(selectState,
  state => state.sortContent
);
