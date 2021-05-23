import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DefinitionComponent} from "./definition.component";

export const routes: Routes = [
  {
    path: '',
    component: DefinitionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinitionRoutingModule {

}
