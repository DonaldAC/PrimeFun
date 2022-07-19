import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  step: string = 'info';
  isSubmitted: boolean = false;
  accountStep: boolean = false;
  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe((params) => {
      this.step = params.step;
    });
  }
  ngOnInit() {

  }

  isFormSubmitted(isSubmitted: boolean) {
    this.isSubmitted = isSubmitted;

  }
}
