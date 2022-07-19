import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import countries from 'src/utils/countries';

@Component({
  selector: 'get-started-business-info-form',
  templateUrl: './business-info-form.component.html',
  styleUrls: ['./business-info-form.component.scss'],
})
export class BusinessInfoFormComponent implements OnInit {
  @Input() goToNextAccordionItem = (id: string, event: Event) => {};
  countries = countries;
  isSubmitted: boolean = false;
  accountId: string | null = null;
  isLoaded: boolean = false;
  loadingTime: number = 100;
  userDetails: any;

  constructor(
    private fb: FormBuilder, 
    private accountservice: AccountsService, 
    private toastr: ToastrService
  ) {}

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit() {
    this.accountId = localStorage.getItem('accountId');
    this.accountservice.getUser(this.accountId)?.subscribe(response => {
      this.userDetails = response;
    });
  }

  formGroup: FormGroup = this.fb.group({
    newStartUp: ['', [Validators.required]],
    businessAge: ['', [Validators.required]],
    businessCountry: ['', [Validators.required, Validators.minLength(2)]],
    addressLine1: ['', [Validators.required, Validators.minLength(2)]],
    addressLine2: ['', [Validators.required, Validators.minLength(2)]],
    stateProvinceRegion: ['', [Validators.required, Validators.minLength(2)]],
    cityTown: ['', [Validators.required, Validators.minLength(2)]],
    zipPostalCode: ['', [Validators.required, Validators.minLength(2)]],
    country: ['', [Validators.required, Validators.minLength(2)]],
    businessDetails: ['', [Validators.required, Validators.minLength(2)]],
    businessModel: ['', [Validators.required, Validators.minLength(2)]],
  });

  InfoSubmit(){
    this.isSubmitted = true;
    if(this.formGroup.invalid || !this.accountId) {
      this.isSubmitted = false;
      return;
    }
    this.accountservice
      .update(this.accountId, this.formGroup.value)
      ?.subscribe({
        next: () => {
          this.timeout(this.loadingTime)
            .then(() => {
              this.toastr.success(
                'Submitted successfully', 
                'Business Information'
              );
              this.isSubmitted = false;
              this.formGroup.reset();
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
}
