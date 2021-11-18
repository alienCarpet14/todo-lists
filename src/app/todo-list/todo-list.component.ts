import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list';
import { Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit{


  constructor( private _listService: ListService, private router: Router) { 
  }

  lists: List[];  
  item: Item[];

  onSelect(todoList: List){
    this.router.navigate(['/list',todoList.id])
  }
  loadList() {
    this._listService.getList().subscribe(data => {
      this.lists = data;
      console.log(this.lists);
      this.lists.forEach(element => { 
        console.log(element);
        
      });
    });
  }


  loadListItems(listId : number) {
    this._listService.getListItems(listId).subscribe(data => {
      this.item = data;
      console.log(this.item);
      this.item.forEach(element => { 
        console.log(element);
        
      });
    });
  }
  

  ngOnInit() {
    this.loadList();
  }


}





