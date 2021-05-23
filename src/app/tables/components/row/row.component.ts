import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RowContentModel} from '../../../shared/table.model';
import {Question} from './value-types/question-base.model';
import {Observable} from 'rxjs/Observable';
import {TableState} from '../../../shared/store/table';
import {FilterUtils} from '../../../shared/filter/filter.utils';
import {map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {QuestionControlUtils} from "./question-control.utils";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit, OnDestroy {
  @Input() row: RowContentModel;
  @Input() tableState$: Observable<TableState>;
  @Output() editRow = new EventEmitter();
  rowFilterState: boolean;

  rowForm: FormGroup;
  private ngOnDestroy$ = new Subject();

  ngOnInit() {
    this.initForm();
    this.tableState$
      .pipe(
        takeUntil(this.ngOnDestroy$),
        map(tableState => tableState.tableFilter)
      )
      .subscribe(filter => {
        if (filter !== '') {
          this.rowFilterState = FilterUtils.runFilterTable(this.row, filter);
        } else {
          this.rowFilterState = true;
        }
      });
  }


  private initForm() {
    this.rowForm =
      new FormGroup({
        'id': new FormControl(this.row.id),
        'name': new FormControl(this.row.name),
        'createdBy': new FormControl(this.row.createdBy),
        'createdOn': new FormControl(this.row.createdOn),
        'lastModifiedBy': new FormControl(this.row.lastModifiedBy),
        'lastModifiedOn': new FormControl(this.row.lastModifiedOn),
        'columnValueDtos': new FormArray([])
      });

    this.row.columnValueDtos.forEach((cell) => {
      (<FormArray>this.rowForm.get('columnValueDtos')).push(
        QuestionControlUtils.toFormGroup([new Question({key: Object.keys(cell), value: this.getMappedValue(cell)})])
      );
    });
  }

  onEditForm() {
    this.editRow.emit();
  }

  private getMappedValue(object): string {
    return object[Object.keys(object)[0]].value.toString();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
