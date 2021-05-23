import {NgModule} from "@angular/core";
import {SigninComponent} from "./signin.component";
import {SharedModule} from "../shared/shared.module";
import {SigninRoutingModule} from "./signin-routing.module";

const COMPONENTS = [SigninComponent];
const MODULES = [
  SharedModule,
  SigninRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
})
export class SigninModule {

}
