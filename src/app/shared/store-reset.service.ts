import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import * as fromAppReducers from './store/app.reducers';
import * as fromTables from './store/table/tables.actions';
import * as fromUsers from './store/user';
import * as fromChat from './store/chat/chat.actions';
import * as fromTasks from './store/task/tasks.actions';
import {AuthCookie} from './authentication/auth-cookies-handler';
import {WebSocketService} from "./web-socket/web-socket.service";


@Injectable({
  providedIn: "root"
})
export class StoreResetService {

  constructor(private store: Store<fromAppReducers.AppState>,
              private cookie: AuthCookie,
              private ws: WebSocketService) {
  }

  public resetStore() {
    this.ws.disconnect();
    this.store.dispatch(new fromTables.ResetStore());
    this.store.dispatch(new fromUsers.ResetStore());
    this.store.dispatch(new fromChat.ResetStore());
    this.store.dispatch(new fromTasks.ResetTaskStore());
    AuthCookie.deleteAuth();
  }
}
