import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit{


  constructor( private _listService: ListService, private router: Router) { 
  }

  list;

  onSelect(todoList){
    this.router.navigate(['/list',todoList.id])
  }
  loadList() {
    this._listService.getList().subscribe(data => {
      this.list = data;
      console.log(this.list);
      this.list.forEach(element => { 
        console.log(element);
        
      });
    });
  }

  item;

  loadListItems(a : number) {
    this._listService.getListItems(a).subscribe(data => {
      this.item = data;
      console.log(this.item);
      this.item.forEach(element => { 
        console.log(element);
        
      });
    });
  }
  

  onInput(){
    console.log("input");
  }

  ngOnInit() {
    this.loadList();
  }


}





