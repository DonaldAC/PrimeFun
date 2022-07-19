import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reset-password-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  @Output() submit = new EventEmitter();
  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder) {}

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitForm() {
    // this.getErrors('email');
    console.log(this.formGroup.value);
    this.isSubmitted = true;
  }
}
