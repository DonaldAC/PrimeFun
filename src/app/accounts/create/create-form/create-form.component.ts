import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { AccountsService } from '../../services/accounts.service';
import { Account } from '../../models/account.interface';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { throwError } from 'rxjs';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from 'src/utils/helpers';

@Component({
  selector: 'create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent {
  @Output() submit = new EventEmitter();
  isSubmitted: boolean = false;
  message?: string;
  emailMessage?: string = '';
  isEmailUsed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private accountsService: AccountsService,
    private analytics: AngularFireAnalytics
  ) {}

  formGroup: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
    ],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, [Validators.requiredTrue]],
    agreements: [false, [Validators.required]],
  });

  ngOnInit(): void {
    this.clearIfEmailExits();
  }

  clearIfEmailExits() {
    this.formGroup.get('email')?.valueChanges.subscribe(() => {
      this.emailMessage = '';
    });
  }

  isFormSubmitted(message: boolean) {
    this.submit.emit(message);
  }

  submitForm() {
    this.isSubmitted = true;
    this.isFormSubmitted(this.isSubmitted);
    if (this.formGroup.invalid) return;
    this.authService
      .signUp({
        email: this.formGroup.value.email,
        password: this.formGroup.value.password,
      })
      .pipe(
        switchMap((user) => {
          const account: Account = { id: user.uid };
          const data = this.formGroup.value;
          delete data.password;
          Object.assign(account, data);
          this.isFormSubmitted(false);
          return this.accountsService.create(account)!;
        }),
        catchError((error) => {
          this.emailMessage = error.message;
          this.isFormSubmitted(false);
          return throwError(error);
        })
      )
      .subscribe({
        next: (doc: any) => {
          if (!doc) return;
          this.analytics.logEvent('UserSignedUp');
          this.isFormSubmitted(!this.isSubmitted);
          localStorage.setItem('accountId', doc.id);
          this.router.navigate(['accounts/create'], {
            queryParams: {
              step: 'info',
            },
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
