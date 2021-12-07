import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { List } from './list';
import { Item } from './item';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  private API_URL: string = environment.API_URL;

  getList(): Observable<List[]> {
    return this.http.get<List[]>(this.API_URL);
  }

  getListItems(list_id: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL + list_id + '/todo-items');
  }

  postItem(itemData, list_id) {
    return this.http.post<Item[]>(
      this.API_URL + list_id + '/todo-items',
      itemData
    );
  }

  //used in changing item.completed boolean value
  putItem(list_id: number, item_id: number, itemData) {
    //  { title: 'Angular PUT Request Example' };
    return this.http.put<Item>(
      this.API_URL + list_id + '/todo-items/' + item_id,
      itemData
    );
  }

  deleteItem(list_id, item_id) {
    return this.http.delete(`${this.API_URL}${list_id}/todo-items/${item_id}`);
  }
}
