import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PREFERRED_CURRENCIES, REVENUE_RANGE, PURPOSES } from 'src/constants/constants';
import { WEBSITE_URL_PATTERN } from 'src/utils/helpers';
import countries, { CountryInterface } from '../../../../utils/countries';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  @Output() submit = new EventEmitter();

  countries: CountryInterface[] = countries;

  purposes: string[] = PURPOSES;
  revenues: string[] = REVENUE_RANGE;
  currencies: string[] = PREFERRED_CURRENCIES;
  isSubmitted: boolean = false;
  othersPurpose: boolean = false;
  isLoaded: boolean = false;
  accountId: string | null = null;
  loadingTime: number = 4000;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountsService,
    private toastr: ToastrService,
    private analytics: AngularFireAnalytics
  ) {}

  formGroup: FormGroup = this.fb.group({
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    businessWebsite: [
      '',
      [Validators.required, Validators.pattern(WEBSITE_URL_PATTERN)],
    ],
    businessCountry: ['', [Validators.required, Validators.minLength(2)]],
    monthlyRevenue: ['', [Validators.required]],
    preferredCurrency: ['', [Validators.required]],
    fundingPurpose: ['', [Validators.required]],
    othersPurpose: ['', [Validators.minLength(2)]],
  });

  ngOnInit(): void {
    this.accountId = localStorage.getItem('accountId');
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.formGroup.invalid || !this.accountId) {
      this.isSubmitted = false;
      return;
    }
    this.accountService
      .update(this.accountId, this.formGroup.value)
      ?.subscribe({
        next: () => {
          this.timeout(this.loadingTime)
            .then(() => {
              this.analytics.logEvent('UserFinishedSignUp');
              this.isSubmitted = false;
            })
            .finally(() => {
              this.isLoaded = true;
              this.isSubmitted = false;
            });
        },
        error: (error) => {
          this.toastr.error(
            'Unable to process your request.',
            'Something Went Wrong'
          );
          this.isSubmitted = false;
          this.isLoaded = false;
          console.error(error);
        },
      });
  }

  // Choose country using select dropdown
  changeCountry(e: any) {
    this.formGroup.get('businessCountry')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  //Choose currency using select dropdown
  changeCurrency(e: any){
    this.formGroup.get('preferredCurrency')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // Choose revenue using select dropdown
  changeRevenue(e: any) {
    this.formGroup.get('monthlyRevenue')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // Take others
  onPurposeChange = () => {
    if (this.formGroup.controls.fundingPurpose?.value === 'Others') {
      this.othersPurpose = true;
    } else {
      this.othersPurpose = false;
    }
  };

  // Choose purpose using select dropdown
  changePurpose(e: any) {
    this.onPurposeChange();
    this.formGroup.get('fundingPurpose')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
