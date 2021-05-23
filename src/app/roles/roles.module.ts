import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {RolesComponent} from "./roles.component";
import {RoleDetailsComponent} from "./role-details/role-details.component";
import {RolesRoutingModule} from "./roles-routing.module";

const ENTRY_COMPONENTS = [];

const COMPONENTS = [
  RolesComponent,
  RoleDetailsComponent,

  ...ENTRY_COMPONENTS
];

const MODULES = [
  SharedModule,
  RolesRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
  entryComponents: [ENTRY_COMPONENTS]
})
export class RolesModule {

}
