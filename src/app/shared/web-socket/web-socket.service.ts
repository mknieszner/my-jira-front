import {Injectable} from '@angular/core';
import * as SockJS from 'sockjs-client';
import {AuthCookie} from '../authentication/auth-cookies-handler';
import {Client, Frame, Stomp} from 'stompjs/lib/stomp.js';
import {select, Store} from '@ngrx/store';
import * as  fromUsers from '../store/user';
import * as fromChat from '../store/chat/chat.actions';
import {environment} from "../../../environments/environment";
import {filter, first} from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  private stompClient: Client;

  constructor(private cookie: AuthCookie,
              private store: Store<fromUsers.UserState>) {
  }

  init(): void {
    this.connectWS();
  }

  private connectWS(): void {
    const socket = new SockJS(environment.baseUrl + '/newTasks?access_token=' + AuthCookie.getAuth()) as WebSocket;
    this.stompClient = Stomp.over(socket);
    this.store.pipe(
      select(fromUsers.selectCurrentUser),
      filter(username=> !!username),
      first()
    )
      .subscribe((username: string) => {
        if (username) {
          this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/topic/newTasks/' + username, () => {
              this.store.dispatch(new fromUsers.SetTaskInfoAction(true));
            });
            this.stompClient.subscribe('/topic/chat', (messageOutput: Frame) => {
              this.store.dispatch(new fromChat.AppendChatWithMessage(JSON.parse(messageOutput.body)));
            });
            this.stompClient.subscribe('/topic/chat/' + username, (messageOutput: Frame) => {
              this.store.dispatch(new fromChat.AppendChatWithMessage(JSON.parse(messageOutput.body)));
            });
            this.stompClient.subscribe('/topic/people/chat', (messageOutput: Frame) => {
              this.store.dispatch(new fromChat.SetActiveWsUsers(JSON.parse(messageOutput.body)));
            });

          });
        }
      });
  }

  send(path: string, options, content = null): void {
    if (content) {
      this.stompClient.send(path, options, content)
    } else {
      this.stompClient.send(path, options)
    }
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
