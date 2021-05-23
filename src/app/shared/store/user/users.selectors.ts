import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "./users.reducers";

const selectState = createFeatureSelector<UserState>('users');

export const selectCurrentUser = createSelector(selectState,
  state => state.currentUser
);

export const selectNewRoleMode = createSelector(selectState,
  state => state.newRoleMode
);

export const selectCurrentUserRoles = createSelector(selectState,
  state => state.currentUserRoles
);

export const selectNewTaskState = createSelector(selectState,
  state => state.newTaskInfo
);

export const selectToken = createSelector(selectState,
  state => state.token
);

export const selectSelectedUser = createSelector(selectState,
  state => state.selectedUser
);

export const selectLoginFailureInfo = createSelector(selectState,
  state => state.loginFailureInfo
);

export const selectCurrentUserDetails = createSelector(selectState,
  state => state.currentUserDetails
);

export const selectLogoutInfo = createSelector(selectState,
  state => state.logoutInfo
);

export const selectUserDisplayedTask = createSelector(selectState,
  state => state.userDisplayedTask
);

export const selectNewUserMode = createSelector(selectState,
  state => state.newUserMode
);

export const selectRoles = createSelector(selectState,
  state => state.roles
);
export const selectUsers = createSelector(selectState,
  state => state.users
);
