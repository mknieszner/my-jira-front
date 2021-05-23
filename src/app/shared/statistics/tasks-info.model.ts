import {TaskModel} from '../table.model';

export class TasksInfoModel {
  tasks: TaskModel[];
  unassignedTasks: TaskModel[];
  assignedTasks: TaskModel[];
  inProgressTasks: TaskModel[];
  doneTasks: TaskModel[];
}
