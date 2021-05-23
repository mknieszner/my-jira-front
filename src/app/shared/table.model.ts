export const options = [
  {shortcut: 'ST', name: 'Short text'},
  {shortcut: 'DE', name: 'Description'},
  {shortcut: 'DT', name: 'Date'},
  {shortcut: 'EN', name: 'Enum'},
  {shortcut: 'IN', name: 'Number'}
];

export class RowContentModel {
  public id: number;
  public name: string;
  public columnValueDtos: { [key: string]: { ['value']: string } }[];
  public createdBy: string;
  public createdOn: string; // TODO date?
  public lastModifiedBy: string;
  public lastModifiedOn: string; // TODO date?
  public taskDtos: TaskModel[];
}

export class TaskModel {
  public id: number;
  public tableId: number;
  public name: string;
  public description: string;
  public status: Status;
  public userNames: string[];
  public taskDtos: TaskModel[];
}

export enum Status {
  UNASSIGNED = 'UNASSIGNED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TableDefinitionModel {
  public id: number;
  public name: string;
  public columnDetailDefinitionDtoList: any[];
}

export interface ExtendedFilterModel { // TODO: Filter do poprawy (własciwe wartości)
  id: any;
  name: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  columnValueDtos: any[];
  taskDtos: any;
}

export interface TablesDetails {
  id: number;
  name: string;
  databaseEnvironment: string;
}
