import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

 

   /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
    transform(items: Item[], searchText: string): any[] {
      if (!items) {
        return [];
      }
      if (!searchText) {
        return items;
      }
      searchText = searchText.toLocaleLowerCase();
  
      return items.filter(item => {
        // console.log(it);
        return item['title'].toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 ;
      });
    }

}
