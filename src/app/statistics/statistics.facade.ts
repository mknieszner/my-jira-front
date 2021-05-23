import {Injectable} from "@angular/core";
import {StatisticsServiceModule} from "./statistics-service.module";
import {select, Store} from "@ngrx/store";
import * as fromAppReducers from "../shared/store/app.reducers";
import * as fromTable from "../shared/store/table";
import * as fromStatistics from "./store";
import {Observable} from "rxjs";
import {RowContentModel, TableDefinitionModel, TablesDetails} from "../shared/table.model";
import {TableState} from "../shared/store/table";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({
  providedIn: StatisticsServiceModule
})
export class StatisticsFacade {

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {}

  getTableDefinition$(): Observable<TableDefinitionModel> {
    return this.store.pipe(select(fromTable.selectTableDefinition));
  }

  getTableState$(): Observable<TableState> {
    return this.store.pipe(select(fromTable.selectState));
  }

  getTableContent$(): Observable<RowContentModel[]> {
    return this.store.pipe(select(fromTable.selectTableContent));
  }

  getSelectedTableName$(): Observable<string> {
    return this.store.pipe(select(fromStatistics.selectSelectedTableName));
  }

  getTableDetails$(): Observable<TablesDetails[]> {
    return this.store.pipe(select(fromTable.selectTableDetails));
  }

  setSelectedTableName(tableName: string): void {
    this.store.dispatch(new fromStatistics.SetSelectedTableName(tableName));
  }

  setTableData(tableId: number): void {
    this.dss.setTableRowsBy(tableId);
    this.dss.setTableHeaderBy(tableId);
  }



}
