import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  a=2;
  //added line to tsconfig.json -> "strictPropertyInitialization": false
  todoListForm: FormGroup;       
  submitted = false;

  constructor(private formBuilder: FormBuilder) { 
  }

  onInput(){
    console.log("input");
  }

  ngOnInit() {
    this.todoListForm = this.formBuilder.group({
        name: ['',[
         Validators.required,
        Validators.minLength(2)]],
    });
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




