import { AnimationOptions } from 'ngx-lottie';
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'why-funda-section',
  templateUrl: './why-funda-section.component.html',
  styleUrls: ['./why-funda-section.component.scss']
})
export class WhyFundaSectionComponent implements OnInit {
  magnifierAnimation: AnimationOptions = {
    path: 'assets/animations/magnifier.json'
  }
  hourGlassAnimation: AnimationOptions = {
    path: 'assets/animations/hour-glass.json'
  }
  calculatorAnimation: AnimationOptions = {
    path: 'assets/animations/calculator.json'
  }
  safeAnimation: AnimationOptions = {
    path: 'assets/animations/safe.json'
  }

  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: any): void {
    console.log(animationItem);
  }

}
