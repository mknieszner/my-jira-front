import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {UserInfoComponent} from "./user-info.component";
import {UserInfoRoutingModule} from "./user-info-routing.module";

const COMPONENTS = [
  UserInfoComponent
];
const MODULES = [
  SharedModule,
  UserInfoRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
})
export class UserInfoModule {

}
