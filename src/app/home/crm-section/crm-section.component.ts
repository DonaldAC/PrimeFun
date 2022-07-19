import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Typewriter from '../../../utils/t-writer';
@Component({
  selector: 'crm-section',
  templateUrl: './crm-section.component.html',
  styleUrls: ['./crm-section.component.scss'],
})
export class CrmSectionComponent implements AfterViewInit, OnInit {
  @ViewChild('tw') tw!: {};
  constructor() {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    const target = document.querySelector('.tw');
    const options = {
      loop: true,
      typeSpeed: 70,
      deleteSpeed: 30,
    };
    const writer = new Typewriter(target, options);
    const services: string[] = [
      'CRM System',
      'Game',
      'Website',
      'App',
      'Booking Portal',
      'Company Branding',
      'Company Software',
      'Saas Platform',
      'E-commerce Site',
    ];

    services.forEach((service) => {
      writer
        .type(service)
        .rest(800)
        .remove(service.length)
        .rest(300)
        .clear()
        .start();
    });
  }
}
