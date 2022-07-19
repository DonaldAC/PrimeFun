import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'homepage-navbar',
  templateUrl: './funda-navbar.component.html',
  styleUrls: ['./funda-navbar.component.scss'],
})
export class FundaNavbarComponent implements OnInit {
  @Input() showLinks: boolean = true;
  isCollapsed: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  login: boolean = true;

  ngOnInit() {
    this.authService.state$.subscribe((user) => {
      if (user) {
        this.login = false;
      }
    });
  }

  loginOrLogout() {
    if (!this.login) {
      this.authService.logout();
      this.login = true;
      this.toastr.info('Logged out!');
    } else {
      this.router.navigate(['/login']);
    }
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
