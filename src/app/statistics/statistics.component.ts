import {Component, OnInit} from '@angular/core';
import {COMMON_TABLE_ENVIRONMENT} from "../definition/definition.component"
import {TableState} from '../shared/store/table';
import {Observable} from 'rxjs/Observable';
import {RowContentModel, TableDefinitionModel, TablesDetails} from "../shared/table.model";
import {StatisticsFacade} from "./statistics.facade";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  tableState$: Observable<TableState>;
  tableContentState$: Observable<RowContentModel[]>;
  selectedTableName$: Observable<string>;
  tableHeaderState$: Observable<TableDefinitionModel>;
  tableDetails$: Observable<TablesDetails[]>;

  public COMMON_TABLE_ENVIRONMENT = COMMON_TABLE_ENVIRONMENT;

  constructor(private statisticsFacade: StatisticsFacade) {
  }

  ngOnInit() {
    this.tableHeaderState$ = this.statisticsFacade.getTableDefinition$();
    this.tableState$ = this.statisticsFacade.getTableState$();
    this.tableContentState$ = this.statisticsFacade.getTableContent$();
    this.selectedTableName$ = this.statisticsFacade.getSelectedTableName$();
    this.tableDetails$ = this.statisticsFacade.getTableDetails$();
  }

  onSelectTableName(tablesDetails: TablesDetails) {
    if (this.isSupported(tablesDetails)) {
      this.statisticsFacade.setSelectedTableName(tablesDetails.name);

    }
  }

  public isSupported(tablesDetails: TablesDetails): boolean {
    return tablesDetails.databaseEnvironment === COMMON_TABLE_ENVIRONMENT;
  }

  setTableData(tableId: number): void {
    this.statisticsFacade.setTableData(tableId);
  }
}
