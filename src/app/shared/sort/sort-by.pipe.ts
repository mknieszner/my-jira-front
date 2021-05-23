import {Pipe, PipeTransform} from '@angular/core';
import {RowContentModel} from '../table.model';
import {SortModel} from './sort.model';

@Pipe({name: 'orderBy'})
export class SortByPipe implements PipeTransform {

  transform(rows: RowContentModel[], sortContent: SortModel): RowContentModel[] {
    if (sortContent == null) {
      return rows;
    } else {
      switch (sortContent.dataType) {
        case 'ST':
        case 'DE':
        case 'EN':
          return this.textSort(rows, sortContent.asc, sortContent.name, sortContent.index);
        case 'IN':
          return this.numberSort(rows, sortContent.asc, sortContent.name, sortContent.index);
        case 'DT':
          return this.dateSort(rows, sortContent.asc, sortContent.name, sortContent.index);
        default:
          return rows;
      }
    }
  }

  textSort(rows: RowContentModel[], asc: boolean, name: string, index: number): RowContentModel[] {
    switch (name) {
      case 'id':
        return this.sortNumber(rows, name, index, asc); // TODO toremove?
      case 'name':
        return this.sortText(rows, name, index, asc);
      case 'createdBy':
        return this.sortText(rows, name, index, asc);
      case 'createdOn':
        return this.sortDate(rows, name, index, asc); // TODO toremove?
      case 'lastModifiedBy':
        return this.sortText(rows, name, index, asc);
      case 'lastModifiedOn':
        return this.sortDate(rows, name, index, asc); // todo toremove?
      case 'taskDtos':
        return this.sortByArrayLength(rows, name, index, asc); // todo toremove?
      case 'column':
        return this.sortText(rows, name, index, asc);
    }
  }

  numberSort(rows: RowContentModel[], asc: boolean, name: string, index: number): RowContentModel[] {
    switch (name) {
      case 'id':
        return this.sortNumber(rows, name, index, asc);
      case 'name':
        return this.sortText(rows, name, index, asc); // todo toremove?
      case 'createdBy':
        return this.sortText(rows, name, index, asc); // todo toremove?
      case 'createdOn':
        return this.sortDate(rows, name, index, asc); // todo toremove?
      case 'lastModifiedBy':
        return this.sortText(rows, name, index, asc); // todo toremove?
      case 'lastModifiedOn':
        return this.sortDate(rows, name, index, asc); // todo toremove?
      case 'taskDtos':
        return this.sortByArrayLength(rows, name, index, asc);
      case 'column':
        return this.sortNumber(rows, name, index, asc);
    }
  }

  dateSort(rows: RowContentModel[], asc: boolean, name: string, index: number): RowContentModel[] {
    switch (name) {
      case 'id':
        return this.sortNumber(rows, name, index, asc);
      case 'name':
        return this.sortText(rows, name, index, asc);
      case 'createdBy':
        return this.sortText(rows, name, index, asc);
      case 'createdOn':
        return this.sortDate(rows, name, index, asc); // todo toremove?
      case 'lastModifiedBy':
        return this.sortText(rows, name, index, asc);
      case 'lastModifiedOn':
        return this.sortDate(rows, name, index, asc); // todo toremove?
      case 'taskDtos':
        return this.sortByArrayLength(rows, name, index, asc);
      case 'column':
        return this.sortDate(rows, name, index, asc);
    }
  }

  sortText(rows: RowContentModel[], field: string, index: number, asc: boolean) {
    if (field !== 'column') {
      rows.sort((a, b) => {
        return a[field].localeCompare(b[field]);
      });
    } else {
      rows.sort((a, b) => {
        return a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value
          .localeCompare(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
      });
    }
    if (!asc) {
      return rows;
    } else {
      return rows.reverse();
    }
  }

  sortNumber(rows: RowContentModel[], field: string, index: number, asc: boolean): RowContentModel[] {
    if (field !== 'column') {
      rows.sort((a, b) => {
        return a[field] - b[field];
      });
    } else {
      rows.sort((a, b) => {
        return parseInt(a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value, 0)
          - parseInt(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value, 0);
      });
    }
    return asc ? rows : rows.reverse();
  }

  sortByArrayLength(rows: RowContentModel[], field: string, index: number, asc: boolean): RowContentModel[] {
    rows.sort((a, b) => {
      return a[field].length - b[field].length;
    });
    return asc ? rows : rows.reverse();
  }

  sortDate(rows: RowContentModel[], field: string, index: number, asc: boolean): RowContentModel[] {
    if (field !== 'column') {
      rows.sort((a, b) => {
        return Date.parse(a[field]) - Date.parse(b[field]);
      });
    } else {
      rows.sort((a, b) => {
        return Date.parse(a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value)
          - Date.parse(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
      });
    }
    return asc ? rows : rows.reverse();
  }
}
