import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { List } from '../list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

export class TodoListComponent implements OnInit{

  //added line to tsconfig.json -> "strictPropertyInitialization": false
  todoListForm: FormGroup;       
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _listService: ListService, private router: Router) { 
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


  // toggleCompleted(){ //i
  //   // if(this.item.completed == false)
  //   // this.item.completed = true;
  //   // else 
  //   // this.item.completed = false;
  //   console.log(event?.target)
  // }

  

  onInput(){
    console.log("input");
  }

  ngOnInit() {
    this.todoListForm = this.formBuilder.group({
        name: ['',[
         Validators.required,
        Validators.minLength(2)]],
    });
    
    this.loadList();
}

// convenience getter for easy access to form fields
get f() { return this.todoListForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.todoListForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.todoListForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.todoListForm.reset();
}

}





