import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-booking',
  templateUrl: './call-booking.component.html',
  styleUrls: ['./call-booking.component.scss'],
})
export class CallBookingComponent implements OnInit {
  @Input()
  isLoaded!: boolean;
  constructor() {}
  ngOnInit() {}
}
