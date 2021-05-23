import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExtendedFilterModel, TableDefinitionModel} from '../../../shared/table.model';
import {Store} from '@ngrx/store';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {SortModel} from '../../../shared/sort/sort.model';
import * as fromTable from "../../../shared/store/table";
import {Subject} from "rxjs";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit, OnDestroy {
  @Input() tableDefinition: TableDefinitionModel;
  @Input() extendedFilterMode: boolean;
  @Input() extendedTableView: boolean;
  @Input() sortContent: SortModel;
  filterForm: FormGroup;

  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromTable.TableState>) {
  }

  ngOnInit() {
    if (this.extendedFilterMode && this.tableDefinition) {
      this.setForm();
    } else {
      this.filterForm = null;
      this.extendedFilterMode = false;
    }
  }

  setForm() {
    this.filterForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'createdBy': new FormControl(),
      'createdOn': new FormControl(),
      'lastModifiedBy': new FormControl(),
      'lastModifiedOn': new FormControl(),
      'columnValueDtos': new FormArray([]),
      'taskDtos': new FormControl()
    });

    this.tableDefinition.columnDetailDefinitionDtoList.forEach(() => { // (cell, i) => {
      (<FormArray>this.filterForm.get('columnValueDtos')).push(new FormGroup({
        'value': new FormControl()
      }));
    });
  }

  getFormValues(): ExtendedFilterModel {
    return this.filterForm.value;
  }

  onRunExtendedFilter() {
    this.store.dispatch(new fromTable.SetExtendedFilter(this.getFormValues()));
  }

  sort(payload: SortModel) {
    this.store.dispatch(new fromTable.SetSortContent(payload));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
