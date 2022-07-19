import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumber } from './directives/only-number.directive';
import { FundaAccordionComponent } from './components/accordion/funda-accordion.component';
import { FundaAccordionItemComponent } from './components/accordion/funda-accordion-item.component';
import { SwitchToggleComponent } from './components/switch-toggle/switch-toggle.component';

@NgModule({
  declarations: [
    OnlyNumber,
    FundaAccordionComponent,
    FundaAccordionItemComponent,
    SwitchToggleComponent,

  ],
  imports: [CommonModule],
  exports: [
    OnlyNumber,
    FundaAccordionComponent,
    FundaAccordionItemComponent,
    SwitchToggleComponent,
  ],
})
export class SharedModule {}
