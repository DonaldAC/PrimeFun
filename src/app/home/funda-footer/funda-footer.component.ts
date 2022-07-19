import { Component } from '@angular/core';

@Component({
  selector: 'homepage-footer',
  templateUrl: './funda-footer.component.html',
  styleUrls: ['./funda-footer.component.scss'],
})
export class FundaFooterComponent {
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
