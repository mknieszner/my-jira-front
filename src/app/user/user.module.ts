import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UserRoutingModule} from "./user-routing.module";
import {UserTaskComponent} from "./user-task/user-task.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const ENTRY_COMPONENTS = [];

const COMPONENTS = [
  UserComponent,
  UserTaskComponent,
  UserDetailsComponent,

  ...ENTRY_COMPONENTS
];

const MODULES = [
  SharedModule,
  UserRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
  entryComponents: [ENTRY_COMPONENTS]
})
export class UserModule {

}
