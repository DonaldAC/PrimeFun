import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'accounts-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  route: boolean = true;
  constructor(router: Router) {
    if (router.url === '/accounts/reset-password/request') {
      this.route = true;
    } else {
      this.route = false;
    }
  }

  ngOnInit(): void {}
}
