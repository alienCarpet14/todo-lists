import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import {MatDialog, MatDialogConfig} from "@angular/material";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { NewItemFormComponent } from '../new-item-form/new-item-form.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  private sub: any;
  //properties pre filtrovanie zobrazenia todo-itemov
  searchText : string;  // vyhľadávanie / filtrovanie podľa textu
  filterStatus: string; // completed? true : false

  id;  // id of todo-list
  item; // todo-item instance
  


  constructor( private _listService: ListService, private route: ActivatedRoute,  private router: Router, private dialog: MatDialog ) { 
  }

//   openDialog() {

//     const dialogConfig = new MatDialogConfig();

//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus = true;

//     this.dialog.open(NewItemFormComponent, dialogConfig);
// }

  onSelect(a){
    alert(a);
    this.router.navigate(['/list',a]);
  }


  loadListItems(a : number) {
    this.sub = this._listService.getListItems(a).subscribe(data => {
      this.item = data;
      console.log(this.item);
      this.item.forEach(element => { 
        console.log(element);
      });
    });
  }


  // TODO:
  toggleCompleted(){ 
  }

  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.id=parseInt(this.id);
    this.loadListItems(this.id);
}



ngOnDestroy() {
  this.sub.unsubscribe();
}

}