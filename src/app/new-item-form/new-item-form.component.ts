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
    
    this.todoListId = this.route.snapshot.paramMap.get('id');
    if(this.todoListId) this.todoListId=parseInt(this.todoListId);

    this.registerForm = this.formBuilder.group({
        title: 
        ['',[
          Validators.required,
          Validators.minLength(2)]],
        text: 
        ['',[
          Validators.required,
          Validators.minLength(2)]],
          deadline: 
        ['', Validators.required],
        completed : ['false'],
        id: [''],
        todoListId: [''],
    });
}

id;
todoListId;

get f() { return this.registerForm.controls; 
return this.registerForm.controls}

onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }

      
        this._listService.postItem(this.registerForm.value,this.todoListId)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    this.registerForm.value.todoListId = this.todoListId;
    this.registerForm.value.id = this.id;
    
      
    
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
