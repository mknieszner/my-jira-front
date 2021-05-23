import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {TablesRoutingModule} from "./tables-routing.module";
import {TablesComponent} from "./tables.component";
import {TaskComponent} from "./components/task/task.component";
import {TableHeaderComponent} from "./components/table-header/table-header.component";
import {RowDetailsComponent} from "./components/row-details/row-details.component";
import {RowComponent} from "./components/row/row.component";

const COMPONENTS = [
  TablesComponent,
  TaskComponent,
  TableHeaderComponent,
  RowDetailsComponent,
  RowComponent,
];
const MODULES = [
  SharedModule,
  TablesRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
})
export class TablesModule {

}
