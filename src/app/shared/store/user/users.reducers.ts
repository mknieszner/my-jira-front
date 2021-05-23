import * as fromUsersActions from './users.actions';
import {TaskModel} from '../../table.model';
import {UserModel} from '../../../user/user.model';
import {RoleModel} from '../../../roles/role.model';
import {Client} from 'stompjs/lib/stomp.js';


export interface UserState {
  newTaskInfo: boolean;
  currentSocketClient: Client;
  currentUser: string;
  currentUserDetails: UserModel;
  currentUserRoles: string[];
  token: string;
  users: UserModel[];
  newUserMode: boolean;
  roles: RoleModel[];
  newRoleMode: boolean;
  loginFailureInfo: string;
  logoutInfo: string;
  selectedUser: UserModel;
  userDisplayedTask: TaskModel;
}

const initialUserState: UserState = {
  newTaskInfo: false,
  currentSocketClient: null,
  currentUser: '',
  currentUserDetails: null,
  currentUserRoles: [],
  token: null,
  users: [],
  newUserMode: false,
  roles: [],
  newRoleMode: false,
  loginFailureInfo: '',
  logoutInfo: '',
  selectedUser: null,
  userDisplayedTask: null
};

export function usersReducers(state: UserState = initialUserState, action: fromUsersActions.UserActions) {
  switch (action.type) {
    case fromUsersActions.SET_NEW_USER_MODE:
      return {
        ...state,
        newUserMode: action.payload
      };
    case fromUsersActions.SET_NEW_ROLE_MODE:
      return {
        ...state,
        newRoleMode: action.payload
      };
    case fromUsersActions.ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload]
      };
    case fromUsersActions.DELETE_ROLE:
      return {
        ...state,
        roles: [...deleteItemByName(state.roles, action.payload)]
      };
    case fromUsersActions.DELETE_USER:
      return {
        ...state,
        users: [...deleteItemByUsername(state.users, action.payload)]
      };
    case fromUsersActions.SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      };
    case fromUsersActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case fromUsersActions.SET_ROLES:
      return {
        ...state,
        roles: [...action.payload]
      };
    case fromUsersActions.ADD_ROLE_TO_USER:
      return {
        ...state,
        users: [...updateUsersRoles(state.users, action.payload)]
      };
    case fromUsersActions.ADD_USER_TO_ROLE:
      return {
        ...state,
        roles: [...addUserToRole(state.users, state.roles, action.payload)]
      };
    case fromUsersActions.REMOVE_ROLE_FROM_USER:
      return {
        ...state,
        users: [...updateUsersRoles(state.users, action.payload)]
      };
    case fromUsersActions.REMOVE_USER_FROM_ROLE:
      return {
        ...state,
        roles: [...updateRolesUsers(state.roles, action.payload)]
      };
    case fromUsersActions.SET_CURRENT_USER_ROLENAMES:
      return {
        ...state,
        currentUserRoles: action.payload
      };

    case fromUsersActions.DELETE_TOKEN:
      return {
        ...state,
        token: null
      };
    case fromUsersActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case fromUsersActions.DELETE_CURRENT_USER:
      return {
        ...state,
        currentUser: ''
      };
    case fromUsersActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case fromUsersActions.SET_CURRENT_USER_DETAILS:
      return {
        ...state,
        currentUserDetails: action.payload
      };
    case fromUsersActions.SWITCH_TABLE_RESET:
      return {
        ...initialUserState,
        currentUser: state.currentUser,
        currentUserRoles: state.currentUserRoles,
        token: state.token,
      };
    case fromUsersActions.SET_NEW_WEB_SOCKET_CLIENT:
      return {
        ...state,
        currentSocketClient: action.payload
      };
    case fromUsersActions.SET_TASK_INFO:
      return {
        ...state,
        newTaskInfo: action.payload
      };
    case fromUsersActions.SET_LOGIN_FAILURE_INFO:
      return {
        ...state,
        loginFailureInfo: action.payload,
        logoutInfo: initialUserState.logoutInfo
      };
    case fromUsersActions.SET_LOGOUT_INFO:
      return {
        ...state,
        loginFailureInfo: initialUserState.loginFailureInfo,
        logoutInfo: action.payload
      };
    case fromUsersActions.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload
      };
    case fromUsersActions.UPDATE_TASK:
      return {
        ...state,
        users: [...updateUsersTask(state.users, action.payload)],
        selectedUser: updateUserTask(state.selectedUser, action.payload),
        userDisplayedTask: null
      };
    case fromUsersActions.SET_USER_DISPLAYED_TASK:
      return {
        ...state,
        userDisplayedTask: action.payload
      };
    case fromUsersActions.RESET_STORE:
      return {
        ...initialUserState
      };
    default:
      return state;
  }
}

function addUserToRole(users: UserModel[], roles: RoleModel[], payload: { username: string, roleName: string }): RoleModel[] {
  let user = null;
  users.forEach(u => {
    if (u.username === payload.username) {
      user = u;
    }
  });
  roles.forEach(role => {
    if (role.name === payload.roleName) {
      role.userDtos = [...role.userDtos, user]
    }
  });
  return roles;
}

function updateUsersTask(usersToUpdate: UserModel[], task: TaskModel): UserModel[] {
  const users = usersToUpdate;
  users.forEach((user: UserModel, i) => {
    users[i] = updateUserTask(user, task);
  });
  return users;
}

function updateUserTask(userToUpdate: UserModel, task: TaskModel): UserModel {
  const user = userToUpdate;
  user.taskDtos.forEach((taskToUpdate: TaskModel, i) => {
    if (taskToUpdate.id === task.id) {
      user.taskDtos[i] = task;
    }
  });
  return user;
}

function deleteItemByName(array: NameModel[], itemName: string): Array<NameModel> {// TODO GENERIC TYPE FUNCTION???  r.216/255
  array.forEach((arrayItem, i) => {
    if (arrayItem.name === itemName) {
      array.splice(i, 1);
    }
  });
  return array;
}

function deleteItemByUsername(array: UsernameModel[], itemName: string) {
  array.forEach((arrayItem, i) => {
    if (arrayItem.username === itemName) {
      array.splice(i, 1);
    }
  });
  return array;
}

function updateRolesUsers(roles: RoleModel[], newRole: RoleModel): RoleModel[] {
  roles.forEach((role) => {
    if (role.name === newRole.name) {
      role.userDtos = newRole.userDtos;
    }
  });
  return roles;
}

function updateUsersRoles(users: UserModel[], newUser: UserModel): UserModel[] {
  users.forEach((user, i) => {
    if (user.username === newUser.username) {
      users[i].roleNames = newUser.roleNames;
    }
  });
  return users;
}

interface NameModel {
  name: string;
}

interface UsernameModel {
  username: string;
}
