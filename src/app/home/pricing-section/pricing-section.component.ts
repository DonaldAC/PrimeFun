import { Component } from '@angular/core';
@Component({
  selector: 'pricing-section',
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.scss'],
})
export class PricingSectionComponent {
  amount: number = 5000;
  fees: number = 1000;
  totalRepayable: number = 6000;
  min: number = 5000;
  max: number = 500000;
  
  onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const numVal = parseInt(value.replace(/\D/g, ''));
    if (numVal >= this.max) {
      this.amount = this.max;
    } else {
      this.amount = numVal;
    }
    this.totalRepayable = this.amount + this.fees;
  }

  onBlur(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    const numVal = parseInt(value.replace(/\D/g, ''));
    if (numVal <= this.min) {
      this.amount = this.min;
    }
    this.totalRepayable = this.amount + this.fees;
  }
}
