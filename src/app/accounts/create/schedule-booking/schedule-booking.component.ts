import { Component, OnInit } from '@angular/core';
import { CALENDLEY_URL_FUNDA_INTRO_MEETING} from 'src/constants/constants';
@Component({
  selector: 'schedule-booking-component',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss'],
})
export class ScheduleBookingComponent implements OnInit {
  /* use tets url for testing undee `src/types/types` */
  url = CALENDLEY_URL_FUNDA_INTRO_MEETING
  routeTo =`/accounts/confirmed`;
  constructor() {}
  ngOnInit() {}
}
