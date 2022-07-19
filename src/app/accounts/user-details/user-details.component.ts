import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/account.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  // userDetails: any = {};

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    // this.accountsService.getUser()?.subscribe(response => {
    //   this.userDetails = response;
    //   console.log(this.userDetails);
    // })
  }
}
