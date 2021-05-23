import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RowContentModel, TableDefinitionModel, TaskModel} from '../../../shared/table.model';
import {DataStorageService} from '../../../shared/data-storage.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Question} from '../row/value-types/question-base.model';
import {Subject} from "rxjs";
import {QuestionControlUtils} from "../row/question-control.utils";
import {RowDetailsMode} from "../../model/row-details.mode";

@Component({
  selector: 'app-row-details',
  templateUrl: './row-details.component.html',
  styleUrls: ['./row-details.component.css']
})
export class RowDetailsComponent implements OnInit, OnDestroy {
  @Input() row: RowContentModel;
  @Input() tableDefinition: TableDefinitionModel;
  mode: RowDetailsMode;
  RowDetailsMode = RowDetailsMode;
  rowForm: FormGroup;
  selectedTask: TaskModel = null;
  extendedRowView: boolean = false;

  @Output() close = new EventEmitter();
  @Output() displayTaskDetails = new EventEmitter<TaskModel>();
  private ngOnDestroy$ = new Subject();

  constructor(private dss: DataStorageService) {
  }

  ngOnInit() {
    this.mode = this.row ? RowDetailsMode.DISPLAY : RowDetailsMode.EDIT;
    this.createForm();
  }

  private createForm() {
    if (this.row) {
      this.createUpdateRowForm(this.row);
    } else {
      this.createNewRowForm();
    }
  }

  createNewRowForm() {
    this.rowForm =
      new FormGroup({
        'id': new FormControl(),
        'name': new FormControl(),
        'createdBy': new FormControl(),
        'createdOn': new FormControl(),
        'lastModifiedBy': new FormControl(),
        'lastModifiedOn': new FormControl(),
        'columnValueDtos': new FormArray([]),
        'taskDtos': new FormArray([])
      });
    this.tableDefinition.columnDetailDefinitionDtoList.forEach((column) => {
      (<FormArray>this.rowForm.get('columnValueDtos')).push(
        QuestionControlUtils.toFormGroup([new Question({key: column.type, value: ''})])
      );
    });
  }

  createUpdateRowForm(row) {
    this.rowForm =
      new FormGroup({
        'id': new FormControl(row.id),
        'name': new FormControl(row.name),
        'createdBy': new FormControl(row.createdBy),
        'createdOn': new FormControl(row.createdOn),
        'lastModifiedBy': new FormControl(row.lastModifiedBy),
        'lastModifiedOn': new FormControl(row.lastModifiedOn),
        'columnValueDtos': new FormArray([]),
        'taskDtos': new FormArray([])
      });

    (row.columnValueDtos || []).forEach((cell) => {
      (<FormArray>this.rowForm.get('columnValueDtos')).push(
        QuestionControlUtils.toFormGroup([new Question({
          key: Object.keys(cell),
          value: cell[Object.keys(cell)[0]].value
        })])
      );
    });
    (row.taskDtos || []).forEach(() => {
      (<FormArray>this.rowForm.get('taskDtos')).push(
        new FormGroup({
          'id': new FormControl(),
          'name': new FormControl(),
          'description': new FormControl(),
          'status': new FormControl(),
          'userNames': new FormArray([]),
          'taskDtos': new FormArray([])
        })
      );
    });
  }

  closeEditTab() {
    this.close.emit();
  }

  onSaveUpdatedRow() {
    this.dss.updateRow(this.tableDefinition.id, mapForm(this.rowForm.value));
    this.closeEditTab();

    function mapForm(formValue) { //TODO remove?
      formValue.columnValueDtos.forEach((value, i) => {
        if (Object.keys(value[Object.keys(value)[0]])[0] !== 'value') {
          const mappedColumnValue = {};
          mappedColumnValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
          formValue.columnValueDtos[i] = mappedColumnValue;
        }
      });
      return formValue;
    }
  }

  onSaveNewRow() {
    const newRow = this.mapNewRow();
    this.dss.addNewRow(this.tableDefinition.id, newRow);
    this.closeEditTab()
  }

  mapNewRow() {
    const newRow = this.rowForm.value;
    const mapedNewRow = {
      id: this.rowForm.value.id,
      name: this.rowForm.value.name,
      createdBy: this.rowForm.value.createdBy,
      createdOn: this.rowForm.value.createdOn,
      lastModifiedBy: this.rowForm.value.lastModifiedBy,
      lastModifiedOn: this.rowForm.value.lastModifiedOn,
      columnValueDtos: [],
      taskDtos: []
    };

    newRow.columnValueDtos.forEach(value => {
      const newValue = {};
      newValue[Object.keys(value)[0]] = {value: value[Object.keys(value)[0]]};
      mapedNewRow.columnValueDtos.push(newValue);
    });

    return mapedNewRow;
  }

  toggleMode() {
    this.mode = this.mode === RowDetailsMode.EDIT ? RowDetailsMode.DISPLAY : RowDetailsMode.EDIT;
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

  onAddTask() {
    this.displayTaskDetails.emit();
  }

  onShowTask(task: TaskModel) {
    this.selectedTask = task;
  }

  onShowTaskDetails(task: TaskModel) {
    this.displayTaskDetails.emit(task);
  }

  onDeleteRow() {
    this.dss.deleteRow(this.tableDefinition.id, this.row.id);
  }

  onDeleteTask(taskId: number) {
    this.dss.deleteTask(this.tableDefinition.id, taskId, this.row.id);
  }

  toggleExtendedRowView() {
    this.extendedRowView = !this.extendedRowView
  }

}
