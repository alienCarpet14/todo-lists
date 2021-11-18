import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  
   /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
    

  transform(items: Item[], status: string): any[] {
    if (!items) {
      return [];
    }
    if (!status) {
      return items;
    }

    status = status.toLocaleLowerCase();

    return items.filter(item => {
      return String(item['completed']).toLocaleLowerCase().indexOf(status.toLocaleLowerCase()) !== -1 ;
    });
  }


}
