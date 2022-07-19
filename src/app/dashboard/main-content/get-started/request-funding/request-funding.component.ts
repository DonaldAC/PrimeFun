import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../../../../accounts/services/accounts.service';

@Component({
  selector: 'get-started-request-funding',
  templateUrl: './request-funding.component.html',
  styleUrls: ['./request-funding.component.scss']
})
export class RequestFundingComponent implements OnInit {
  @Input() goToNextAccordionItem = (id: string, event: Event) => {}
  isFundformSubmitted: boolean = false;
  isFundCredited: boolean = false;
  accountId: string | null = null;
  isLoaded: boolean = false;
  loadingTime: number = 100;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService, 
    private accountsService: AccountsService
  ) { }

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  formGroup: FormGroup = this.fb.group({
    projectName: ['', [Validators.required]],
    RequestedAmount: ['', [Validators.required]],
    projectBrief: ['', [Validators.required]],
    monthlyPayment: ['', [Validators.required]],
    deposit: ['', [Validators.required]]
  });

  ngOnInit(): void { 
    this.accountId = localStorage.getItem('accountId');
  }

  formSubmitted() {
    this.isFundformSubmitted = true;
    if(this.formGroup.invalid || !this.accountId) {
      this.isFundformSubmitted = false;
      return;
    } 
    this.accountsService
      .update(this.accountId, this.formGroup.value)
      ?.subscribe({
        next: () => {
          this.timeout(this.loadingTime)
            .then(() => {
              this.toastr.success(
                'Submitted successfully', 
                'Funds Request'
              );
              this.isFundformSubmitted = true;
            })
            .finally(() => {
              this.isLoaded = true;
              this.isFundformSubmitted = true;
            });
        },
        error: (error) => {
          this.toastr.error(
            'Unable to process your request.',
            'Something Went Wrong'
          );
          this.isFundformSubmitted = false;
          this.isLoaded = false;
          console.error(error);
        },
      });
  }
}
