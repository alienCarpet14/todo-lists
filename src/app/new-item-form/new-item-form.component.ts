import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss'],
  providers: [TodoItemComponent]
})
export class NewItemFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private _listService: ListService) { }



  ngOnInit() {
    // if(this.route.snapshot.paramMap.get('id'))
    // this.todoListId = parseInt(this.route.snapshot.paramMap.get('id'));
    
    this.todoListId = this.route.snapshot.paramMap.get('id');
    if(this.todoListId) this.todoListId=parseInt(this.todoListId);

    this.registerForm = this.formBuilder.group({
        title: 
        // '',
        ['',[
          Validators.required,
          Validators.minLength(2)]],
        text: 
        // '',
        ['',[
          Validators.required,
          Validators.minLength(2)]],
          deadline: 
        // '',
        ['', Validators.required],
        // validates date format yyyy-mm-dd
        // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        completed : ['false'],
        id: [''],
        todoListId: [''],
    });
}

id;
todoListId;

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; 
return this.registerForm.controls}

onSubmit() {
    this.submitted = true;
    // alert(this.registerForm)

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

      
        this._listService.postItem(this.registerForm.value,this.todoListId)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
        // return this.http.post<any>(this._api + "/" + a + "/todo-items", itemData);
    // alert(this.registerForm.value);
    this.registerForm.value.todoListId = this.todoListId;
    this.registerForm.value.id = this.id;
    
      
    
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
