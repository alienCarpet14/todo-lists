import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import {MatDialog, MatDialogConfig} from "@angular/material";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { NewItemFormComponent } from '../new-item-form/new-item-form.component';
import { DatePipe } from '@angular/common';

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
  formatDate(dateString: string) {
    return this.datepipe.transform(dateString, 'shortDate');
  }
  stringDateFormat(dateString: string) {
    let dateFormat = 'en-GB';
    let date = new Date(dateString);
    date.toLocaleDateString(dateFormat);
    return date;
  }

  // TODO:
  toggleCompleted() {}

  //ziskanie id listu z url a nacitanie todo-itemov pre dany list
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.id = parseInt(this.id);
    this.loadListItems(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
