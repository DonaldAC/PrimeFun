import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reset-password-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  @Output() submit = new EventEmitter();
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  formGroup: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitForm() {
    // this.getErrors('email');
    console.log(this.formGroup.value);
    this.isSubmitted = true;
  }
}
