import {Component, Input, OnInit} from '@angular/core';
import {RoleModel} from '../role.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../user/user.model';
import {select, Store} from '@ngrx/store';
import {DataStorageService} from '../../shared/data-storage.service';
import * as fromUsers from '../../shared/store/user';
import * as UsersActions from '../../shared/store/user';
import {ActionSnackBarComponent} from "../../shared/snack-bar/action-snack-bar.component";
import {MatSnackBar, MatSnackBarRef} from "@angular/material";

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  @Input() role: RoleModel;
  editUserMode = false;
  users: Observable<UserModel[]>;
  userForm: FormGroup;
  newRoleMode: Observable<boolean>;
  snackBarRef: MatSnackBarRef<ActionSnackBarComponent>;

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService,
              public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.newRoleMode = this.store.pipe(select(fromUsers.selectNewRoleMode));
    this.users = this.store.pipe(select(fromUsers.selectUsers));
    this.dss.getUsers();
    this.userForm =
      new FormGroup({
        'user': new FormControl('Select option')
      });
  }

  postRemoveUser() {
    this.dss.removeUserFromRole({role: this.role, username: <string>this.userForm.value.user});
  }

  onEditUserMode() {
    this.editUserMode = true;
  }

  postAddUser() {
    this.dss.addRoleToUser({username: <string>this.userForm.value.user, roleName: this.role.name});
  }


  abortAddUser() {
    this.editUserMode = false;
  }

  onSubmitRole(name, description) {
    this.dss.saveNewRole({name: name, description: description});
  }

  onAbortSubmitRole() {
    this.store.dispatch(new UsersActions.SetNewRoleModeAction(false));
  }

  showSnackBar(message: string) {
    this.snackBarRef = this.snackBar.openFromComponent(ActionSnackBarComponent, {
      panelClass: ['styled-snack'],
      data: {
        message: message,
        action: null
      }
    });

    this.snackBarRef.afterDismissed().subscribe((data) => {
      if (data.dismissedByAction) {
        this.dss.deleteRole(this.role.name);
      }
    });
    this.snackBarRef.instance.ref = this.snackBarRef;
  }
}
