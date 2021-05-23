import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import * as fromUsers from '../shared/store/user';
import {DataStorageService} from '../shared/data-storage.service';
import {UserModel} from '../user/user.model';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  usernameState: Observable<string>;
  userDetails: UserModel;
  editMode = false;
  resetPasswordMode = false;

  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.usernameState = this.store.pipe(select(fromUsers.selectCurrentUser));
    this.store.pipe(
      select(fromUsers.selectCurrentUserDetails),
      takeUntil(this.ngOnDestroy$)
    ).subscribe((user: UserModel) => {
      this.userDetails = user;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  togglePasswordResetMode() {
    this.resetPasswordMode = !this.resetPasswordMode;
  }

  updateUser(formValue: { firstName, lastName, email }) {

    this.dss.updateUser({
      username: this.userDetails.username,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      passowrd: '', // TODO: remove password from user details on Tickets!
      email: formValue.email,
      enabled: false,
      roleNames: [],
      taskDtos: [],
    });
  }

  updatePassword(formValue: { oldPassword, newPassword, confirmPassword }) {
    if (formValue.newPassword === formValue.confirmPassword && formValue.newPassword.length > 1) {
      this.dss.updatePassword(formValue.oldPassword, formValue.newPassword, this.userDetails.username);
    }
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
