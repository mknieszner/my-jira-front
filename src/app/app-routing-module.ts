import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./shared/guard/auth-guard.service";
import {NotFoundComponent} from "./shared/components/not-fonud/not-found.component";
import {InitClientGuard} from "./shared/guard/init-client-guard.service";
import {CurrentUserGuard} from "./shared/guard/current-user-guard.service";

export const appRoutes: Routes = [
  {
    path: 'signin',
    loadChildren: './signin/signin.module#SigninModule'
  },
  {
    path: '',
    canActivate: [AuthGuard, InitClientGuard, CurrentUserGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'roles',
        loadChildren: './roles/roles.module#RolesModule'
      },
      {
        path: 'users',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
      },
      {
        path: 'definitions',
        loadChildren: './definition/definition.module#DefinitionModule'
      },
      {
        path: 'statistics',
        loadChildren: './statistics/statistics.module#StatisticsModule'
      },
      {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
      },
      {
        path: 'user-info',
        loadChildren: './user-info/user-info.module#UserInfoModule'
      },
      {
        path: 'training',
        loadChildren: './training/training.module#TrainingModule'
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
