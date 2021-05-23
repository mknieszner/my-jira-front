import * as fromChat from './chat.actions';
import {ChatMessageModel} from '../../chat-message.model';

export interface ChatState {
  chatContent: ChatMessageModel[];
  activeUsers: string[];
  selectedChat: string;
}

const initialChatState: ChatState = {
  chatContent: [],
  activeUsers: [],
  selectedChat: ''
};

export function chatReducers(state: ChatState = initialChatState, action: fromChat.ChatActions) {
  switch (action.type) {
    case fromChat.APPEND_CHAT_WITH_MESSAGE:
      return {
        ...state,
        chatContent: [...state.chatContent, action.payload]
      };
    case fromChat.SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: [...action.payload]
      };
    case fromChat.SELECT_CHAT:
      return {
        ...state,
        selectedChat: action.payload
      };
    case fromChat.RESET_STORE:
      return {
        ...initialChatState,
      };
    default:
      return state;
  }
}
