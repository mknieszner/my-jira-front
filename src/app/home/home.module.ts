import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core";

const COMPONENTS = [
  HomeComponent
];
const MODULES = [
  SharedModule,
  HomeRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
})
export class HomeModule {

}
