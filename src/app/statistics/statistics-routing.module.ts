import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StatisticsComponent} from "./statistics.component";
import {TableDetailsGuard} from "./guards/table-details.guard.service";

export const routes: Routes = [
  {
    path: '',
    canActivate: [TableDetailsGuard],
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {

}
