import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RowContentModel, Status, TableDefinitionModel, TaskModel} from '../../../shared/table.model';
import {select, Store} from '@ngrx/store';
import * as fromTasks from '../../../shared/store/task';
import * as fromTable from '../../../shared/store/table';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from '../../../shared/data-storage.service';
import {UserModel} from '../../../user/user.model';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task: TaskModel;
  @Input() row: RowContentModel;
  status = Status;
  tableUsers: Observable<UserModel[]>;
  tableDefinition: TableDefinitionModel;
  @Output() close = new EventEmitter();
  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromTasks.TaskState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    console.log({tasl:this.task});
    console.log({row:this.row});
    this.store.pipe(
      select(fromTable.selectTableDefinition),
      takeUntil(this.ngOnDestroy$)
    )
      .subscribe((tableDefinition: TableDefinitionModel) => {
        if (tableDefinition) {
          this.tableDefinition = tableDefinition;
          this.dss.setTableUsers(this.tableDefinition.id);
        }
      });
    this.tableUsers = this.store.select(fromTable.selectTableUsers);
  }

  closeTaskTab() {
    this.close.emit();
  }

  onSaveRowNewTask(newTaskDetails: { name: string, description: string, status: Status }) {
    const task: TaskModel = {
      id: null,
      tableId: this.tableDefinition.id,
      name: newTaskDetails.name,
      description: newTaskDetails.description,
      status: newTaskDetails.status,
      userNames: [],
      taskDtos: []
    };
    this.dss.saveNewTask(this.tableDefinition.id, task, this.row.id);
  }

  onAssignUserToTask(username: string) {
    this.dss.onAssignUserToTask(this.tableDefinition.id, this.row.id, this.task.id, username);
  }

  onRemoveUserFromTask(username: string) {
    this.dss.onRemoveUserFromTask(this.tableDefinition.id, this.row.id, this.task.id, username);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
