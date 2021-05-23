import {ExtendedFilterModel, RowContentModel} from '../table.model';
import {Injectable} from '@angular/core';

@Injectable()
export class FilterUtils {
  constructor() {

  }

  static runExtendedRowFilter(row: RowContentModel, filter, filterSelect: boolean): boolean {
    if (this.isEmptyFilter(filter)) {
      return true;
    } else {
      if (filterSelect) {
        return this.anyFilter(row, filter);
      } else {
        return FilterUtils.andFilter(row, filter);
      }
    }
  }

  static andFilter(row: RowContentModel, filter): boolean {
    if (!FilterUtils.containsAll(row.id, filter.id)) {
      return false;    }
    if (!FilterUtils.containsAll(row.name || '', filter.name)) {
      return false;  }
    if (!FilterUtils.containsAll(row.createdOn, filter.createdOn)) {
      return false;    }
    if (!FilterUtils.containsAll(row.createdBy, filter.createdBy)) {
      return false;    }
    if (!FilterUtils.containsAll(row.lastModifiedOn, filter.lastModifiedOn)) {
      return false;    }
    if (!FilterUtils.containsAll(row.lastModifiedBy, filter.lastModifiedBy)) {
      return false;    }
    if (!FilterUtils.containsAll(row.taskDtos.length, filter.taskDtos)) {
      return false;    }
    for (let i = 0; i < row.columnValueDtos.length; i++) {
        if (!FilterUtils.containsAll(FilterUtils.getMappedValue(row.columnValueDtos[i]), filter.columnValueDtos[i].value)) {
          return false;
        }
      }
    return true;
  }

  static containsAll(rowValue, filterValue): boolean {
    if (!filterValue) {
      return true;
    }
    return rowValue.toString().includes(filterValue);
  }


  static anyFilter(row: RowContentModel, filter): boolean {
    let condition = true;

    if (FilterUtils.containsAny(row.id, filter.id)) {
      condition = false;
    }
    if (FilterUtils.containsAny(row.name || '', filter.name)) {
      condition = false;
    }
    if (FilterUtils.containsAny(row.createdOn, filter.createdOn)) {
      condition = false;
    }
    if (FilterUtils.containsAny(row.createdBy, filter.createdBy)) {
      condition = false;
    }
    if (FilterUtils.containsAny(row.lastModifiedOn, filter.lastModifiedOn)) {
      condition = false;
    }
    if (FilterUtils.containsAny(row.lastModifiedBy, filter.lastModifiedBy)) {
      condition = false;
    }
    if (row.taskDtos.length === filter.taskDtos) {
      condition = false;
    }
    row.columnValueDtos.forEach((value, i) => {
      if (FilterUtils.containsAny(FilterUtils.getMappedValue(value), filter.columnValueDtos[i].value)) {
        condition = false;
      }
    });
    return !condition;
  }

  static runFilterTable(row: RowContentModel, filter: string): boolean { // TODO extend filter to unmodifiable fields
    let condition = false;
    row.columnValueDtos.forEach(value => {
      if (FilterUtils.containsAny(FilterUtils.getMappedValue(value), filter)) {
        condition = true;
      }
    });
    return condition;
  }

  static containsAny(rowValue, filterValue): boolean {
    if (!filterValue) {
      return false;
    }
    return rowValue.toString().includes(filterValue);
  }

  static getMappedValue(object): string {
    return object[Object.keys(object)[0]].value.toString();
  }

  static isEmptyFilter(filter: ExtendedFilterModel): boolean {
    let isFilterEmpty = true;
    if (!filter) {
      return true;
    }
    if (filter.id) {
      isFilterEmpty = false;
    }
    if (filter.name) {
      isFilterEmpty = false;
    }
    if (filter.createdOn) {
      isFilterEmpty = false;
    }
    if (filter.createdBy) {
      isFilterEmpty = false;
    }
    if (filter.lastModifiedOn) {
      isFilterEmpty = false;
    }
    if (filter.lastModifiedBy) {
      isFilterEmpty = false;
    }
    if (filter.taskDtos) {
      isFilterEmpty = false;
    }
    filter.columnValueDtos.forEach((value) => {
      if (value.value) {
        isFilterEmpty = false;
      }
    });
    return isFilterEmpty;

  }
}
