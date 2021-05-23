import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TablesComponent} from "./tables.component";

export const routes: Routes = [
  {
    path: '',
    component: TablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {

}
