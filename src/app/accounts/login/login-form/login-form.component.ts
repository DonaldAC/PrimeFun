import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() submit = new EventEmitter();
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private analytics: AngularFireAnalytics
  ) {}

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitForm() {
    if (this.formGroup.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.authService
      .signInWithEmailAndPassword(
        this.formGroup.value.email,
        this.formGroup.value.password
      )
      .subscribe({
        next: (credentials) => {
          this.analytics.logEvent(
            'UserLoggedIn: ' + credentials.user?.displayName
          );
          this.router.navigate(['dashboard/get-started']);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
