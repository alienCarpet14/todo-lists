import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';
import { List } from './list';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-lists';

  constructor(private _listService: ListService) {}
  list;

  loadList() {
    this._listService.getList().subscribe(data => {
      this.list = data;
      console.log(this.list);
      this.list.forEach(element => { 
        console.log(element);
        
      });
    });
  }
}



