import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss'],
  // providers: [TodoItemComponent]
})
export class NewItemFormComponent implements OnInit {
  addItemForm: FormGroup;
  submitted = false;
  sub;

  id;
  todoListId;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _listService: ListService
  ) {}

  ngOnInit() {
    this.todoListId = this.data;
    // this.todoListId = 1;
    // this.todoListId = this.route.snapshot.paramMap.get('id');
    if (this.todoListId) this.todoListId = parseInt(this.todoListId);

    //validacie
    this.addItemForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      text: ['', [Validators.required, Validators.minLength(2)]],
      deadline: ['', Validators.required],
      completed: [false],
      id: [''],
      todoListId: [''],
    });
  }

  //getter pre lahsi pristup ku form fields
  get f() {
    return this.addItemForm.controls;
  }

  onSubmit() {
    console.log(this.id);
    console.log(this.todoListId);
    this.submitted = true;
    if (this.addItemForm.invalid) {
      return;
    }
    this.sub = this._listService
      .postItem(this.addItemForm.value, this.todoListId)
      .subscribe((data) => {
        // this.ngOnInit();
        // console.log(data);
      });
    // window.location.reload();  //reload stranky
  }

  onReset() {
    this.submitted = false;
    this.addItemForm.reset();
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
