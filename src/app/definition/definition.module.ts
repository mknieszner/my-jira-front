import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {DefinitionComponent} from "./definition.component";
import {DefinitionRoutingModule} from "./definition-routing.module";

const COMPONENTS = [
  DefinitionComponent
];
const MODULES = [
  SharedModule,
  DefinitionRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
})
export class DefinitionModule {

}
