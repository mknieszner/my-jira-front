import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from './user.model';
import {select, Store} from '@ngrx/store';
import {DataStorageService} from '../shared/data-storage.service';
import * as UsersActions from '../shared/store/user';
import * as fromUsers from "../shared/store/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Observable<UserModel[]>;
  selectedUser: Observable<UserModel>;

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.users = this.store.pipe(select(fromUsers.selectUsers));
    this.selectedUser = this.store.pipe(select(fromUsers.selectSelectedUser));
    this.dss.getUsers();
  }

  onSelectUser(user: UserModel) {
    this.store.dispatch(new UsersActions.SetSelectedUser(user));
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(null));
  }

  onNewUser() {
    this.store.dispatch(new UsersActions.SetNewUserModeAction(true));
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(null));
  }

  // // onNewRole() {
  // //   this.roleStore.dispatch(new TablesActions.SetNewRoleModeAction(true));
  // // }
  //
  // onRemoveRole(name: string) {
  //   this.dss.deleteRole(name);
  //   this.roleStore.dispatch(new TablesActions.SetNewRoleModeAction(false))
  //   this.selectedRole = null;
  // }
}
