import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {RowContentModel, TableDefinitionModel, TablesDetails, TaskModel} from './table.model';
import {Store} from '@ngrx/store';
import * as fromUsers from './store/user';
import * as fromConfig from './store/config';
import * as TablesActions from './store/table/tables.actions';
import * as fromAppReducers from './store/app.reducers';
import {UserModel} from '../user/user.model';
import {RoleModel} from '../roles/role.model';
import * as TaskActions from './store/task/tasks.actions';
import * as fromChat from './store/chat';
import {SnackBarService} from "./snack-bar/snack-bar.service";
import {environment} from "../../environments/environment";
import {WebSocketService} from "./web-socket/web-socket.service";
import {SnackBarTheme} from "./snack-bar/info-snack-bar.component";

@Injectable()
export class DataStorageService {
  apiVersion = '/v1';
  basehost = environment.baseUrl + this.apiVersion;

  setBackendRunning() {
    this.httpClient.get(this.basehost + '/public/health')
      .subscribe((running) => {
        this.store.dispatch(new fromConfig.SetBackendRunning(running !== null));
      });
  }

  setUserDetails(username: string) {
    this.httpClient.get<UserModel>(this.basehost + '/users/' + username)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new fromUsers.SetCurrntUserDetails(user));
      });
  }

  updateUser(user: UserModel) {
    this.httpClient.put<UserModel>(this.basehost + '/users/' + user.username, user)
      .subscribe(
        (updatedUser: UserModel) => {
          this.store.dispatch(new fromUsers.SetCurrntUserDetails(updatedUser));
          this.snackBarService.showSnackBar('DONE!', SnackBarTheme.success);
        });
  }

  updatePassword(oldPassword, newPassword, username) {
    this.httpClient.put<boolean>(this.basehost + '/users/' + username + '/pass', {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .subscribe(
        (done: boolean) => {
          this.snackBarService.showSnackBar('DONE!', SnackBarTheme.success);
        });
  }

  setActiveWsUsers(): void {
    this.httpClient.get<string[]>(this.basehost + '/users/ws-active')
      .subscribe((activeUsers: string[]) => {
        this.store.dispatch(new fromChat.SetActiveWsUsers(activeUsers));
      });
  }

  setTableHeaderBy(tableId: number) {
    return this.httpClient.get<TableDefinitionModel>(this.basehost + '/projects/tables/' + tableId + '/definition')
      .subscribe((definition: TableDefinitionModel) => {
        this.store.dispatch(new TablesActions.SetTableDefinitionAction(definition));
      });
  }

  setTableRowsBy(tableId: number) {
    return this.httpClient.get<RowContentModel[]>(this.basehost + '/projects/tables/' + tableId + '/rows')
      .subscribe((rows: RowContentModel[]) => {
        this.store.dispatch(new TablesActions.SetRowsAction(rows));
      });
  }

  setTablesDetails() {
    this.httpClient.get<TablesDetails[]>(this.basehost + '/projects/tables/details')
      .subscribe(
        (details) => {
          this.store.dispatch(new TablesActions.SetNamesAction(details));
        });
  }

  postTableDefinition(definition: TableDefinitionModel, databaseEnvironment) {
    this.httpClient.post(this.basehost + '/projects/tables/definition/' + databaseEnvironment, definition)
      .subscribe(() => {
          this.snackBarService.showSnackBar("Done!", SnackBarTheme.success, null, () => this.setTablesDetails());
          this.setTablesDetails()
        }
      );
  }

  setCurrentUsername(): void {
    this.httpClient.get<UserModel>(this.basehost + '/users/me')
      .subscribe((user: UserModel) => {
        this.store.dispatch(new fromUsers.SetCurrentUserAction(user.username));
        this.store.dispatch(new fromUsers.SetCurrentUserRolenames(user.roleNames))
      });
  }

  getUsers() {
    this.httpClient.get<UserModel[]>(this.basehost + '/users')
      .subscribe((users: UserModel[]) => {
        this.store.dispatch(new fromUsers.SetUsersAction(users));
      });
  }

  getRoles() {
    this.httpClient.get<RoleModel[]>(this.basehost + '/roles/details')
      .subscribe((roles: RoleModel[]) => {
        this.store.dispatch(new fromUsers.SetRolesAction(roles));
      });
  }

  addRoleToUser(data: { username: string, roleName: string }) {
    this.httpClient.post(this.basehost + '/users/' + data.username + '/roles', null, {params: {roleName: data.roleName}})
      .subscribe((user: UserModel) => {
        this.store.dispatch(new fromUsers.AddRoleToUser(user));
        this.store.dispatch(new fromUsers.AddUserToRole({username: data.username, roleName: data.roleName}));
      });
  }


  // todo send role id instead of role name
  removeRoleFromUser(data: { user: UserModel, rolename: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/users/' + data.user.username + '/roles', {params: {roleName: data.rolename}})
      .subscribe((response) => {
        if (response) {
          data.user.roleNames.splice(data.user.roleNames.indexOf(data.rolename), 1);
          this.store.dispatch(new fromUsers.RemoveRoleFromUser(data.user));
        }
      });
  }

  removeUserFromRole(data: { role: RoleModel, username: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/roles/users/' + data.username, {params: {roleName: data.role.name}})
      .subscribe((response) => {
        if (response) {
          let userToRemove = null;
          data.role.userDtos.forEach(user => {
            if (user.username === data.username) {
              userToRemove = user;
            }
          });
          data.role.userDtos.splice(data.role.userDtos.indexOf(userToRemove), 1);
          this.store.dispatch(new fromUsers.RemoveUserFromRole(data.role));
        }
      });
  }

  addNewRow(tableId: number, newRow: RowContentModel) {
    this.httpClient.post<RowContentModel>(this.basehost + '/projects/tables/' + tableId + '/row', newRow)
      .subscribe((savedRow: RowContentModel) => {
        this.store.dispatch(new TablesActions.AddRowAction(savedRow));
      });
  }

  updateRow(tableId: number, updatedRow: RowContentModel) {
    this.httpClient.put<RowContentModel>(this.basehost + '/projects/tables/' + tableId + '/row', updatedRow)
      .subscribe(
        (savedRow: RowContentModel) => {
          this.store.dispatch(new TablesActions.UpdateRowAction(savedRow));
        });
  }

  setCurrentUserRoles(username: string) {
    this.httpClient.get<string[]>(this.basehost + '/roles/user/' + username)
      .subscribe((roles: string[]) => {
        this.store.dispatch(new fromUsers.SetCurrentUserRolenames(roles));
      });
  }

  saveNewRole(role: { name: string, description: string }) {
    this.httpClient.post<RoleModel>(this.basehost + '/roles', role.description, {params: {roleName: role.name}})
      .subscribe((savedRole: RoleModel) => {
        this.store.dispatch(new fromUsers.AddRoleAction(savedRole));
      });
  }

  deleteUser(username: string): boolean | void {
    this.httpClient.delete<boolean>(this.basehost + '/users/' + username)
      .subscribe((status: boolean) => {
        if (status) {
          this.store.dispatch(new fromUsers.DeleteUserAction(username));
          this.store.dispatch(new fromUsers.SetNewUserModeAction(false));
          this.store.dispatch(new fromUsers.SetUserDisplayedTask(null));
        }
        return true;
      });
  }

  saveNewUser(user: UserModel) {
    this.httpClient.post<UserModel>(this.basehost + '/users', user)
      .subscribe((savedUser: UserModel) => {
        this.store.dispatch(new fromUsers.AddUserAction(savedUser));
        this.store.dispatch(new fromUsers.SetNewUserModeAction(false));
      });
  }

  saveNewTask(tableId: number, newTask: TaskModel, rowId: number) {
    this.httpClient.post<TaskModel>(this.basehost + '/projects/tables/' + tableId + '/rows/' + rowId + '/tasks', newTask)
      .subscribe((task: TaskModel) => {
        this.store.dispatch(new TablesActions.AddTaskAction({task: task, rowId: rowId}));
      });
  }

  setTableUsers(tableId: number) {
    this.httpClient.get<UserModel[]>(this.basehost + '/users/table/' + tableId)
      .subscribe((users: UserModel[]) => {
        this.store.dispatch(new TablesActions.SetTableUsers(users));
      });
  }

  onAssignUserToTask(tableId: number, rowId: number, taskId: number, username: string) {
    this.httpClient.post<TaskModel>(this.basehost + '/projects/tables/' + tableId + '/rows/tasks/' + taskId, username)
      .subscribe((task: TaskModel) => {
        this.store.dispatch(new TablesActions.UpdateRowsTaskAction({rowId: rowId, task: task}));
        this.ws.send('/app/newTasks/' + username, {});
      });
  }

  onRemoveUserFromTask(tableId: number, rowId: number, taskId: number, username: string) {
    this.httpClient.delete<TaskModel>(this.basehost + '/projects/tables/' + tableId + '/rows/tasks/' + taskId + '/user/' + username)
      .subscribe((task: TaskModel) => {
        this.store.dispatch(new TablesActions.UpdateRowsTaskAction({rowId: rowId, task: task}));
        this.ws.send('/app/newTasks/' + username, {});
      });
  }

  updateTask(task: TaskModel) {
    this.httpClient.put<TaskModel>(this.basehost + '/projects/tables/' + task.tableId + '/rows/tasks', task)
      .subscribe(
        (updatedTask: TaskModel) => {
          this.store.dispatch(new TablesActions.UpdateTaskAction(updatedTask));
          this.store.dispatch(new fromUsers.UpdateTaskAction(updatedTask));
        });
  }

  deleteTask(tableId: number, taskId: number, rowId: number) {
    this.httpClient.delete<boolean>(this.basehost + '/projects/tables/' + tableId + '/rows/tasks/' + taskId)
      .subscribe((response) => {
        if (response) {
          this.store.dispatch(new TaskActions.OnDeleteTask(taskId));
          this.store.dispatch(new TablesActions.DeleteTask({rowId: rowId, taskId: taskId}));
        }
      });
  }

  deleteRow(tableId: number, rowId: number) {
    this.httpClient.delete<boolean>(this.basehost + '/projects/tables/' + tableId + '/rows/' + rowId)
      .subscribe((response) => {
        if (response) {
          this.store.dispatch(new TablesActions.DeleteRow(rowId));
        }
      });
  }

  deleteRole(roleName: string) {
    this.httpClient.delete<boolean>(this.basehost + '/roles', {params: {roleName: roleName}})
      .subscribe((status: boolean) => {
        if (status) {
          this.store.dispatch(new fromUsers.DeleteRoleAction(roleName));
        }
      });
  }

  deleteProject(tableId: number) {
    this.httpClient.delete<boolean>(this.basehost + '/projects/' + tableId)
      .subscribe((status: boolean) => {
        if (status) {
          this.store.dispatch(new TablesActions.DeleteTable(tableId));
        }
      });
  }

  constructor(private httpClient: HttpClient,
              private store: Store<fromAppReducers.AppState>,
              private ws: WebSocketService,
              private snackBarService: SnackBarService) {
  }
}
