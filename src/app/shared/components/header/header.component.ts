import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromUsers from '../../store/user';
import * as fromChat from '../../store/chat';
import {DataStorageService} from '../../data-storage.service';
import {Client} from 'stompjs/lib/stomp.js';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ChatMessageModel} from "../../chat-message.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NavigationService} from "../../navigation/navigation.service";
import {AuthCookie} from "../../authentication/auth-cookies-handler";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  token = AuthCookie.getAuth();
  username: Observable<string>;
  isAdmin: Observable<boolean>;
  newTaskState: Observable<boolean>;
  currentUsername: string;
  chatChanged = false;
  chatModel: ChatMessageModel[] = [];
  private params: Params;
  private chatName: string;
  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromUsers.UserState>,
              private dss: DataStorageService,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newTaskState = this.store.pipe(select(fromUsers.selectNewTaskState));
    this.username = this.store.pipe(select(fromUsers.selectCurrentUser));
    this.username
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((username: string) => {
        if (username) {
          this.dss.setCurrentUserRoles(username);
          this.currentUsername = username;
        }
      });
    this.isAdmin = this.store
      .pipe(select(fromUsers.selectCurrentUserRoles))
      .map(roles => roles.findIndex(role => role === 'ROLE_ADMIN') !== -1);

    this.store.pipe(select(fromChat.selectSelectedChat))
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(chatName => this.chatName = chatName);

    this.route.params
      .subscribe(params => this.params = params);

    this.store.pipe(select(fromChat.selectChatContent))
      .subscribe((chatModel: ChatMessageModel[]) => this.updateChat(chatModel));
  }

  updateChat(chatModel: ChatMessageModel[]) {
    this.chatModel = chatModel;
    if (chatModel.length <= 0 || chatModel[chatModel.length - 1].senderName === this.currentUsername) {
      return;
    }

    if (this.router.url === '/chat') {
      return;
    }

    this.chatChanged = true;
  }

  onLogout() {
    this.store.dispatch(new fromUsers.SetLogoutInfo('You have been successfully logged out!'));
    this.navigationService.goToLogin();
  }

  onNewTasksSeen() {
    this.store.dispatch(new fromUsers.SetTaskInfoAction(false));
    this.router.navigateByUrl('/users');
  }

  toChat() {
    this.chatChanged = false;
    this.router.navigateByUrl('/chat');
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
