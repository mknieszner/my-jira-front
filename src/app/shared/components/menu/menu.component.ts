import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {select, Store} from '@ngrx/store';
import * as fromAppReducers from '../../store/app.reducers';
import * as fromTable from '../../store/table';
import {Observable} from 'rxjs/Observable';
import {TablesDetails} from "../../table.model";
import {ConstantsService} from "../../constants.service";
import {DataStorageService} from "../../data-storage.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() parent: string;
  @Output() chosenNameChanged = new Subject<TablesDetails>();
  @Output() addNewRow = new EventEmitter();
  tablesDetails: TablesDetails[];

  chosenName: string;
  extendedFilterMode: Observable<boolean>;
  extendedTableView: Observable<boolean>;
  extendedTableViewValue: boolean;
  extendedFilterModeValue: boolean;

  private ngOnDestroy$ = new Subject();

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService,
              public constants: ConstantsService) {
  }

  setFilterSelectValue(value: boolean) {
    this.store.dispatch(new fromTable.SetExtendedFilterSelect(value));
  }

  ngOnInit() {
    this.store
      .pipe(
        select(fromTable.selectTableDetails),
        takeUntil(this.ngOnDestroy$))
      .subscribe((details) => {
        this.tablesDetails = details;
      });
    this.extendedFilterMode = this.store.pipe(select(fromTable.selectExtendedFilterMode));
    this.extendedFilterMode
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((filterModeValue => {
        this.extendedFilterModeValue = filterModeValue;
      }));
    this.extendedTableView = this.store.pipe(select(fromTable.selectExtendedTableView));
    this.extendedTableView
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((value) => {
        this.extendedTableViewValue = value;
      });
  }

  onChooseName(tableName: string) {
    this.chosenName = tableName;
    const tableDetails = this.tablesDetails.find((tableDetails) => tableDetails.name === tableName);
    this.chosenNameChanged.next(tableDetails);
  }

  onFilter(filter) {
    this.store.dispatch(new fromTable.TableFilter(filter));
  }

  onNewRow() {
    this.addNewRow.emit();
  }

  switchExtendedTableView() {
    if (this.extendedFilterModeValue && this.extendedTableViewValue) {
      this.onExtendedFilterMode()
    }
    this.store.dispatch(new fromTable.SetExtendedTableView(!this.extendedTableViewValue));
  }

  onExtendedFilterMode() {
    this.store.dispatch(new fromTable.SetExtendedFilterMode(!this.extendedFilterModeValue));
  }

  deleteTable(tableId: number) {
    this.dss.deleteProject(tableId);
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
