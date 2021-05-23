import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RowContentModel, TableDefinitionModel, TablesDetails} from '../../shared/table.model';
import {EnumInfoModel, TableInfoModel} from '../../shared/statistics/table-info.model';
import {StatisticsUtils} from '../services/statistics.utils';
import {TasksInfoModel} from '../../shared/statistics/tasks-info.model';
import {EnumChart} from './charts.model';
import {filter, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";


@Component({
  selector: 'app-table-statistics',
  templateUrl: './table-statistics.component.html',
  styleUrls: ['./table-statistics.component.css']
})
export class TableStatisticsComponent implements OnInit, OnDestroy {
  @Input()
  tableHeaderState$: Observable<TableDefinitionModel>;
  @Input()
  tableContentState$: Observable<RowContentModel[]>;
  @Input()
  selectedTableName$: Observable<string>;
  @Input()
  tablesDetails$: TablesDetails[];
  @Output()
  setTableData = new EventEmitter<number>();
  tableInfo: TableInfoModel = null;
  tasksInfo: TasksInfoModel = null;
  enumCharts: EnumChart[] = [];

  private ngOnDestroy$ = new Subject();

  ngOnInit() {
    this.selectedTableName$
      .pipe(
        takeUntil(this.ngOnDestroy$),
        filter(tableName => !!tableName)
      )
      .subscribe((tableName: string) => {
        const tableDetails = this.tablesDetails$.find((tableDetails) => tableDetails.name === tableName);
        this.setTableData.emit(tableDetails.id);
      });
    this.tableContentState$
      .pipe(
        takeUntil(this.ngOnDestroy$),
        filter(tableContent => tableContent.length > 0)
      )
      .subscribe((tableContent: RowContentModel[]) => {
        this.tasksInfo = StatisticsUtils.mapToTaskInfo(tableContent);
        this.tableInfo = StatisticsUtils.mapToRowsInfo(tableContent);
        this.tableInfo.columnInfo.enumInfo.forEach((enumInfo: EnumInfoModel[], i) => {
          this.setEnumChart(enumInfo, i);
        });
      });
  }

  setEnumChart(enumInfos: EnumInfoModel[], i: number) {
    this.enumCharts[i] = {
      data: [],
      labels: [],
      chartType: (i % 2 === 0) ? 'doughnut' : 'bar',
      legend: true,
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: false,
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    };
    const enumValues = [];
    let columnNumber = null;
    enumInfos.forEach((enumInfo: EnumInfoModel) => {
      enumValues.push(enumInfo.sum);
      columnNumber = enumInfo.columnNumber;
      this.enumCharts[i].labels.push(enumInfo.name);
    });
    this.enumCharts[i].data.push({data: enumValues, label: 'ENUM ' + columnNumber});
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}

