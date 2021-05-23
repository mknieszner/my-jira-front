import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {StatisticsComponent} from "./statistics.component";
import {TableStatisticsComponent} from "./table-stats/table-statistics.component";
import {StoreModule} from "@ngrx/store";
import {statisticsReducers} from "./store";
import {StatisticsServiceModule} from "./statistics-service.module";

const COMPONENTS = [
  StatisticsComponent,
  TableStatisticsComponent,
];
const MODULES = [
  SharedModule,
  StatisticsRoutingModule,
  StatisticsServiceModule,
  StoreModule.forFeature('statistics', statisticsReducers)
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS],
  providers: [],
})
export class StatisticsModule {

}
