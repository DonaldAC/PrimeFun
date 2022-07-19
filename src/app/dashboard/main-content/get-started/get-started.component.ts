import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundaAccordionItemComponent } from 'src/app/shared/components/accordion/funda-accordion-item.component';
import { FundaAccordionComponent } from 'src/app/shared/components/accordion/funda-accordion.component';

@Component({
  selector: 'dashboard-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
})
export class GetStartedComponent implements AfterViewInit {
  @ViewChild('accordion') accordion!: FundaAccordionComponent;
  @ViewChild('projectBriefing')
  projectBriefingAccordion!: FundaAccordionItemComponent;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((param) => {
      // TODO: Configure checked steps with local storage
      this.accordion.accordionItems.map((item: FundaAccordionItemComponent) => {
        if (item.id === param.step) {
          item.active = true;
        }
      });
    });
  }

  goToNextAccordionItem = (id: string, event: Event): void => {
    this.accordion.accordionItems.map((item: FundaAccordionItemComponent) => {
      if (item.active) {
        item.isCompleted = true;
      }
      if (item.id === id) {
        item.active = true;
      }
    });
  };
}
