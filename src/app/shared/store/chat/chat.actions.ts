import {Action} from '@ngrx/store';
import {ChatMessageModel} from '../../chat-message.model';

export const APPEND_CHAT_WITH_MESSAGE = 'APPEND_CHAT_WITH_MESSAGE';
export const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';
export const SELECT_CHAT = 'SELECT_CHAT';
export const RESET_STORE = 'RESET_CHAT_STORE';

export class AppendChatWithMessage implements Action {
  readonly type = APPEND_CHAT_WITH_MESSAGE;

  constructor(public payload: ChatMessageModel) {
  }
}

export class SetActiveWsUsers implements Action {
  readonly type = SET_ACTIVE_USERS;

  constructor(public payload: string[]) {
  }
}

export class SelectChat implements Action {
  readonly type = SELECT_CHAT;

  constructor(public payload: string) {
  }
}

export class ResetStore implements Action {
  readonly type = RESET_STORE;

  constructor() {
  }
}

export type ChatActions =
  AppendChatWithMessage |
  SetActiveWsUsers |
  SelectChat |
  ResetStore;
