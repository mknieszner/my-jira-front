import {TableState} from './table';
import {UserState} from './user';
import {TaskState} from './task';
import {ChatState} from './chat';
import {ConfigState} from './config';

export interface AppState {
  tables: TableState;
  users: UserState;
  tasks: TaskState;
  chat: ChatState;
  config: ConfigState;
}
