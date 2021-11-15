import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ListService } from '../list.service';
import { Item } from '../item';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  
  
  todoItemForm: FormGroup;
  submitted = false;
  private sub: any;
  searchText : string;
  status: string;

  constructor(private formBuilder: FormBuilder, private _listService: ListService, private route: ActivatedRoute,  private router: Router, ) { 
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
  
  toggleCompleted(){ //i
    // if(this.item.completed == false)
    // this.item.completed = true;
    // else 
    // this.item.completed = false;
    console.log(event?.target);
    alert(event?.target);
  }


  onInput(){
    console.log("input");
  }
  id;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.id=parseInt(this.id);
    this.loadListItems(this.id);
    // this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.sub = this.route.queryParams.subscribe(params => {
    //   this.id = params['id'];
    //   alert(params['id']);
    //   console.log(params)
    //   // alert(this.id);
    // });

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

ngOnDestroy() {
  this.sub.unsubscribe();
}

}




/*


        date: ['', Validators.required],
        // validates date format yyyy-mm-dd
        // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        
        todoItemForm
*/