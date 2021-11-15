import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }



  ngOnInit() {

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
    });
}

id: number;
todoListId: number;

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; 
return this.registerForm.controls}

onSubmit() {
    this.submitted = true;
    alert(this.registerForm)

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
