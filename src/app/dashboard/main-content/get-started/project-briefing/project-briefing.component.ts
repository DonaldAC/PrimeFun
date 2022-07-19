import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FundaAccordionItemComponent } from 'src/app/shared/components/accordion/funda-accordion-item.component';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'get-started-project-briefing',
  templateUrl: './project-briefing.component.html',
  styleUrls: ['./project-briefing.component.scss'],
})
export class ProjectBriefingComponent implements OnInit {
  @Input() projectBriefingAccordion!: FundaAccordionItemComponent;
  isBriefSubmitted: boolean = false;
  isChatStarted: boolean = false;
  accountId: string | null = null;
  isLoaded: boolean = false;
  loadingTime: number = 100;

  constructor(
    private fb: FormBuilder, 
    private accountsService: AccountsService, 
    private toastr: ToastrService
  ) {}

  formGroup: FormGroup = this.fb.group({
    projectBriefing: ['', [Validators.required, Validators.minLength(500)]],
  });

  ngOnInit(): void {
    this.accountId = localStorage.getItem('accountId');
  }

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  submitBrief() {
    this.isBriefSubmitted = true;
    setTimeout(() => {
      this.projectBriefingAccordion.toggleHandler();
    }, 100);
    if (this.formGroup.invalid || !this.accountId) {
      this.isBriefSubmitted = false;
      return;
    }
    this.accountsService
      .update(this.accountId, this.formGroup.value)
      ?.subscribe({
        next: () => {
          this.timeout(this.loadingTime)
            .then(() => {
              this.isBriefSubmitted = true;
            })
            .finally(() => {
              this.isLoaded = true;
              this.isBriefSubmitted = true;
            });
        },
        error: (error) => {
          this.toastr.error(
            'Unable to process your request.',
            'Something Went Wrong'
          );
          this.isBriefSubmitted = false;
          this.isLoaded = false;
          console.error(error);
        },
      })
  };

  startChat = () => {
    this.isChatStarted = true;
    setTimeout(() => {
      this.projectBriefingAccordion.toggleHandler();
    }, 100);
  };
  
}
