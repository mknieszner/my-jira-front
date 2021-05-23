import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {TrainingComponent} from "./training.component";
import {TrainingRoutingModule} from "./training-routing.module";
import {TableComponent} from "./table/table.component";
import {DialogComponent} from "./dialog/dialog.component";

const ENTRY_COMPONENTS = [
  DialogComponent
];

const COMPONENTS = [
  TrainingComponent,
  TableComponent,

  ...ENTRY_COMPONENTS
];

const MODULES = [
  SharedModule,
  TrainingRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
  entryComponents: [ENTRY_COMPONENTS]
})
export class TrainingModule {

}
