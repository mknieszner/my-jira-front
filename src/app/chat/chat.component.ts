import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Client} from 'stompjs/lib/stomp.js';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from '../shared/chat-message.model';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ChatFacade} from "./chat.facade";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('chatDiv') private chatDiv: ElementRef;
  chatContent: Observable<ChatMessageModel[]>;
  currentUser: Observable<string>;
  activeWsUsers: Observable<string[]>;
  public unreadMessages = new Map<string, boolean>();
  public messagesMap = new Map<string, ChatMessageModel[]>();
  username: string;
  chatName: string;
  chatNameState: Observable<string>;
  private ngOnDestroy$ = new Subject();


  constructor(private facade: ChatFacade) {
  }

  ngOnInit() {
    this.facade.setActiveWsUsers();
    this.clearChat('global');
    this.facade.setChat('global');
    this.chatContent = this.facade.selectChatContent();
    this.chatNameState = this.facade.selectSelectedChat();
    this.chatNameState
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(chatName => {
        this.chatName = chatName
      });
    this.activeWsUsers = this.facade.selectActiveUsers();
    this.activeWsUsers
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(users => {
        users.forEach(user => {
          if (!this.unreadMessages.has(user)) {
            this.clearChat(user)
          }
        })
      });
    this.chatContent
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(chat => {
        this.mapLastToRespectiveChat(chat);
        if (chat.length > 0) {
          if (chat[chat.length - 1].recipientName === 'global' && this.chatName !== 'global') {
            this.unreadMessages.set('global', true);
          }
          if (chat[chat.length - 1].recipientName !== 'global'
            && this.chatName !== chat[chat.length - 1].senderName) {
            this.unreadMessages.set(chat[chat.length - 1].senderName, true);
          }
        }
      });
    this.currentUser = this.facade.selectCurrentUser();
    this.currentUser
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((username) => {
        this.username = username;
      });
    this.chatContent
      .pipe(takeUntil(this.ngOnDestroy$))//todo remove?
      .subscribe(chat => {
        this.fillInitially(chat)
      }).unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (this.chatDiv) {
      this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight + 20;
    }
  }

  setChat(chatName: string) {
    this.unreadMessages.set(chatName, false);
    this.facade.setChat(chatName);
  }

  postMessage(messageContent: string) {
    if (messageContent) {
      if (this.chatName === 'global') {
        this.facade.sendMessage('/app/chat', {}, messageContent);
      } else {
        this.facade.appendChatWithMessage(this.username, messageContent, this.chatName);
        this.facade.sendMessage('/app/chat/' + this.chatName, {}, messageContent);
      }
    }
  }

  private fillInitially(chat: ChatMessageModel[]) {
    this.messagesMap.forEach((value, key) => this.messagesMap.set(key, []));
    if (chat.length > 0) {
      chat.forEach((value) => {
        const chatName = value.recipientName === 'global'
          ? 'global'
          : value.senderName === this.username
            ? value.recipientName
            : value.senderName;
        this.messagesMap.set(chatName, [...this.messagesMap.get(chatName), value]);
      })
    }
  }

  private mapLastToRespectiveChat(chat: ChatMessageModel[]) {
    if (chat.length > 0) {
      const chatName = chat[chat.length - 1].recipientName === 'global'
        ? 'global'
        : chat[chat.length - 1].senderName === this.username
          ? chat[chat.length - 1].recipientName
          : chat[chat.length - 1].senderName;
      this.messagesMap.set(chatName, [...(this.messagesMap.get(chatName) || []), chat[chat.length - 1]]);
    }
  }

  private clearChat(chatName): void {
    this.unreadMessages.delete(chatName);
    this.messagesMap.delete(chatName);
  }

  ngOnDestroy(): void {
    this.facade.setChat(null);
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

}
