import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item';

@Pipe({
  name: 'filter'
})
//filtering items whether finished or unfinished
export class FilterPipe implements PipeTransform {

  
   /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
    

  transform(items: Item[], itemCompleted: string): any[] {
    if (!items) {
      return [];
    }
    if (!itemCompleted) {
      return items;
    }

    itemCompleted = itemCompleted.toLocaleLowerCase();

    return items.filter(item => {
      return String(item['completed']).toLocaleLowerCase().indexOf(itemCompleted.toLocaleLowerCase()) !== -1 ;
    });
  }


}
