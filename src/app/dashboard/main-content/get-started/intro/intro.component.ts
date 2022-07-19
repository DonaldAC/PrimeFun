import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'get-started-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  @Input() goToNextAccordionItem = (id: string, event: Event) => {};

  constructor() { }

  ngOnInit(): void {
  }

}
