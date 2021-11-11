import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  
  
  todoItemForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  onInput(){
    console.log("input");
  }

  ngOnInit() {
    this.todoItemForm = this.formBuilder.group({
        name: ['',[
          Validators.required,
          Validators.minLength(2)]],
        surname: ['',[
          Validators.required,
          Validators.minLength(2)]],
        date: ['', Validators.required],
        // validates date format yyyy-mm-dd
        // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        
    });
}

// convenience getter for easy access to form fields
get f() { return this.todoItemForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.todoItemForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.todoItemForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.todoItemForm.reset();
}


}




/*


        date: ['', Validators.required],
        // validates date format yyyy-mm-dd
        // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        
        todoItemForm
*/