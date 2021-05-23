import * as TableActions from './tables.actions';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel, TablesDetails, TaskModel} from '../../table.model';
import {UserModel} from '../../../user/user.model';
import {SortModel} from '../../sort/sort.model';
import {DELETE_TABLE} from "./tables.actions";

export interface TableState {
  editRowMode: boolean;
  newRowMode: boolean;
  editedRow: RowContentModel;
  tableDefinition: TableDefinitionModel;
  tableContent: RowContentModel[];
  tableUsers: UserModel[];
  tablesDetails: TablesDetails[];
  tableFilter: string;
  extendedFilterMode: boolean;
  extendedFilterAction: boolean;
  extendedFilterContent: ExtendedFilterModel;
  filterSelect: boolean;
  extendedTableView: boolean;
  extendedRowView: boolean;
  sortContent: SortModel;
}

const initialTableState: TableState = {
  editRowMode: false,
  newRowMode: false,
  editedRow: null,
  tableDefinition: null,
  tableContent: [],
  tableUsers: [],
  tablesDetails: [],
  tableFilter: '',
  extendedFilterMode: false,
  extendedFilterAction: false,
  extendedFilterContent: null,
  filterSelect: false,
  extendedTableView: false,
  extendedRowView: false,
  sortContent: {
    name: '',
    index: 0,
    dataType: '',
    asc: true
  }
};

export function tablesReducers(state: TableState = initialTableState, action: TableActions.TableActions) {

  switch (action.type) {
    case TableActions.ADD_ROW:
      return {
        ...state,
        tableContent: [...state.tableContent, action.payload]
      };
    case TableActions.UPDATE_ROW:
      return {
        ...state,
        tableContent: [...updateRow(state.tableContent, action.payload)]
      };
    case TableActions.SET_ROWS:
      return {
        ...state,
        tableContent: [...action.payload]
      };
    case TableActions.SET_NAMES:
      return {
        ...state,
        tablesDetails: [...action.payload]
      };
    case TableActions.ADD_NAMES:
      return {
        ...state,
        tablesDetails: [...state.tablesDetails, ...action.payload]
      };
    case TableActions.SET_DEFINITION:
      return {
        ...state,
        tableDefinition: action.payload
      };
    case TableActions.EDIT_ROW_MODE:
      return {
        ...state,
        editRowMode: action.payload
      };
    case TableActions.NEW_ROW_MODE:
      return {
        ...state,
        newRowMode: action.payload
      };
    case TableActions.EDITED_ROW:
      return {
        ...state,
        editedRow: action.payload
      };
    case TableActions.RESET_TABLE_STORE:
      return {
        ...initialTableState
      };
    case TableActions.SET_FILTER:
      return {
        ...state,
        tableFilter: action.payload
      };
    case TableActions.EXTENDED_FILTER_MODE:
      return {
        ...state,
        extendedFilterMode: action.payload
      };
    case TableActions.RUN_EXTENDED_FILTER:
      return {
        ...state,
        extendedFilterAction: !state.extendedFilterAction
      };
    case TableActions.SET_EXTENDED_FILTER:
      return {
        ...state,
        extendedFilterContent: action.payload
      };
    case TableActions.SET_EXTENDED_FILTER_SELECT:
      return {
        ...state,
        filterSelect: action.payload
      };
    case TableActions.SWITCH_TABLE_RESET:
      return {
        ...initialTableState,
        tablesDetails: state.tablesDetails,
      };
    case TableActions.SET_ROW_TASKS:
      return {
        ...state,
        tableContent: [...setRowTasks(state.tableContent, action.payload)]
      };
    case TableActions.SET_TABLE_USERS:
      return {
        ...state,
        tableUsers: [...action.payload]
      };
    case TableActions.UPDATE_ROWS_TASK:
      return {
        ...state,
        tableContent: [...updateTaskUsers(state.tableContent, action.payload)]
      };
    case TableActions.UPDATE_TASK:
      return {
        ...state,
        tableContent: [...updateTask(state.tableContent, action.payload)]
      };
    case TableActions.DELETE_ROWS_TASK:
      return {
        ...state,
        tableContent: [...deleteRowsTask(state.tableContent, action.payload)]
      };
    case TableActions.SET_EXTENDED_TABLE_VIEW:
      return {
        ...state,
        extendedTableView: action.payload
      };
    case TableActions.SET_EXTENDED_ROW_VIEW:
      return {
        ...state,
        extendedRowView: action.payload
      };
    case TableActions.SET_SORT_CONTENT:
      return {
        ...state,
        sortContent: action.payload
      };
    case TableActions.DELETE_ROW:
      return {
        ...state,
        tableContent: [...deleteRow(state.tableContent, action.payload)],
        editRowMode: initialTableState.editRowMode,
        editedRow: initialTableState.editedRow,
      };
    case TableActions.ADD_TASK:
      return {
        ...state,
        tableContent: [...addRowTask(state.tableContent, action.payload)]
      };
    case TableActions.DELETE_TABLE:
      return {
        ...state,
        tablesDetails: [...deleteTable(state.tablesDetails, action.payload)]
      };
    default:
      return state;
  }
}

function updateTask(tableContent: RowContentModel[], payload: TaskModel): RowContentModel[] {
  tableContent.forEach((row: RowContentModel, i) => {
    row.taskDtos.forEach((taskDto: TaskModel, j) => {
      if (taskDto.id === payload.id) {
        tableContent[i].taskDtos[j] = payload;
      }
    });
  });
  return tableContent;
}


function deleteRow(tableContent: RowContentModel[], rowId: number): RowContentModel[] {
  tableContent.forEach((row: RowContentModel, i) => {
    if (row.id === rowId) {
      tableContent.splice(i, 1);
    }
  });
  return tableContent;
}

function deleteRowsTask(tableContent: RowContentModel[], payload: { rowId: number, taskId: number }): RowContentModel[] {
  tableContent.forEach((row: RowContentModel, i) => {
    if (row.id === payload.rowId) {
      row.taskDtos.forEach((taskDto: TaskModel, j) => {
        if (taskDto.id === payload.taskId) {
          tableContent[i].taskDtos.splice(j, 1);
        }
      });
    }
  });
  return tableContent;
}

function updateTaskUsers(tableContent: RowContentModel[], payload: { rowId: number, task: TaskModel }): RowContentModel[] {
  tableContent.forEach((row: RowContentModel, i) => {
    if (row.id === payload.rowId) {
      row.taskDtos.forEach((taskDto: TaskModel, j) => {
        if (taskDto.id === payload.task.id) {
          tableContent[i].taskDtos[j].userNames = payload.task.userNames;
        }
      });
    }
  });
  return tableContent;
}


function setRowTasks(rows: RowContentModel[], data: { tasks: TaskModel[], rowId }): RowContentModel[] {
  rows.forEach((row) => {
    if (row.id === data.rowId) {
      row.taskDtos = data.tasks;
    }
  });
  return rows;
}

function addRowTask(rows: RowContentModel[], data: { task: TaskModel, rowId }): RowContentModel[] {
  rows.forEach((row) => {
    if (row.id === data.rowId) {
      row.taskDtos = [...row.taskDtos, data.task];
    }
  });
  return rows;
}

function deleteTable(tablesDetails: TablesDetails[], tableId: number): TablesDetails[] {
  tablesDetails.forEach((tableDetails, i) => {
    if (tableDetails.id === tableId) {
      tablesDetails.splice(i, 1)
    }
  });
  return tablesDetails;
}

// function deleteItemByName(array: NameModel[], itemName: string): Array<NameModel> {// TODO GENERIC TYPE FUNCTION???  r.216/255 REMOVE?
//   array.forEach((arrayItem, i) => {
//     if (arrayItem.name === itemName) {
//       array.splice(i, 1);
//     }
//   });
//   return array;
// }
//
// function deleteItemByUsername(array: UsernameModel[], itemName: string) { // TODO REMOVE?
//   array.forEach((arrayItem, i) => {
//     if (arrayItem.username === itemName) {
//       array.splice(i, 1);
//     }
//   });
//   return array;
// }


function updateRow(rows: RowContentModel[], updatedRow: RowContentModel): RowContentModel[] {
  rows.forEach((row, i) => {
    if (row.id === updatedRow.id) {
      rows[i] = updatedRow;
    }
  });
  return rows;
}

// function updateRoleUsers(roles: RoleModel[], newRole: RoleModel): RoleModel[] { // TODO remove?
//   roles.forEach((role) => {
//     if (role.name === newRole.name) {
//       role.userDtos = newRole.userDtos;
//     }
//   });
//   return roles;
// }
//
// function updateUsersRoles(users: UserModel[], newUser: UserModel): UserModel[] {// TODO remove?
//   users.forEach((user, i) => {
//     if (user.username === newUser.username) {
//       users[i].roleNames = newUser.roleNames;
//     }
//   });
//   return users;
// }
//
// interface NameModel { // TODO remove?
//   name: string;
// }
//
// interface UsernameModel { // TODO remove?
//   username: string;
// }
