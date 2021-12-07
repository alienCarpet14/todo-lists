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
import { isDefined } from '@angular/compiler/src/util';

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

  list_id; // id of todo-list
  items: Item[]; // array of todo-item objects

  constructor(
    private _listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private datepipe: DatePipe
  ) {}

  // public trackItem(index: number, item: Item) {
  //   return item.id;
  // }

  openDialog() {
    this.dialog.open(NewItemFormComponent, {
      data: this.list_id,
    });
    // window.location.reload();  //reload stranky
  }

  //pomocna premmenna na ukladanie otvoreneho itemu
  itemId: number = 0;
  itemDetailDisplayed;
  showItemDetail(itemId: number) {
    console.log(
      document.getElementById(String(itemId))!.previousElementSibling
    );

    if (this.itemId != 0) {
      this.displayElement(this.itemId, 'none');
      console.log(this.itemId);
    }

    if (this.itemId != 0 && this.itemId === itemId) {
      this.displayElement(this.itemId, 'none');
      console.log(this.itemId);
      this.itemId = 0;
      return;
    }
    this.itemId = itemId;
    this.displayElement(this.itemId, 'block');
    console.log(this.itemId);
    console.log(
      document.getElementById(String(itemId))!.previousElementSibling
    );
  }

  displayElement(elementId: number, styleDisplayChoice: string) {
    document.getElementById(String(elementId))!.style.display =
      styleDisplayChoice;
    if (styleDisplayChoice === 'block')
      this.changeArrowIcon('\u2B9D', elementId);
    if (styleDisplayChoice === 'none')
      this.changeArrowIcon('\u2B9F', elementId);
  }
  changeArrowIcon(unicode: string, elementId: number) {
    document.getElementById(
      String(elementId)
    )!.previousElementSibling!.lastElementChild!.lastElementChild!.innerHTML = unicode;
  }

  deleteItem(list_id: number, item_id: number) {
    let sub = this._listService
      .deleteItem(list_id, item_id)
      .subscribe(() => console.log('Delete successful'));
    sub.unsubscribe;
  }
  deleteItemInArray() {}

  toggleCompleted(
    list_id: number,
    item_id: number,
    item: Item,
    isCompleted: boolean
  ) {
    let body: JSON;
    body = JSON.parse(String(isCompleted));
    item.completed = isCompleted;
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
    this.list_id = this.route.snapshot.paramMap.get('id');
    if (this.list_id) this.list_id = parseInt(this.list_id);
    this.loadListItems(this.list_id);
  }

  //nacitanie todo-itemov pre dany list
  loadListItems(listId: number) {
    this.sub = this._listService.getListItems(listId).subscribe((data) => {
      this.items = data;
      console.log(this.items);
    });
  }

  // this.item.forEach(element => {
  //   console.log(element.deadline)
  //   element.deadline |  DatePipe['shortDate'];
  //   let date = new Date(element.deadline);
  //   date.toLocaleDateString('short');
  //   console.log(date);
  //   console.log(element);
  //   console.log(element.deadline)
  // });

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
