import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import {RoleModel} from './role.model';
import * as fromUsers from '../shared/store/user';
import {DataStorageService} from '../shared/data-storage.service';
import * as UsersActions from '../shared/store/user';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Observable<RoleModel[]>;
  selectedRole: RoleModel;

  constructor(private roleStore: Store<fromUsers.UserState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.roles = this.roleStore.pipe(select(fromUsers.selectRoles));
    this.dss.getRoles();
  }

  onSelectRole(role: RoleModel) {
    this.selectedRole = role;
  }

  onNewRole() {
    this.roleStore.dispatch(new UsersActions.SetNewRoleModeAction(true));
  }
}
