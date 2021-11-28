import { Component } from '@angular/core';
import { List } from './list';
import { ListService } from './list.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-lists';

  constructor(private _listService: ListService) {}
  lists: List[];

  loadList() {
    this._listService.getList().subscribe(data => {
      this.lists = data;
    });
  }
}



