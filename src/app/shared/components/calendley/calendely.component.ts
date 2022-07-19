import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { Router } from '@angular/router';

declare const Calendly: any;

@Component({
  selector: 'app-calendely',
  templateUrl: './calendely.component.html',
  styleUrls: ['./calendely.component.scss'],
})
export class CalendelyComponent implements OnInit {
  @Input() url!: string;
  @Input () routeTo?: string;
  constructor(
    private analytics: AngularFireAnalytics,
    private router: Router
  ) {}

  ngOnInit() {
    this.initCalendly();
    const scheduledEvent = `calendly.event_scheduled`;
    window.addEventListener('message', (event: MessageEvent<any>) => {
      if (this.isCalendlyEvent(event)) {
        if (event.data.event === scheduledEvent) {
          this.analytics.logEvent('Interview Booked');
          this.router.navigate([this.routeTo]);
        }
      }
    });
  }
  isCalendlyEvent(e: MessageEvent<any>) {
    return e.data.event && e.data.event.indexOf('calendly') === 0;
  }

  initCalendly() {
    Calendly.initInlineWidget({
      url: this.url,
      parentElement: document.querySelector('.calendly-inline-widget'),
    });
  }
}
