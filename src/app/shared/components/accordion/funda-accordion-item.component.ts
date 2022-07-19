import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './funda-accordion-item.component.html',
  styleUrls: ['funda-accordion-item.component.scss'],
})
export class FundaAccordionItemComponent implements AfterViewInit {
  @Input() id?: string;
  @Input() title?: string;
  @Input() icon?: string;
  @Input() isCompleted?: boolean = false;
  _active: boolean = false;
  @Input()
  set active(value: boolean) {
    this._active = value;
    this.toggleHandler();
    if (value) {
      this.activated.emit(this.id);
    }
  }
  get active() {
    return this._active;
  }
  @Output() activated = new EventEmitter<string>();

  @ViewChild('body') bodyRef?: ElementRef<HTMLElement>;

  headerClickHandler(e: any) {
    this.active = !this.active;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toggleHandler();
    }, 0);
  }

  toggleHandler() {
    if (!this.bodyRef) return;
    if (this.active) {
      console.log('bro wth');
      this.bodyRef.nativeElement.style.maxHeight =
        this.bodyRef.nativeElement.scrollHeight + 'px';
    } else {
      this.bodyRef.nativeElement.style.maxHeight = 0 + 'px';
    }
  }
}
