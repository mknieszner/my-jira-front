import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  ExtendedFilterModel,
  RowContentModel,
  TableDefinitionModel,
  TablesDetails,
  TaskModel
} from '../shared/table.model';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from '../shared/data-storage.service';
import * as fromAppReducers from '../shared/store/app.reducers';
import * as fromTasks from '../shared/store/task';
import * as fromTable from '../shared/store/table';
import {SortModel} from '../shared/sort/sort.model';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
  tableState$: Observable<fromTable.TableState>;

  detailsRow: RowContentModel;
  rowDetailsVisible: boolean;

  taskDetails: TaskModel;
  taskDetailsVisible: boolean;

  tableDefinition: TableDefinitionModel;
  extendedFilterContent: ExtendedFilterModel;
  filterSelect: boolean;
  sortContentValue: SortModel;

  showSpinner = true;
  private ngOnDestroy$ = new Subject();
  extendedTableView: boolean;
  sortContent: SortModel;
  extendedFilterMode: boolean;


  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.setTablesDetails();
    this.tableState$ = this.store.pipe(select(fromTable.selectState));
    this.tableState$
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((state) => {
        this.tableDefinition = state.tableDefinition;
        this.extendedFilterContent = state.extendedFilterContent;
        this.filterSelect = state.filterSelect;
        this.sortContentValue = state.sortContent;
        this.extendedFilterMode = state.extendedFilterMode;
        this.extendedTableView = state.extendedTableView;
        this.showSpinner = false;
      });
  }

  setTable(tablesDetails: TablesDetails) {
    this.showSpinner = true;
    this.dss.setTableHeaderBy(tablesDetails.id);
    this.dss.setTableRowsBy(tablesDetails.id);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new fromTasks.ResetTaskStore());
    this.store.dispatch(new fromTable.SwitchTableReset());
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

  showRowDetails(row: RowContentModel = null) {
    this.rowDetailsVisible = true;
    this.detailsRow = row;
  }

  hideRowDetails() {
    this.rowDetailsVisible = false;
    this.detailsRow = null;
  }

  showTaskDetails(task: TaskModel) {
    console.log({task})
    this.taskDetails = task;
    this.taskDetailsVisible = true;
  }

  hideTaskDetails() {
    this.taskDetails = null;
    this.taskDetailsVisible = false;
  }
}
