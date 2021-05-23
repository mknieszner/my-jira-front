import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ChatState} from "./chat.reducers";

const selectState = createFeatureSelector<ChatState>('chat');

export const selectActiveUsers = createSelector(selectState,
  state => state.activeUsers
);

export const selectChatContent = createSelector(selectState,
  state => state.chatContent
);

export const selectSelectedChat = createSelector(selectState,
  state => state.selectedChat
);
