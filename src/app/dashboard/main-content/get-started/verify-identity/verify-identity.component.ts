import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'get-started-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss'],
})
export class VerifyIdentityComponent implements OnInit {
  @Input() goToNextAccordionItem = (id: string, event: Event) => {};
  isVerified: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  verify = () => {
    this.isVerified = true;
  };
}
