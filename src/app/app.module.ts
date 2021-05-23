import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';

import {tablesReducers} from './shared/store/table';
import {usersReducers} from './shared/store/user';
import {tasksReducers} from './shared/store/task';
import {chatReducers} from './shared/store/chat';
import {configReducers} from "./shared/store/config";

import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing-module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      tables: tablesReducers,
      users: usersReducers,
      tasks: tasksReducers,
      chat: chatReducers,
      config: configReducers
    }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(overlayContainer: OverlayContainer) {
  //   overlayContainer.getContainerElement().classList.add('candy-themed');
  //   overlayContainer.getContainerElement().classList.add('my-themed');
  // }
}

