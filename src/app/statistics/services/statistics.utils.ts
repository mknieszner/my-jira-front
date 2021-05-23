import {RowContentModel, Status, TaskModel} from '../../shared/table.model';
import {
  ColumnInfoModel, DescriptionInfoModel, EnumInfoModel, NumberInfoModel, ShortTextInfoModel,
  TableInfoModel
} from '../../shared/statistics/table-info.model';

export abstract class StatisticsUtils {
  static mapToRowsInfo(rowList: RowContentModel[]): TableInfoModel {
    const rows: RowContentModel[] = [];
    const doneRows: RowContentModel[] = [];
    const undoneRows: RowContentModel[] = [];
    const columnInfo: ColumnInfoModel = {
      numberInfo: [],
      enumInfo: [],
      dateInfo: [],
      shortTextInfo: [],
      descriptionInfo: []
    };
    let numberInfoIndex = 0;
    let enumInfoIndex = 0;
    let dateInfoIndex = 0;
    let shortTextIndex = 0;
    let descriptionInfoIndex = 0;

    rowList.forEach((row: RowContentModel, rowIdx) => {
      rows.push(row);
      if (this.containsUndoneTasks(row)) {
        doneRows.push(row);
      } else {
        undoneRows.push(row);
      }
      row.columnValueDtos.forEach((value, j) => { // TODO ZASTĄPIć J ARRAY_LENGTH+1  => USUNAC CLEAN ARRAY
        const string = Object.keys(value)[0];
        if (string === 'IN') { // TODO if index==0 podstaw do obu (min i max) i zamien <=, >= na <,>
          if (typeof columnInfo.numberInfo[j] === 'undefined') { // TODO only undefined??
            columnInfo.numberInfo[j] = {
              columnNumber: j,
              sum: 0,
              avg: 0,
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY
            };
          }
          columnInfo.numberInfo[j].sum += parseFloat(value[Object.keys(value)[0]].value);
          columnInfo.numberInfo[j].avg += parseFloat(value[Object.keys(value)[0]].value);
          if (columnInfo.numberInfo[j].min >= parseFloat(value[Object.keys(value)[0]].value)) {
            columnInfo.numberInfo[j].min = parseFloat(value[Object.keys(value)[0]].value);
          }
          if (columnInfo.numberInfo[j].max <= parseFloat(value[Object.keys(value)[0]].value)) {
            columnInfo.numberInfo[j].max = parseFloat(value[Object.keys(value)[0]].value);
          }
          numberInfoIndex++;
          return;
        } else if (string === 'EN') {
          if (typeof columnInfo.enumInfo[j] === 'undefined') { // todo only undefined???
            columnInfo.enumInfo[j] = [];
          }
          let exist = false;

          columnInfo.enumInfo[j].forEach((columnStats: EnumInfoModel, columnInfoIdx) => {
            if (columnStats.name === value[Object.keys(value)[0]].value) {
              columnInfo.enumInfo[j][columnInfoIdx].sum++;
              exist = true;
            }
          });

          if (!exist) {
            columnInfo.enumInfo[j][rowIdx] = {columnNumber: j, name: value[Object.keys(value)[0]].value, sum: 1};
          }

          enumInfoIndex++;
          return;
        } else if (string === 'DT') {
          if (typeof columnInfo.dateInfo[j] === 'undefined') { // TODO only undefined??
            columnInfo.dateInfo[j] = {
              columnNumber: j,
              min: Date.parse(new Date(8640000000000000).toString()),
              max: Date.parse(new Date(-8640000000000000).toString())
            };
          }

          if (columnInfo.dateInfo[j].min >= Date.parse(value[Object.keys(value)[0]].value)) {
            columnInfo.dateInfo[j].min = Date.parse(value[Object.keys(value)[0]].value);
          }

          if (columnInfo.dateInfo[j].max <= Date.parse(value[Object.keys(value)[0]].value)) {
            columnInfo.dateInfo[j].max = Date.parse(value[Object.keys(value)[0]].value);
          }
          dateInfoIndex++;
          return;
        } else if (string === 'ST') {
          if (typeof columnInfo.shortTextInfo[j] === 'undefined') { // TODO only undefined??
            columnInfo.shortTextInfo[j] = {columnNumber: j, avgLength: 0};
          }

          columnInfo.shortTextInfo[j].avgLength += value[Object.keys(value)[0]].value.length;
          shortTextIndex++;
          return;
        } else if (string === 'DE') {
          if (typeof columnInfo.descriptionInfo[j] === 'undefined') { // TODO only undefined??
            columnInfo.descriptionInfo[j] = {columnNumber: j, avgLength: 0};
          }
          columnInfo.descriptionInfo[j].avgLength += value[Object.keys(value)[0]].value.length;
          descriptionInfoIndex++;
          return;
        }
      });
    });

    columnInfo.numberInfo.forEach((value: NumberInfoModel, i) => {
      columnInfo.numberInfo[i]['avg'] = value.avg / rows.length;
    });

    columnInfo.shortTextInfo.forEach((value: ShortTextInfoModel, i) => {
      columnInfo.shortTextInfo[i].avgLength = value.avgLength / rows.length;
    });

    columnInfo.descriptionInfo.forEach((value: DescriptionInfoModel, i) => {
      columnInfo.descriptionInfo[i].avgLength = value.avgLength / rows.length;
    });

    return {rows: rows, doneRows: doneRows, undoneRows: undoneRows, columnInfo: StatisticsUtils.cleanColumnInfo(columnInfo)};
  }

  static cleanColumnInfo(columnInfo): ColumnInfoModel {
    const cleanColumnInfo: ColumnInfoModel = {
      dateInfo: [],
      shortTextInfo: [],
      enumInfo: [],
      numberInfo: [],
      descriptionInfo: []
    };
    cleanColumnInfo.dateInfo = StatisticsUtils.cleanArray(columnInfo.dateInfo);
    cleanColumnInfo.shortTextInfo = StatisticsUtils.cleanArray(columnInfo.shortTextInfo);
    cleanColumnInfo.enumInfo = StatisticsUtils.cleanArray(columnInfo.enumInfo);
    cleanColumnInfo.numberInfo = StatisticsUtils.cleanArray(columnInfo.numberInfo);
    cleanColumnInfo.descriptionInfo = StatisticsUtils.cleanArray(columnInfo.descriptionInfo);
    return cleanColumnInfo;
  }

  static cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
      if (typeof actual[i] !== 'undefined') { // TODO only undefined??
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }


  static containsUndoneTasks(row: RowContentModel) {
    let rowStatus = true;
    row.taskDtos.forEach((task: TaskModel) => {
      if (task.status.toString() !== 'DONE') {
        rowStatus = false;
      }
    });
    return rowStatus;
  }

  static mapToTaskInfo(rows: RowContentModel[]): { tasks, unassignedTasks, assignedTasks, inProgressTasks, doneTasks } {
    const tasks: TaskModel[] = [];
    const unassignedTasks: TaskModel[] = [];
    const assignedTasks: TaskModel[] = [];
    const inProgressTasks: TaskModel[] = [];
    const doneTasks: TaskModel[] = [];

    rows.forEach((row) => {
      row.taskDtos.forEach((task: TaskModel) => {
        switch (task.status) {
          case (Status.UNASSIGNED):
            tasks.push(task);
            unassignedTasks.push(task);
            return;
          case (Status.ASSIGNED):
            tasks.push(task);
            assignedTasks.push(task);
            return;
          case (Status.IN_PROGRESS):
            tasks.push(task);
            inProgressTasks.push(task);
            return;
          case (Status.DONE):
            tasks.push(task);
            doneTasks.push(task);
            return;
          default:
            throw new Error('Unknown task status: ' + task.status);
        }
      });
    });
    return {
      tasks: tasks,
      unassignedTasks: unassignedTasks,
      assignedTasks: assignedTasks,
      inProgressTasks: inProgressTasks,
      doneTasks: doneTasks
    };
  }

}
