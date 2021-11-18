import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { List } from './list';
import { Item } from './item';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor (
    private http: HttpClient  
  ) {}

  private API_URL: string =  'https://61899d92d0821900178d7a64.mockapi.io/todo-lists';

  getList(): Observable<List[]> {  
    return this.http.get<List[]>(this.API_URL);
  } 


  getListItems(a : number) : Observable<Item[]>{
    return this.http.get<Item[]>(this.API_URL + "/" + a + "/todo-items");
  }


  postItem(itemData, a){
    return this.http.post<Item[]>(this.API_URL + "/" + a + "/todo-items", itemData);
  }
 

}
