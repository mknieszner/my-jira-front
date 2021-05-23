import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../user.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {RoleModel} from '../../roles/role.model';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import * as UsersActions from '../../shared/store/user';
import * as fromUsers from '../../shared/store/user';
import {TaskModel} from '../../shared/table.model';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userState: Observable<UserModel>;
  user: UserModel;
  editRoleMode = false;
  roles: Observable<RoleModel[]>;
  rolesValues: RoleModel[];
  roleForm: FormGroup;
  newUserMode: Observable<boolean>;
  newUserForm: FormGroup;
  userDisplayedTask: Observable<TaskModel>;

  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getRoles();
    this.userState = this.store.pipe(select(fromUsers.selectSelectedUser));
    this.userDisplayedTask = this.store.pipe(select(fromUsers.selectUserDisplayedTask));
    this.newUserMode = this.store.pipe(select(fromUsers.selectNewUserMode));
    this.roles = this.store.pipe(select(fromUsers.selectRoles));
    this.userState
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((user: UserModel) => {
        this.user = user;
      });
    this.newUserMode
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(() => {
        this.createForm();
      });
    this.roles
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(roles => {
        this.rolesValues = roles;
      });
    this.roleForm =
      new FormGroup({
        'role': new FormControl('Select option')
      });
  }

  postRemove() {
    this.dss.removeRoleFromUser({user: this.user, rolename: <string>this.roleForm.value.role});
  }

  onEditRoleMode() {
    this.editRoleMode = true;
  }

  postAddRole() {
    this.dss.addRoleToUser({username: this.user.username, roleName: <string>this.roleForm.value.role})
  }

  abortAddRole() {
    this.editRoleMode = false;
  }

  onAbortSubmitUser() {
    this.store.dispatch(new UsersActions.SetNewUserModeAction(false));
  }

  createForm() {
    this.newUserForm =
      new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'firstName': new FormControl(null, [Validators.required]),
        'lastName': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required]),
        'enabled': new FormControl(true, [Validators.required]),
        'roleNames': new FormArray([]),
        'taskDtos': new FormArray([])
      });
  }

  onRemoveUser(username: string, closeModalButton: HTMLButtonElement): boolean | void {
    if (closeModalButton && this.dss.deleteUser(username)) {
      closeModalButton.click();
    }
  }

  onSubmitUser() {
    this.dss.saveNewUser(this.newUserForm.value);
  }

  onSelectTask(taskDto: TaskModel) {
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(taskDto));
  }

  closeUser() {
    this.store.dispatch(new UsersActions.SetSelectedUser(null));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
