import { Component, ContentChildren, QueryList } from '@angular/core';
import { FundaAccordionItemComponent } from './funda-accordion-item.component';

@Component({
  selector: 'app-funda-accordion',
  templateUrl: './funda-accordion.component.html',
  styleUrls: ['./funda-accordion.component.scss'],
})
export class FundaAccordionComponent {
  _accordionItems!: QueryList<FundaAccordionItemComponent>;
  @ContentChildren(FundaAccordionItemComponent)
  set accordionItems(value: QueryList<FundaAccordionItemComponent>) {
    this._accordionItems = value;
    this._accordionItems.forEach((item) =>
      item.activated.subscribe({
        next: (id: string) => {
          this._accordionItems.forEach((item) => {
            if (item.id != id) item.active = false;
          });
        },
      })
    );
  }
  get accordionItems(): QueryList<FundaAccordionItemComponent> {
    return this._accordionItems;
  }
}
