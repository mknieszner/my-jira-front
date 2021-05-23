import {RowContentModel} from '../table.model';

export interface TableInfoModel {
  rows: RowContentModel[];
  doneRows: RowContentModel[];
  undoneRows: RowContentModel[];
  columnInfo: ColumnInfoModel;
}

export interface ColumnInfoModel {
  numberInfo: NumberInfoModel[];
  enumInfo: EnumInfoModel[][];
  dateInfo: DateInfoModel[];
  shortTextInfo: ShortTextInfoModel[];
  descriptionInfo: DescriptionInfoModel[];
}

export interface NumberInfoModel {
  columnNumber: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
}

export interface EnumInfoModel {
  columnNumber: number;
  name: string;
  sum: number;
}

export interface DateInfoModel {
  columnNumber: number;
  min: number;
  max: number;
}

export interface ShortTextInfoModel {
  columnNumber: number;
  avgLength: number;
}

export interface DescriptionInfoModel {
  columnNumber: number;
  avgLength: number;
}
