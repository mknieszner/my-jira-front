import {Component, Input, OnInit} from '@angular/core';
import {Status, TaskModel} from '../../shared/table.model';
import {FormControl, FormGroup} from '@angular/forms';
import {DataStorageService} from '../../shared/data-storage.service';
import {Store} from "@ngrx/store";
import * as fromAppReducers from "../../shared/store/app.reducers";
import * as UsersActions from "../../shared/store/user";

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {
  @Input() task: TaskModel;
  editedTaskForm: FormGroup;
  editTaskMode = false;
  status = Status;

  constructor(private dss: DataStorageService,
              private store: Store<fromAppReducers.AppState>) {
  }

  ngOnInit() {
  }

  onEditTaskMode(mode: boolean) {
    this.editTaskMode = mode;
    if (this.task) {
      this.editedTaskForm = new FormGroup({
        name: new FormControl(this.task.name),
        description: new FormControl(this.task.description),
        status: new FormControl(this.task.status),
      });
    }
  }

  onSaveEditedTask() { //(payload: { name: string, description: string, status: Status }) {
    const task: TaskModel = {
      id: this.task.id,
      tableId: this.task.tableId,
      name: this.editedTaskForm.value.name,
      description: this.editedTaskForm.value.description,
      status: this.editedTaskForm.value.status,
      userNames: this.task.userNames,
      taskDtos: this.task.taskDtos
    };

    this.dss.updateTask(task);
  }


  onCloseTaskMode() {
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(null));
  }
}
