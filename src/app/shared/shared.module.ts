import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotFoundComponent} from "./components/not-fonud/not-found.component";
import {AppMaterialModule} from "./modules/material/app-material.module";
import {DataStorageService} from "./data-storage.service";
import {FilterUtils} from "./filter/filter.utils";
import {OauthService} from "./oauth.service";
import {AuthCookie} from "./authentication/auth-cookies-handler";
import {StoreResetService} from "./store-reset.service";
import {ConstantsService} from "./constants.service";
import {SnackBarService} from "./snack-bar/snack-bar.service";
import {AuthGuard} from "./guard/auth-guard.service";
import {NavigationService} from "./navigation/navigation.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from "./components/menu/menu.component";
import {ClearArrayPipe} from './clear-array-pipe';
import {ChartsModule} from "ng4-charts";
import {SortByPipe} from "./sort/sort-by.pipe";
import {ExtendedFilterPipe} from "./filter/extended-filter.pipe";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {KeyPipe} from "../tables/pipes/key.pipe";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {InfoSnackBarComponent} from "./snack-bar/info-snack-bar.component";
import {ActionSnackBarComponent} from "./snack-bar/action-snack-bar.component";
import {ReversePipe} from "./reverse.pipe";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InitClientGuard} from "./guard/init-client-guard.service";
import {CurrentUserGuard} from "./guard/current-user-guard.service";
import {CurrentUserRolesGuard} from "./guard/current-user-roles.guard.service";
import {AuthInterceptor} from "./authentication/auth.interceptor";
import {UnauthorizedInterceptor} from "./authentication/unauthorized.interceptor";

const ENTRY_COMPONENTS = [
  InfoSnackBarComponent,
  ActionSnackBarComponent
];

const COMPONENTS = [
  NotFoundComponent,
  MenuComponent,
  SpinnerComponent,
  HeaderComponent,

  ...ENTRY_COMPONENTS
];

const PIPES = [
  ClearArrayPipe,
  SortByPipe,
  ExtendedFilterPipe,
  KeyPipe,
  ReversePipe,
];

const DIRECTIVES = [];

const MODULES = [
  CommonModule,
  RouterModule,
  AppMaterialModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  ChartsModule,
  HttpClientModule,
];

const GUARDS = [
  AuthGuard,
  InitClientGuard,
  CurrentUserGuard,
  CurrentUserRolesGuard,
];

const PROVIDERS = [
  DataStorageService,
  FilterUtils,
  AuthCookie,
  StoreResetService,
  StoreResetService,
  ConstantsService,
  SnackBarService,
  NavigationService,
  OauthService,

  GUARDS,

  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
];


@NgModule({
  declarations: [COMPONENTS, DIRECTIVES, PIPES],
  imports: [MODULES],
  exports: [COMPONENTS, DIRECTIVES, PIPES, MODULES],
  providers: PROVIDERS,
  entryComponents: [ENTRY_COMPONENTS],
})
export class SharedModule {

}
