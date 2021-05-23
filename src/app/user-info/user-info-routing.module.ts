import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserInfoComponent} from "./user-info.component";

export const routes: Routes = [
  {
    path: '',
    component: UserInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoRoutingModule {

}
