import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  
  
  private sub: any;
  searchText : string;
  status: string;

  constructor( private _listService: ListService, private route: ActivatedRoute,  private router: Router, ) { 
  }

  onSelect(a){
    alert(a);
    this.router.navigate(['/list',a]);
  }
  item;

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
    console.log(event?.target);
    alert(event?.target);
  }

  id;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.id=parseInt(this.id);
    this.loadListItems(this.id);
}



ngOnDestroy() {
  this.sub.unsubscribe();
}

}