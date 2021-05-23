import {Pipe, PipeTransform} from '@angular/core';
import {ExtendedFilterModel, RowContentModel} from '../table.model';

import {FilterUtils} from './filter.utils';

@Pipe({name: 'extendedFilter'})
export class ExtendedFilterPipe implements PipeTransform {

  transform(rows: RowContentModel[], extendedFilterContent: ExtendedFilterModel, filterSelect: boolean) {
    return rows.filter(row => FilterUtils.runExtendedRowFilter(row, extendedFilterContent, filterSelect));
  }
}
