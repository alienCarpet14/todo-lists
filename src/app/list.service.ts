import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { List } from './list';
import { Item } from './item';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor (
    private http: HttpClient   //You can then inject the HttpClient service as a dependency of an application class
  ) {}

  private _api: string =  'https://61899d92d0821900178d7a64.mockapi.io/todo-lists';

  getList(): Observable<List[]> {  
    return this.http.get<List[]>(this._api);
  } 
  getListItems(a : number) : Observable<Item[]>{
    return this.http.get<Item[]>(this._api + "/" + a + "/todo-items");
  }

  postItem(itemData, a){
    return this.http.post<any>(this._api + "/" + a + "/todo-items", itemData);
  }
 

  
}
