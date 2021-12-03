import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import {MatDialog, MatDialogConfig} from "@angular/material";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { NewItemFormComponent } from '../new-item-form/new-item-form.component';
import { DatePipe } from '@angular/common';
import { Item } from '../item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  private sub: any;
  //properties pre filtrovanie zobrazenia todo-itemov
  searchText: string; // vyhľadávanie / filtrovanie podľa textu
  filterStatus: string; // completed? true : false

  id; // id of todo-list
  item; // todo-item instance

  constructor(
    private _listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private datepipe: DatePipe
  ) {}

  openDialog() {
    this.dialog.open(NewItemFormComponent, {
      data: this.id,
    });
    // window.location.reload();  //reload stranky
  }

  showItemDetail() {}
  deleteItem(list_id: number, item_id: number) {
    let sub = this._listService
      .deleteItem(list_id, item_id)
      .subscribe(() => console.log('Delete successful'));
    sub.unsubscribe;
  }

  // TODO:
  toggleCompleted(
    list_id: number,
    item_id: number,
    item: Item,
    isCompleted: boolean
  ) {
    let body: JSON;
    // isCompleted = true;
    console.log(isCompleted);
    body = JSON.parse(String(isCompleted));
    console.log(body);
    item.completed = isCompleted;
    // body = JSON.
    let sub = this._listService
      .putItem(list_id, item_id, item)
      .subscribe((data) => console.log('Success\n' + data));
  }
  formatDate(dateString: string) {
    return this.datepipe.transform(dateString, 'shortDate');
  }
  stringDateFormat(dateString: string) {
    let dateFormat = 'en-GB';
    let date = new Date(dateString);
    date.toLocaleDateString(dateFormat);
    return date;
  }

  //ziskanie id listu z url a nacitanie todo-itemov pre dany list
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.id = parseInt(this.id);
    this.loadListItems(this.id);
  }

  //nacitanie todo-itemov pre dany list
  loadListItems(listId: number) {
    this.sub = this._listService.getListItems(listId).subscribe((data) => {
      this.item = data;
      console.log(this.item);
      // this.item.forEach(element => {
      //   console.log(element.deadline)
      //   element.deadline |  DatePipe['shortDate'];
      //   let date = new Date(element.deadline);
      //   date.toLocaleDateString('short');
      //   console.log(date);
      //   console.log(element);
      //   console.log(element.deadline)
      // });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
