import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import * as fromChat from "../shared/store/chat";
import {WebSocketService} from "../shared/web-socket/web-socket.service";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {ChatMessageModel} from "../shared/chat-message.model";
import * as fromUsers from "../shared/store/user";

@Injectable({providedIn: 'root'})
export class ChatFacade {


  constructor(private store: Store<fromChat.ChatState>,
              private ws: WebSocketService,
              private dss: DataStorageService) {
  }

  setActiveWsUsers(): void {
    return this.dss.setActiveWsUsers();
  }

  selectActiveUsers(): Observable<string[]> {
    return this.store.pipe(select(fromChat.selectActiveUsers));
  }

  selectSelectedChat(): Observable<string> {
    return this.store.pipe(select(fromChat.selectSelectedChat));
  }

  selectChatContent(): Observable<ChatMessageModel[]> {
    return this.store.pipe(select(fromChat.selectChatContent));
  }

  setChat(chatName): void {
    this.store.dispatch(new fromChat.SelectChat(chatName));
  }

  selectCurrentUser(): Observable<string> {
    return this.store.pipe(select(fromUsers.selectCurrentUser));
  }

  appendChatWithMessage(username: string, messageContent: string, chatName: string): void {
    this.store.dispatch(new fromChat.AppendChatWithMessage(new ChatMessageModel(username, messageContent, chatName)));
  }

  sendMessage(path: string, options: Object, messageContent: string): void {
    this.ws.send(path, options, messageContent);
  }

}
