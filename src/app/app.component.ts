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
  isPageLoaded: boolean = true; //change to false

  constructor(private _listService: ListService) {}
  lists: List[];

  //use another hook?
  // ngAfterViewInit() {
  //   this.isPageLoaded = true;
  // }
  loadList() {
    this._listService.getList().subscribe((data) => {
      this.lists = data;
    });
  }
}
